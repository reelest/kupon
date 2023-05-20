import { StyleSheet } from "react-native";
export default StyleSheet.create({
  splashContainer: {
    flex: 1,
    display: "flex",
    height: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 20,
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
