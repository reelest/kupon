import { memo } from "react";
import { Image } from "react-native";
function ResponsiveImage({
  source, //Use source for only inbuilt assets
  uri = source,
  style, //It is important to cache this in AppStyles or else, the memo will fail
}) {
  return <Image source={source ?? { uri }} aspectRatio={0.75} style={style} />;
}

export default memo(ResponsiveImage);
