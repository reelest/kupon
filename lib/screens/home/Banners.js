import * as React from "react";
import { Dimensions, Text, View, Linking } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import BannerCard, { banners } from "./BannerCard";
import AppStyles from "../../components/AppStyles";

function Banners() {
  const width =
    Dimensions.get("window").width - AppStyles.container.paddingHorizontal * 2;
  return (
    <Carousel
      loop
      style={{ marginTop: 10 }}
      width={width}
      height={180}
      autoPlay={true}
      data={banners}
      scrollAnimationDuration={1000}
      autoPlayInterval={5000}
      // onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ index, item: props }) => <BannerCard {...props} />}
    />
  );
}

export default Banners;
