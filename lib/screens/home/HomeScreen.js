import { View } from "react-native";
import { useState, useMemo, useRef, useEffect } from "react";
import AppStyles, { GRAY_TEXT } from "../../components/AppStyles";
import Banners from "./Banners";
import { useProducts } from "../../logic/products";

import MasonryLayout from "./MasonryLayout";
import ResponsiveImage from "./ResponsiveImage";
import BottomNav, { onHomeTabIndexChanged, setHomeTabIndex } from "./BottomNav";
import SmartScrollView from "./SmartScrollView";
import { debounce } from "lodash";
import { formatNumber } from "../../utils/formatNumber";
import Animated, { StretchInY, StretchOutY } from "react-native-reanimated";
import SearchBox from "./SearchBox";
import createQuery from "../../utils/createQuery";
import { noop } from "../../utils/none";
import { TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { Provider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Screen from "../../components/Screen";

const BATCH_SIZE = 5;

/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps} props
 */
export default function HomeScreen() {
  const [limit, setLimit] = useState(BATCH_SIZE);

  const [searchQuery, onSearch] = useState("");
  const products = useProducts();
  const homeData = useRef({ cache: new Map() }).current;
  homeData.limit = limit;
  homeData.products = products;
  const onEndReached = useMemo(
    () =>
      debounce(
        () => {
          const { limit, products } = homeData;
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
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }} onPress={noop}>
      <Animated.View entering={StretchInY} exiting={StretchOutY}>
        <ResponsiveImage
          uri={item.image}
          cache={homeData.cache}
          style={AppStyles.productImage}
        />
        <Text variant="titleMedium" style={{ color: GRAY_TEXT }}>
          {item.name}
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
  return (
    <Screen>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        onPageSelected={(e) => {
          const x = e.nativeEvent.position;
          setHomeTabIndex(x);
        }}
      >
        <SearchView key="0" {...{ onEndReached, onSearch }}>
          <Banners />
          <MasonryLayout products={results} renderItem={renderItem} />
          {/* {loading && LoadingView} */}
        </SearchView>
        <SearchView key="1" {...{ onEndReached, onSearch }}>
          <MasonryLayout products={results} renderItem={renderItem} />
        </SearchView>
        {/* {loading && LoadingView} */}
      </PagerView>
      <BottomNav />
    </Screen>
  );
}

function SearchView({ key, children, onEndReached, onSearch }) {
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
        <SmartScrollView onEndReached={onEndReached}>
          <View
            style={{
              paddingHorizontal: AppStyles.container.paddingHorizontal - 5,
            }}
          >
            <SearchBox
              onSearch={onSearch}
              value={filter}
              setValue={setFilter}
            />
            {children}
          </View>
        </SmartScrollView>
      </Provider>
    </View>
  );
}
