import { View } from "react-native";
import { useState, useMemo, useRef, useEffect } from "react";
import AppStyles from "../../components/AppStyles";
import Banners from "./Banners";
import { useProducts } from "../../logic/products";

import MasonryLayout from "./MasonryLayout";
import ResponsiveImage from "./ResponsiveImage";
import BottomNav from "./BottomNav";
import SmartScrollView from "./SmartScrollView";
import { debounce } from "lodash";
import { formatNumber } from "../../utils/formatNumber";
import Animated, { StretchInY, StretchOutY } from "react-native-reanimated";
import SearchBox from "./SearchBox";
import createQuery from "../../utils/createQuery";
import { noop } from "../../utils/none";
import { TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { Text } from "react-native-paper";
import createSubscription from "../../utils/createSubscription";

export const [useHomeTabIndex, , setHomeTabIndex] = createSubscription(noop);
setHomeTabIndex(0);
const BATCH_SIZE = 5;

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
 * @param {import("@react-navigation/drawer").DrawerScreenProps} props
 */
export default function HomeScreen() {
  const [limit, setLimit] = useState(BATCH_SIZE);
  const [filter, setFilter] = useState("");
  const [searchQuery, onSearch] = useState("");
  const products = useProducts();
  const store = useRef({ cache: new Map() }).current;
  store.limit = limit;
  store.products = products;
  const onEndReached = useMemo(
    () =>
      debounce(
        () => {
          const { limit, products } = store;
          setLimit(Math.min(products?.length || 0, limit) + BATCH_SIZE);
        },
        2000,
        { trailing: true }
      ),
    []
  );
  const filtered = useMemo(() => {
    const getScore = createQuery(searchQuery);
    return (products || [])
      .map((e) => ({ item: e, score: getScore(e.name) }))
      .sort((a, b) => b.score - a.score)
      .filter((e, i, a) => i < 3 || e.score >= Math.min(20, a[0].score / 2))
      .map((e) => e.item);
  }, [products, searchQuery]);
  const results = filtered.slice(0, limit);
  const index = useHomeTabIndex() ?? 0;
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }} onPress={noop}>
      <Animated.View entering={StretchInY} exiting={StretchOutY}>
        <ResponsiveImage uri={item.image} cache={store.cache} />

        <Text variant="titleMedium" style={{ color: "#777777" }}>
          {item.name}
        </Text>
        <Text variant="bodyMedium">{"N" + formatNumber(item.price)}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
  const ref = useRef();
  useEffect(() => {
    ref?.current?.setPageWithoutAnimation?.(index);
  }, [index]);
  return (
    <View style={{ display: "flex", height: "100%", width: "100%" }}>
      <PagerView
        ref={ref}
        style={{ flex: 1 }}
        onPageSelected={async (e) => {
          const x = e.nativeEvent.position;
          if (x !== index) setHomeTabIndex(x);
        }}
      >
        <View
          key="0"
          style={{
            height: "100%",
            backgroundColor: AppStyles.container.backgroundColor,
          }}
        >
          <SmartScrollView onEndReached={onEndReached}>
            <View
              style={{
                ...AppStyles.container,
                paddingHorizontal: AppStyles.container.paddingHorizontal - 5,
              }}
            >
              <SearchBox
                onSearch={onSearch}
                value={filter}
                setValue={setFilter}
              />
              <Banners />
              <MasonryLayout products={results} renderItem={renderItem} />
              {/* {loading && LoadingView} */}
            </View>
          </SmartScrollView>
        </View>
        <View
          key="1"
          style={{
            height: "100%",
            backgroundColor: AppStyles.container.backgroundColor,
          }}
        >
          <SmartScrollView onEndReached={onEndReached}>
            <View
              style={{
                ...AppStyles.container,
                paddingHorizontal: AppStyles.container.paddingHorizontal - 5,
              }}
            >
              <SearchBox
                onSearch={onSearch}
                value={filter}
                setValue={setFilter}
              />
              <MasonryLayout products={results} renderItem={renderItem} />
              {/* {loading && LoadingView} */}
            </View>
          </SmartScrollView>
        </View>
      </PagerView>
      <BottomNav index={index} setIndex={setHomeTabIndex} routes={ROUTES} />
    </View>
  );
}
