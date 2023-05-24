import { Image } from "react-native";
import { useState, memo } from "react";

function ResponsiveImage({ uri, height = -1, width = 1 }) {
  const [measuredWidth, setMeasuredWidth] = useState(-1);
  const [aspectRatio, setAspectRatio] = useState(height / width);
  return (
    <Image
      source={{ uri }}
      onLayout={(ev) => {
        setMeasuredWidth(ev.nativeEvent.layout.width);
      }}
      onLoad={({
        nativeEvent: {
          source: { width, height },
        },
      }) => setAspectRatio(height / width)}
      style={{
        width: "100%",
        height:
          aspectRatio > 0 && measuredWidth > 0
            ? aspectRatio * measuredWidth
            : 100,
        resizeMode: "cover",
        backgroundColor: "#eeeeee",
        borderRadius: 10,
      }}
    />
  );
}

export default memo(ResponsiveImage);
