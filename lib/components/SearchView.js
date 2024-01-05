import { useEffect, useState } from "react";
import { noop } from "../utils/none";
import { View } from "react-native";
import AppStyles from "./AppStyles";
import { Provider } from "react-native-paper";
import SmartScrollView from "../screens/home/SmartScrollView";
import SearchBox from "../screens/home/SearchBox";

export default function SearchView({
  key,
  children,
  onEndReached,
  onSearch,
  defaultSearch,
  refresh = noop,
}) {
  const [filter, setFilter] = useState(defaultSearch);
  useEffect(() => setFilter(defaultSearch), [defaultSearch]);
  console.log({ filter });
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
