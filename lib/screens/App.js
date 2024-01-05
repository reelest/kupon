import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MySplashScreen from "./splash/SplashScreen";
import AppContext, { store } from "../logic/app_context";
import OnboardingScreen from "./onboarding/OnboardingScreen";
import { PaperProvider } from "react-native-paper";
import AppTheme from "../components/AppTheme";
import SignupScreen from "./signup/SignupScreen";
import LoginScreen from "./login/LoginScreen";
import { useUser } from "../logic/auth";
import { Stack } from "../components/navigators";
import Iconset from "../components/Iconset";
import MainRoutes from "./MainRoutes";
import "react-native-url-polyfill/auto";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import PaymentScreen from "./payment/PaymentScreen";
const loggedIcons = new Set();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });
  const [splashScreenShown, setSplashScreenShown] = useState(false);
  const user = useUser();
  useEffect(() => console.log("App.js", { user: user && true }), [user]);
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
    <RootSiblingParent>
      <AppContext value={store}>
        <PaperProvider
          theme={AppTheme}
          settings={{
            icon: (props) => {
              // eslint-disable-next-line no-undef
              if (__DEV__)
                if (
                  typeof props.name === "string" &&
                  !loggedIcons.has(props.name)
                ) {
                  loggedIcons.add(props.name);
                  console.log(`Using icon ${props.name}`);
                }
              return <Iconset {...props} />;
            },
          }}
        >
          <NavigationContainer>
            <StatusBar style="auto" />
            {appIsReady &&
            fontsLoaded &&
            splashScreenShown &&
            user !== undefined ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                  <>
                    <Stack.Screen name="Main" component={MainRoutes} />
                    <Stack.Screen
                      name="Make Payment"
                      component={PaymentScreen}
                    />
                  </>
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
              </Stack.Navigator>
            ) : (
              <MySplashScreen />
            )}
          </NavigationContainer>
        </PaperProvider>
      </AppContext>
    </RootSiblingParent>
  );
}
