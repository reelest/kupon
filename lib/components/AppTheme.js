import { MD3LightTheme } from "react-native-paper";
import { merge } from "lodash";
const names = {
  100: "Thin",
  300: "Light",
  400: "Regular",
  500: "Medium",
  700: "Bold",
  900: "Black",
};
const AppTheme = merge(
  MD3LightTheme,
  /**
   * @type {import("react-native-paper").MD3Theme}
   */ ({
    version: 3,
    fonts: Object.fromEntries(
      Object.keys(MD3LightTheme.fonts).map((e) => [
        e,
        {
          fontFamily: `Roboto_${MD3LightTheme.fonts[e].fontWeight}${
            names[MD3LightTheme.fonts[e].fontWeight]
          }${
            names[MD3LightTheme.fonts[e].fontStyle] === "italic"
              ? "_Italic"
              : ""
          }`,
        },
      ])
    ),
    colors: {
      primary: "#FD901A",
      primaryContainer: "#ffdcc3",
      onPrimary: "#ffffff",
      onPrimaryContainer: "#2f1500",
      secondary: "#705d00",
      secondaryContainer: "#FFE16E",
      tertiary: "#00696C",
      tertiaryContainer: "#6FF6FB",
      onTertiaryContainer: "#4D2700",
      surface: "#fffbff",
      elevation: {
        level2: "#F70000",
        // level3: "#FD901A",
        // level3: "#FDF1EB",
        level1: "#FFDCC2",
        level3: "#F2E6DF",
      },
    },
  })
);
export default AppTheme;
