import { useState, useRef, memo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

function ResponsiveImage({
  uri,
  cache = new Map(),
  height = cache.has(uri) ? cache.get(uri).height : 100,
  width = cache.has(uri) ? cache.get(uri).width : 0,
}) {
  const state = useRef({
    measuredWidth: width,
    aspectRatio: width > 0 ? height / width : 0,
  }).current;
  const setMeasuredWidth = (e) => {
    state.measuredWidth = e;
    onUpdate();
  };
  const setAspectRatio = (e) => {
    state.aspectRatio = e;
    onUpdate();
  };
  const onUpdate = () => {
    const { measuredWidth, aspectRatio } = state;
    if (aspectRatio !== 0 && measuredWidth > 0) {
      heightRef.value = aspectRatio * measuredWidth;
      cache.set(uri, {
        width: measuredWidth,
        height: aspectRatio * measuredWidth,
      });
    }
  };
  const heightRef = useSharedValue(height);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withSpring(heightRef.value),
    };
  });
  return (
    <Animated.Image
      source={{ uri }}
      onLayout={(ev) => {
        setMeasuredWidth(ev.nativeEvent.layout.width);
      }}
      onLoad={({
        nativeEvent: {
          source: { width, height },
        },
      }) => setAspectRatio(height / width)}
      style={[
        {
          width: "100%",
          resizeMode: "cover",
          backgroundColor: "#eeeeee",
          borderRadius: 10,
        },
        animatedStyles,
      ]}
    />
  );
}

export default memo(ResponsiveImage);
