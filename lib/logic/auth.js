import createSubscription from "../utils/createSubscription";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { noop } from "../utils/none";
import sentenceCase from "../utils/sentenceCase";

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
  });
};
/**
 * @param {{email: string, password: string}} data
 */
export const doLogin = async ({ email, password }) => {
  console.log("Loggging in ....");
  const res = await jsonRpc("/user/login", { email, password });
  if (res.status !== 200) {
    const body = await res.json();
    throw new Error(body.msg);
  } else {
    setUserToken(await res.text());
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
  const res = await jsonRpc("/user/register", {
    email,
    password,
    telephone,
    address,
    firstName,
    lastName,
  });
  if (res.status !== 200) {
    const body = await res.json();
    if (typeof body === "string") {
      setUserToken(body);
    } else throw new Error(sentenceCase(String(body.msg)));
  } else {
    setUserToken(await res.text());
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

//Utilities
export const errorToUserString = (e) => {
  switch (e) {
    case "user":
      return "Email is not registered";
    case "password":
      return "Wrong password";
    default:
      console.error(e);
      return "Server Error. Try refreshing this page.";
  }
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
  const res = await jsonRpc("/user/id_of_user", { token });
  if (res.status === 200) {
    await doLogout();
  } else {
    setUser(await res.json());
  }
};
