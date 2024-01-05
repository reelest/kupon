import createSubscription from "../utils/createSubscription";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { noop } from "../utils/none";
import sentenceCase from "../utils/sentenceCase";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import usePromise from "../utils/usePromise";
import useStable from "../utils/useStable";
import Toast from "react-native-root-toast";

export const getContent = async (res) => {
  try {
    let body = await res.text();
    console.log("body:", body);
    try {
      body = JSON.parse(body);
    } catch (_) {
      /* empty */
    }
    return body;
  } catch (e) {
    return {
      status: res.status,
      msg: "Invalid Server Response",
    };
  }
};

//User Management
export const forgotPasswordAPIUrl = "/api/resetpassword";
const ROOT = "https://kupon.com.ng";
let TOKEN;
let isDoingReAuthentication;
/**
 *
 * @param {string} url
 * @param {any} [body]
 * @param {any} [opts]
 * @returns {[Response, any]}
 */
export async function jsonRpc(url, body, opts) {
  const _body = body;
  console.log("Sending request ", url, { body, opts }, TOKEN);
  return await fetch(`${ROOT}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    method: "POST",
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...opts,
  })
    .then(async (res) => [res, await getContent(res)])
    .then(async ([res, body]) => {
      if (
        res.status === 401 &&
        String(body.msg).toLowerCase() === "invalid token"
      ) {
        if (!isDoingReAuthentication) {
          try {
            isDoingReAuthentication = true;
            const savedPassword = await getPassword();
            if (savedPassword) {
              await savePassword("");
              let err;
              try {
                await doLogin({ email: USER.email, password: savedPassword });
              } catch (e) {
                err = e;
              }
              if (!err) return await jsonRpc(url, _body, opts);
            }
          } finally {
            isDoingReAuthentication = false;
          }
        }
        if (USER) {
          console.error(
            "Token error: reauthenticated: " + isDoingReAuthentication
          );
          Toast.show(`User session has expired. Please log in again.`);
          //TODO remove this check
          if (!isDoingReAuthentication) doLogout();
        }
      }
      return [res, body];
    });
}
export const useFetch = (url, convert) => {
  const [refreshCounter, setRefreshCounter] = useState(0);
  convert = useStable(convert);
  const refresh = useStable(function refresh() {
    setRefreshCounter(refreshCounter + 1);
  });
  const data = usePromise(async () => {
    try {
      const [res, json] = await jsonRpc(url, null, {
        method: "GET",
      });
      if (isError(res)) {
        console.error(json.msg);
        Toast.show("Error occured while fetching content ");
      } else {
        const data = convert(json);
        return data;
      }
    } catch (e) {
      setTimeout(refresh, 3000);
      throw e;
    }
  }, [refreshCounter, url, refresh]);
  const [limit, setLimit] = useState(10);
  return {
    data: Array.isArray(data) ? data.slice(0, limit) : data,
    refreshToken: refreshCounter,
    refresh() {
      setRefreshCounter(refreshCounter + 1);
    },
    more() {
      setLimit(Math.max(data?.length || 0, limit) + 10);
    },
  };
};
const isError = (res) => res.status >= 300 || res.status < 200;
/**
 * @param {{email: string, password: string}} data
 */
export const doLogin = async ({ email, password }) => {
  console.log("Loging in ....");
  const [res, body] = await jsonRpc("/user/login", { email, password });
  console.log({ "login result": !!body });
  if (isError(res)) {
    throw new Error(body.msg);
  } else {
    savePassword(password);
    setUserToken(body);
  }
};
const savePassword = async (password) => {
  //TODO use secure storage
  await AsyncStorage.setItem("saved_password", password);
};
const getPassword = async () => {
  //TODO use secure storage
  return await AsyncStorage.getItem("saved_password");
};
export const createAccount = async ({
  email,
  password,
  telephone,
  address,
  firstName,
  lastName,
}) => {
  const [res, body] = await jsonRpc("/user/register", {
    email,
    password,
    telephone,
    address,
    firstName,
    lastName,
  });
  if (isError(res)) {
    throw new Error(sentenceCase(String(body.msg)));
  } else {
    setUserToken(body);
  }
};

export const doLogout = async () => {
  console.log("Logging Out...");
  setUserToken(null);
};

// const USER_API = dummyData({
//   displayName: "name",
//   firstName: "firstName",
//   lastName: "lastName",
//   phoneNumber: "phoneNumber",
//   photoURL: "image",
// });

const [, onUserToken, setUserToken] = createSubscription(noop);

const STORAGE_KEY = "user-logged-in";
AsyncStorage.getItem(STORAGE_KEY).then((e) => {
  console.log({ savedToken: e });
  if (e) setUserToken(e);
  else setUserToken(null);
});

onUserToken(async function (token) {
  console.log({ token });
  TOKEN = token;
  if (token === null) await AsyncStorage.removeItem(STORAGE_KEY);
  else AsyncStorage.setItem(STORAGE_KEY, token);
});

export const [useUser, onUserChanged, setUser] = createSubscription(
  (setUser) => {
    return onUserToken(async (token) => {
      if (token === null) return setUser(null);
      await updateUser(token);
    });
  }
);
const toUser = (e) => {
  e.displayName = `${e.firstName || ""} ${(e.lastName || "").toUpperCase()}`;
  e.phoneNumber = e.telephone;
  return e;
};

let USER;
onUserChanged((user) => {
  USER = user;
});
export const user = () => USER;
const updateUser = async (token) => {
  console.log("updating user", { token });
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    console.log(e);
    return await doLogout();
  }
  console.log("Using cached toekn", decoded);
  setUser(toUser(decoded));
  const [res, body] = await jsonRpc(`/user/${decoded.id}`, null, {
    method: "GET",
  });
  if (res.status === 200) {
    setUser(toUser(body.msg));
  }
  //  This is now handled by jsonRpc
  //  else {
  //   await doLogout();
  // }
};
