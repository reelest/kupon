import createSubscription from "../utils/createSubscription";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { noop } from "../utils/none";
import sentenceCase from "../utils/sentenceCase";
import jwtDecode from "jwt-decode";

//User Management
export const forgotPasswordAPIUrl = "/api/resetpassword";

const ROOT = "https://kupon.com.ng";
const jsonRpc = async (url, body) => {
  return await fetch(`${ROOT}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => [res, await res.json()]);
};

const isError = (res) => res.status >= 300 || res.status < 200;
/**
 * @param {{email: string, password: string}} data
 */
export const doLogin = async ({ email, password }) => {
  console.log("Loggging in ....");
  const [res, body] = await jsonRpc("/user/login", { email, password });
  if (isError(res.status)) {
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
  if (e) setUserToken(e);
  else setUserToken(null);
});

onUserToken(async function (token) {
  if (token === null) await AsyncStorage.removeItem(STORAGE_KEY);
  else AsyncStorage.setItem(STORAGE_KEY, token);
});

export const [useUser, , setUser] = createSubscription((setUser) => {
  return onUserToken(async (token) => {
    if (token === null) return setUser(null);
    await updateUser(token);
  });
});

const updateUser = async (token) => {
  const decoded = jwtDecode(token);
  console.log(decoded);
  const res = await jsonRpc(`/user/${decoded.id}`);
  if (res === 200) {
    await doLogout();
  } else {
    setUser(await res.json());
  }
};
