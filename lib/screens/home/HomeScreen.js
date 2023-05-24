import { View, Dimensions } from "react-native";
import { useState, useMemo, useRef } from "react";
import {
  Searchbar,
  useTheme,
  Text,
  IconButton,
  Avatar,
} from "react-native-paper";
import AppStyles from "../../components/AppStyles";
import { useUser } from "../../logic/auth";
import Banners from "./Banners";
import { shiftY } from "../../utils/cssUtils";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useProducts } from "../../logic/products";

import MasonryLayout from "./MasonryLayout";
import ResponsiveImage from "./ResponsiveImage";
import BottomNav from "./BottomNav";
import SmartScrollView from "./SmartScrollView";
import { debounce } from "lodash";
import { formatNumber } from "../../utils/formatNumber";
const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  const width = Dimensions.get("window").width;
  const theme = useTheme();
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: width - 50 },
          drawerPosition: "right",
        }}
      >
        <Drawer.Screen name="Home" component={HomeRoute} />
        <Drawer.Screen name="Market Place" component={MarketPlaceRoute} />
      </Drawer.Navigator>
    </>
  );
}
/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps} props
 */
function HomeRoute({ navigation, route }) {
  const user = useUser();
  const [limit, setLimit] = useState(10);
  const products = useProducts();
  const ref = useRef();
  ref.current = { limit, products };
  const onEndReached = useMemo(
    () =>
      debounce(
        () => {
          const { limit, products } = ref.current;
          setLimit(Math.min(products?.length || 0, limit) + 10);
        },
        2000,
        { trailing: true }
      ),
    []
  );
  const theme = useTheme();
  const renderItem = ({ item, i }) => (
    <>
      <ResponsiveImage uri={item.image} />
      <Text variant="titleMedium" style={{ color: "#777777" }}>
        {item.name}
      </Text>
      <Text variant="bodyMedium">{"N" + formatNumber(item.price)}</Text>
    </>
  );

  return (
    <BottomNav route={route} navigation={navigation}>
      <SmartScrollView onEndReached={onEndReached}>
        <View
          style={{
            ...AppStyles.container,
          }}
        >
          <Searchbar
            mode="bar"
            placeholder="Search..."
            icon={() => (
              <IconButton
                icon={() => (
                  <Avatar.Text
                    size={32}
                    style={shiftY(-3)}
                    label={(user.email || "US").slice(0, 2).toUpperCase()}
                  />
                )}
                size={24}
              />
            )}
            traileringIcon={() => (
              <IconButton icon="magnify" size={24} style={shiftY(-3)} />
            )}
            right={() => <IconButton icon="menu" size={24} />}
          />
          <Banners />
          <MasonryLayout
            products={products?.slice?.(0, limit)}
            renderItem={renderItem}
          />
          {/* {loading && LoadingView} */}
        </View>
      </SmartScrollView>
    </BottomNav>
  );
}

function MarketPlaceRoute({ navigation, route }) {
  return (
    <BottomNav route={route} navigation={navigation}>
      <View style={[AppStyles.container]}>
        <Text>Hello</Text>
      </View>
    </BottomNav>
  );
}
