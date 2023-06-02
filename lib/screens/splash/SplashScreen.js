import { View, Text, Image } from "react-native";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { useCallback } from "react";
import delay from "../../utils/delay";
import { useAppContext } from "../../logic/app_context";
import vector2 from "./assets/vector_2.png";
import app_logo from "./assets/app_logo.png";
import amico from "./assets/amico.png";
// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

export default function SplashScreen() {
  const { setSplashScreenShown } = useAppContext();
  const onLayoutRootView = useCallback(async () => {
    await hideAsync();
    //Splash screen stays for at least a second
    await delay(1000);
    setSplashScreenShown(true);
  }, []);

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={vector2}
        style={{ width: "100%", height: 300, position: "absolute", top: 0 }}
      />
      <Image
        source={app_logo}
        style={{
          width: 200,
          resizeMode: "contain",
        }}
      />
      <Image
        source={amico}
        style={{
          width: "auto",
          resizeMode: "contain",
          position: "absolute",
          bottom: 0,
          left: 36,
          right: 36,
        }}
      />
    </View>
  );
}
