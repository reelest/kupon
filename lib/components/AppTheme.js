import { MD3LightTheme } from "react-native-paper";
import { merge } from "lodash";

const AppTheme = merge(
  MD3LightTheme,
  /**
   * @type {import("react-native-paper").MD3Theme}
   */ ({
    version: 3,
    fonts: {
      titleLarge: {
        fontWeight: 700,
      },
    },
    colors: { primary: "#FD901A", onPrimary: "#ffffff" },
  })
);
export default AppTheme;
