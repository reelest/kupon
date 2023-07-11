import { View } from "react-native";
import { useState, useMemo, useRef, useEffect } from "react";
import AppStyles, { GRAY_TEXT } from "../../components/AppStyles";
import Banners from "./Banners";
import { useProducts } from "../../logic/products";

import MasonryLayout from "./MasonryLayout";
import ResponsiveImage from "./ResponsiveImage";
import BottomNav, { onHomeTabIndexChanged, setHomeTabIndex } from "./BottomNav";
import SmartScrollView from "./SmartScrollView";
import { debounce, noop } from "lodash";
import { formatNumber } from "../../utils/formatNumber";
import Animated, { StretchInY, StretchOutY } from "react-native-reanimated";
import SearchBox from "./SearchBox";
import createQuery from "../../utils/createQuery";
import { TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { Provider, Text } from "react-native-paper";
import Screen from "../../components/Screen";
import useStable from "../../utils/useStable";

/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps<any, any, any>} props
 */
export default function HomeScreen({ route, navigation }) {
  const [searchQuery, onSearch] = useState(route.params?.search ?? "");
  /**
   * @type {{data: import("../../logic/products").Product[], more: Function, refresh:Function}}
   */
  const { data: products, more, refresh } = useProducts();
  const onEndReached = useStable(more, (e) =>
    debounce(e, 2000, { trailing: true })
  );
  const results = useMemo(() => {
    const getScore = createQuery(searchQuery);
    return (products || [])
      .map((e) => ({
        item: e,
        score: getScore(e.name) + getScore(JSON.stringify(e)),
      }))
      .sort((a, b) => b.score - a.score)
      .filter((e, i, a) => i < 3 || e.score >= Math.min(20, a[0].score / 2))
      .map((e) => e.item);
  }, [products, searchQuery]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => navigation.navigate("View Product", { item: item })}
    >
      <Animated.View entering={StretchInY} exiting={StretchOutY}>
        <ResponsiveImage uri={item.image} style={AppStyles.productImage} />
        <Text variant="titleMedium" style={{ color: GRAY_TEXT }}>
          {item.title}
        </Text>
        <Text variant="bodyMedium">{"N" + formatNumber(item.price)}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
  const pagerRef = useRef();
  useEffect(
    () =>
      onHomeTabIndexChanged((index) => {
        pagerRef?.current?.setPage?.(index);
      }),
    []
  );
  const Items = <MasonryLayout products={results} renderItem={renderItem} />;
  const LongView = <View style={{ height: 3000 }} />;
  return (
    <Screen>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1, backgroundColor: "green" }}
        onPageSelected={(e) => {
          const x = e.nativeEvent.position;
          setHomeTabIndex(x);
        }}
      >
        <SearchView key="0" {...{ onEndReached, refresh, onSearch }}>
          <Banners />
          {Items}
          {LongView}
          {/* {loading && LoadingView} */}
        </SearchView>
        <SearchView key="1" {...{ onEndReached, refresh, onSearch }}>
          {Items}
        </SearchView>
        {/* {loading && LoadingView} */}
      </PagerView>
      <BottomNav />
    </Screen>
  );
}

export function SearchView({
  key,
  children,
  onEndReached,
  onSearch,
  refresh = noop,
}) {
  const [filter, setFilter] = useState("");
  return (
    <View
      key={key}
      style={{
        height: "100%",
        backgroundColor: AppStyles.container.backgroundColor,
      }}
    >
      <Provider>
        <SmartScrollView
          onEndReached={onEndReached}
          onRefresh={refresh}
          contentContainerStyle={{
            minHeight: "100%",
            paddingHorizontal: AppStyles.container.paddingHorizontal - 5,
          }}
        >
          <SearchBox onSearch={onSearch} value={filter} setValue={setFilter} />
          {children}
        </SmartScrollView>
      </Provider>
    </View>
  );
}
