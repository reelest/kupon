import { StyleSheet } from "react-native";
import { Platform, NativeModules } from "react-native";
import AppTheme from "./AppTheme";
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export const LIGHTEST_GRAY = "#dddddd";
export const GRAY_TEXT = "#777777";
export const GRAY_SIDEBAR = "#555555";
export const PRIMARY_DARK = "#904D00";
export const PRIMARY_LIGHT = "#FFEDE2";
export const HIGHLIGHT = "#FFE16E";
export const SCROLL_BACKGROUND = "#FDF1EB";
export const TERTIARY_LIGHT = "#BAFDFF";
export const LIGHT_GRAY = "#aaaaaa";
export default StyleSheet.create({
  splashContainer: {
    flex: 1,
    display: "flex",
    height: "100%",
    backgroundColor: AppTheme.colors.background,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: STATUSBAR_HEIGHT,
    paddingBottom: 30,
    justifyContent: "center",
  },
  root: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  topButton: {
    backgroundColor: PRIMARY_LIGHT,
    borderRadius: 10,
    color: "black",
    marginBottom: 20,
    position: "relative",
  },
  italic400: {
    fontWeight: 400,
    fontFamily: AppTheme.fonts.default.fontFamily + "_Italic",
    // fontStyle: "italic", Messes up font
  },
  primaryVariant: {
    backgroundColor: "#FFB77C",
    color: PRIMARY_DARK,
  },
  surfaceContainer: {
    backgroundColor: "#F7ECE5",
  },
  primaryText: {
    color: PRIMARY_DARK,
  },
  primary50Text: {
    color: "#B46200",
  },
  container: {
    backgroundColor: AppTheme.colors.background,
    paddingTop: STATUSBAR_HEIGHT,
    paddingBottom: 30,
    paddingHorizontal: 25,
    minHeight: "100%",
  },
  formElement: {
    marginVertical: 5,
  },
  itemRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  topImage: {
    width: 280,
    minHeight: 200,
    maxHeight: "40%",
    maxWidth: "90%",
    resizeMode: "contain",
  },
  productImage: {
    width: "100%",
    resizeMode: "cover",
    backgroundColor: LIGHTEST_GRAY,
    borderRadius: 10,
  },
  aboutUsParagraph: {
    color: PRIMARY_DARK,
    marginBottom: 16,
  },
});
