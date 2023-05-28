import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import Template from "../../components/Template";

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

  return (
    <Template
      as={ScrollView}
      style={{ width: "100%", height: "100%" }}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={!!isRefreshing}
          onRefresh={async () => {
            setIsRefreshing(true);
            await onRefresh?.();
            setIsRefreshing(false);
          }}
        />
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
