import { useRef, memo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Image } from "react-native";
function ResponsiveImage({
  source, //Use source for only inbuilt assets
  uri = source,
  cache = new Map(),
  height = cache.has(uri) ? cache.get(uri).height : 100,
  width = cache.has(uri) ? cache.get(uri).width : 0,
  style, //It is important to cache this in AppStyles or else, the memo will fail
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
  useEffect(
    function () {
      if (source !== undefined) {
        const { width, height } = Image.resolveAssetSource(source);
        setAspectRatio(height / width);
      } else {
        Image.getSize(uri, (width, height) => {
          setAspectRatio(height / width);
        });
      }
    },
    [uri]
  );
  return (
    <Animated.Image
      source={source ?? { uri }}
      onLayout={(ev) => {
        setMeasuredWidth(ev.nativeEvent.layout.width);
      }}
      style={[style, animatedStyles]}
    />
  );
}

export default memo(ResponsiveImage);
