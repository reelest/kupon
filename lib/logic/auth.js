import createSubscription from "../utils/createSubscription";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { noop } from "../utils/none";
import sentenceCase from "../utils/sentenceCase";
import jwtDecode from "jwt-decode";

export const getContent = async (res) => {
  try {
    let body = await res.text();
    try {
      body = JSON.parse(body);
    } catch (_) {
      /* empty */
    }
    console.log("body:", body);
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
const jsonRpc = async (url, body, opts) => {
  console.log("Sending request ", url, { body, opts });
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
//   name: "name",
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

export const [useUser, , setUser] = createSubscription((setUser) => {
  return onUserToken(async (token) => {
    if (token === null) return setUser(null);
    await updateUser(token);
  });
});
const toUser = (e) => {
  e.displayName = `${e.firstName || ""} ${(e.lastName || "").toUpperCase()}`;
  e.phoneNumber = e.telephone;
  return e;
};
const updateUser = async (token) => {
  console.log({ token });
  let decoded;
  try {

    decoded = jwtDecode(token);
  } catch (e) {
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
