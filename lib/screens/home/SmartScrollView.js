import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import Template from "../../components/Template";
import { useMutex } from "../../utils/mutex";

const isCloseToBottom = (
  { layoutMeasurement, contentOffset, contentSize },
  onEndReachedThreshold
) => {
  const paddingToBottom = contentSize.height * onEndReachedThreshold;

  return (
    Math.ceil(layoutMeasurement.height + contentOffset.y) >=
    contentSize.height - paddingToBottom
  );
};

export default function SmartScrollView({ onRefresh, onEndReached, ...props }) {
  const onEndReachedThreshold = 50;
  const [isRefreshing, setIsRefreshing] = useState();
  const refresh = useMutex(async () => {
    setIsRefreshing(true);
    try {
      await onRefresh?.();
    } finally {
      setIsRefreshing(false);
    }
  });
  return (
    <Template
      as={ScrollView}
      style={{ width: "100%", height: 200 }}
      scrollEventThrottle={16}
      nestedScrollEnabled
      refreshControl={
        <RefreshControl refreshing={!!isRefreshing} onRefresh={refresh} />
      }
      onScroll={(e) => {
        const nativeEvent = e.nativeEvent;
        if (isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.0)) {
          onEndReached?.();
        }
      }}
      props={props}
    />
  );
}
