import * as React from "react";
import { Dimensions, Text, View, Linking } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import BannerCard, { banners } from "./BannerCard";
import AppStyles from "../../components/AppStyles";

function Banners() {
  const width = Dimensions.get("window").width;
  return (
    <Carousel
      loop
      style={{
        marginTop: 20,
        left: -AppStyles.container.paddingHorizontal + 5,
        zIndex: 0,
        position: "relative",
      }}
      width={width}
      height={180}
      autoPlay={true}
      data={banners}
      scrollAnimationDuration={1000}
      autoPlayInterval={5000}
      // onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ index, item: props }) => (
        <View
          style={{
            paddingHorizontal: AppStyles.container.paddingHorizontal,
            width: width,
          }}
        >
          <BannerCard {...props} />
        </View>
      )}
    />
  );
}

export default Banners;
