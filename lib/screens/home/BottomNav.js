import { BottomNavigation } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppStyles from "../../components/AppStyles";

/**
 *
 * @param {DrawerScreenProps<{}>} props
 * @returns
 */
export default function BottomNav({ index, setIndex, routes }) {
  return (
    <BottomNavigation.Bar
      navigationState={{
        index,
        routes,
      }}
      onTabPress={({ route }) => {
        setIndex(routes.findIndex((e) => e.title === route.title));
      }}
      style={AppStyles.surfaceContainer}
    />
  );
}
