import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import BannerCard from "./BannerCard";
import AppStyles from "../../components/AppStyles";
import useBannersAPI from "../../logic/banners";

function Banners() {
  const rightInset = Math.min(25, AppStyles.container.paddingHorizontal);
  const width = Dimensions.get("window").width;
  const banners = useBannersAPI();
  return (
    <Carousel
      loop
      style={{
        marginTop: 20,
        left: -AppStyles.container.paddingHorizontal + 5,
        zIndex: 0,
        elevation: 0,
        position: "relative",
      }}
      width={width - rightInset}
      height={180}
      autoPlay={true}
      data={banners}
      scrollAnimationDuration={1000}
      autoPlayInterval={5000}
      // onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ item: props }) => (
        <View
          style={{
            paddingLeft: AppStyles.container.paddingHorizontal,
            paddingRight: AppStyles.container.paddingHorizontal - rightInset,
            width: width - rightInset,
          }}
        >
          <BannerCard {...props} />
        </View>
      )}
    />
  );
}

export default Banners;
