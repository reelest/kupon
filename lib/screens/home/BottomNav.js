import { View } from "react-native";
import { BottomNavigation } from "react-native-paper";
import AppStyles from "../../components/AppStyles";
import { useState } from "react";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

/**
 *
 * @param {DrawerScreenProps<{}>} props
 * @returns
 */
export default function BottomNav({ navigation, route, children }) {
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "market",
      title: "Market Place",
      focusedIcon: "storefront",
      unfocusedIcon: "storefront-outline",
    },
  ]);

  const swipeLeft = Gesture.Fling()
    .direction(Directions.RIGHT)
    .runOnJS(true)
    .onEnd((event, success) => {
      if (success) {
        const index = navigation.getState().index;
        if (index > 0) {
          navigation.navigate(routes[index - 1].title);
        }
      }
    });

  const swipeRight = Gesture.Fling()
    .direction(Directions.LEFT)
    .runOnJS(true)
    .onEnd((event, success) => {
      if (success) {
        const index = navigation.getState().index;
        if (index < routes.length - 1) {
          navigation.navigate(routes[index + 1].title);
        }
      }
    });
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <GestureDetector gesture={Gesture.Exclusive(swipeLeft, swipeRight)}>
        <View
          style={{
            minHeight: 0,
            width: "100%",
            height: 0,
            flexGrow: 1,
            display: "flex",
            backgroundColor: AppStyles.container.backgroundColor,
          }}
        >
          {children}
        </View>
      </GestureDetector>
      <BottomNavigation.Bar
        navigationState={{
          index: routes.findIndex((e) => e.title === route.name),
          routes,
        }}
        onTabPress={({ route, preventDefault }) => {
          preventDefault();
          navigation.navigate(route.title);
        }}
      />
    </View>
  );
}
