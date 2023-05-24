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
      titleMedium: {
        fontWeight: 700,
      },
      titleSmall: {
        fontWeight: 700,
      },
    },
    colors: {
      primary: "#904D00",
      secondary: "#705d00",
      onPrimary: "#ffffff",
      primaryContainer: "#ffdcc3",
      onPrimaryContainer: "#2f1500",
      secondaryContainer: "#FFE16E",
      tertiary: "#00696C",
      surface: "#fffbff",
      elevation: {
        level1: "#F2E6DF",
        level2: "#F7ECE5",
        // level3: "#FD901A",
        level3: "#FDF1EB",
        level5: "#FFDCC2",
        // level1: "#FFDCC2",
        // level3: "#FFDCC2",
        // level4: "#FFDCC2",
      },
    },
  })
);
export default AppTheme;
