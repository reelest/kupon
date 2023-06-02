import { BottomNavigation } from "react-native-paper";
import AppStyles from "../../components/AppStyles";
import createSubscription from "../../utils/createSubscription";
import { noop } from "../../utils/none";

export const [useHomeTabIndex, onHomeTabIndexChanged, setHomeTabIndex] =
  createSubscription(noop);
setHomeTabIndex(0);

const ROUTES = [
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
];
/**
 *
 * @param {DrawerScreenProps<{}>} props
 * @returns
 */
export default function BottomNav() {
  const index = useHomeTabIndex();
  return (
    <BottomNavigation.Bar
      navigationState={{
        index,
        routes: ROUTES,
      }}
      onTabPress={({ route }) => {
        const index = ROUTES.findIndex((e) => e.title === route.title);
        setHomeTabIndex(index);
      }}
      style={AppStyles.surfaceContainer}
    />
  );
}
