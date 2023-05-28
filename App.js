import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import Iconset from "@expo/vector-icons/MaterialCommunityIcons";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MySplashScreen from "./lib/screens/splash/SplashScreen";
import AppContext, { store } from "./lib/components/AppContext";
import OnboardingScreen from "./lib/screens/onboarding/OnboardingScreen";
import { PaperProvider } from "react-native-paper";
import AppTheme from "./lib/components/AppTheme";
import SignupScreen from "./lib/screens/signup/SignupScreen";
import LoginScreen from "./lib/screens/login/LoginScreen";
import { useUser } from "./lib/logic/auth";
import { Stack } from "./lib/components/navigators";
import MainRoutes from "./lib/screens/MainRoutes";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [splashScreenShown, setSplashScreenShown] = useState(false);
  const user = useUser();
  useMemo(() => {
    store.setSplashScreenShown = setSplashScreenShown;
    store.setContext = (data) => {
      Object.assign({}, data, store);
    };
  }, []);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Iconset.font);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <AppContext value={store}>
      <PaperProvider theme={AppTheme}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {appIsReady && splashScreenShown && user !== undefined ? (
              <>
                {user ? (
                  <Stack.Screen name="Main" component={MainRoutes} />
                ) : (
                  <>
                    <Stack.Screen
                      name="Onboarding"
                      component={OnboardingScreen}
                    />
                    <Stack.Screen name="Log In" component={LoginScreen} />
                    <Stack.Screen name="Sign Up" component={SignupScreen} />
                  </>
                )}
              </>
            ) : (
              <Stack.Screen
                options={{ headerShown: false }}
                name="SplashScreen"
                component={MySplashScreen}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext>
  );
}
