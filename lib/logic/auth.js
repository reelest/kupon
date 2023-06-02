import createSubscription from "../utils/createSubscription";
import delay from "../utils/delay";
import { dummyData } from "../utils/dummy_data";
import AsyncStorage from "@react-native-async-storage/async-storage";

//User Management
export const forgotPasswordAPIUrl = "/api/resetpassword";

const USERS = {
  "admin@test.com": {
    password: "admin-password",
  },
  "googleuser@gmail.com": {
    password: "",
  },
};

/**
 * @param {{email: string, password: string}} data
 */
export const doLogin = async (data) => {
  await delay(1500);
  console.log("logging in", data);
  const email = data.email;
  const password = data.password;
  if (USERS[email]) {
    const user = USERS[email];
    if (user.password === password) {
      await AsyncStorage.setItem("user-logged-in", email);
      setUser(user);
      return { success: true };
    } else {
      throw { success: false, cause: "password" };
    }
  } else {
    throw { success: false, cause: "user" };
  }
};

export const createAccount = async ({ email, password }) => {
  USERS[email] = {
    password,
  };
  await doLogin({ email, password });
};
export const createAccountGoogle = async () => {
  await doLogin({ email: "googleuser@gmail.com", password: "" });
};
export const doLoginGoogle = createAccountGoogle;
export const doLogout = async () => {
  await delay(1500);
  await AsyncStorage.removeItem("user-logged-in");
  setUser(null);
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

const USER_API = dummyData({
  name: "name",
  displayName: "name",
  firstName: "firstName",
  lastName: "lastName",
  phoneNumber: "phoneNumber",
  photoURL: "image",
});

export const [useUser, , setUser] = createSubscription(async (setData) => {
  const loggedIn = (await AsyncStorage.getItem("user-logged-in")) ?? null;
  await delay(3000);
  setData(loggedIn ? getUser(loggedIn) : null);
});

const getUser = (email) =>
  Object.assign(USERS[email] || (USERS[email] = {}), USER_API, { email });
