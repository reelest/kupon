import { StyleSheet } from "react-native";
import { Platform, NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
export default StyleSheet.create({
  splashContainer: {
    flex: 1,
    display: "flex",
    height: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: STATUSBAR_HEIGHT,
    paddingBottom: 30,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    paddingTop: STATUSBAR_HEIGHT,
    paddingBottom: 30,
    paddingHorizontal: 15,
    minHeight: "100%",
  },
  formElement: {
    marginVertical: 5,
  },
  topImage: {
    width: 280,
    minHeight: 200,
    maxHeight: "40%",
    maxWidth: "90%",
    resizeMode: "contain",
  },
});
