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
/**
 *
 * @param {string} url
 * @param {any} [body]
 * @param {any} [opts]
 * @returns {[Response, any]}
 */
export async function jsonRpc(url, body, opts) {
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
    .then(([res, body]) => {
      if (
        res.status === 401 &&
        String(body.msg).toLowerCase() === "invalid token"
      ) {
        doLogout();
      }
      return [res, body];
    });
}
export const useFetch = (url, convert) => {
  const [refreshCounter, setRefreshCounter] = useState(0);
  convert = useStable(convert);
  const data = usePromise(() => {
    return jsonRpc(url, null, {
      method: "GET",
    }).then(([res, json]) => {
      if (isError(res)) {
        console.error(json.msg);
        Toast.show("Error occured while fetching content ");
      } else {
        const data = convert(json);
        console.log("got data", data);
        return data;
      }
    });
  }, [refreshCounter, url]);
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
  console.log({ "login result": body });
  if (isError(res)) {
    throw new Error(body.msg);
  } else {
    setUserToken(body);
  }
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

// export const createAccountGoogle = async () => {
//   await doLogin({ email: "googleuser@gmail.com", password: "" });
// };
// export const doLoginGoogle = createAccountGoogle;
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
  console.log("got res", body);
  if (res.status === 200) {
    setUser(toUser(body.msg));
  } else {
    await doLogout();
  }
};
