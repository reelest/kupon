import { View } from "react-native";
import { useState, useMemo, useRef, useEffect } from "react";
import Banners from "./Banners";
import { useProducts } from "../../logic/products";

import MasonryLayout from "./MasonryLayout";
import BottomNav, { onHomeTabIndexChanged, setHomeTabIndex } from "./BottomNav";
import { debounce } from "lodash";
import createQuery from "../../utils/createQuery";
import PagerView from "react-native-pager-view";
import Screen from "../../components/Screen";
import useStable from "../../utils/useStable";
import ProductItem from "../../components/ProductItem";
import SearchView from "../../components/SearchView";

/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps<any, any, any>} props
 */
export default function HomeScreen({ route }) {
  const [searchQuery, onSearch] = useState(route.params?.search ?? "");
  useEffect(() => onSearch(route.params?.search), [route.params?.search]);
  const { data: products, more, refresh } = useProducts();
  const onEndReached = useStable(more, (e) =>
    debounce(e, 2000, { trailing: true })
  );
  const results = useMemo(() => {
    const getScore = createQuery(searchQuery || "");
    return (products || [])
      .map((e) => ({
        item: e,
        score: getScore(e.name) + getScore(JSON.stringify(e)),
      }))
      .sort((a, b) => b.score - a.score)
      .filter((e, i, a) => i < 3 || e.score >= Math.min(20, a[0].score / 2))
      .map((e) => e.item);
  }, [products, searchQuery]);
  const renderItem = ({ item }) => <ProductItem item={item} />;
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
        <SearchView
          defaultSearch={searchQuery}
          key="0"
          {...{ onEndReached, refresh, onSearch }}
        >
          <Banners />
          {Items}
          {LongView}
        </SearchView>
        <SearchView
          defaultSearch={searchQuery}
          key="1"
          {...{ onEndReached, refresh, onSearch }}
        >
          {Items}
        </SearchView>
      </PagerView>
      <BottomNav />
    </Screen>
  );
}
