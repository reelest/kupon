import { View, Image } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import group1 from "./group_1.png";
import group2 from "./group_2.png";
import group3 from "./group_3.png";
import group4 from "./group_4.png";
import group5 from "./group_5.png";
import cuate from "./cuate.png";
import AppStyles, { LIGHTEST_GRAY } from "../../components/AppStyles";
import Spacer from "../../components/Spacer";
import useArrayState from "../../utils/useArrayState";

const slides = [
  {
    image: group5,
    header: "Shopping made easy",
    subHeader:
      "Shop from a wide range of product listings  conveniently and seamlessly.",
    bottomImage: null,
    button1Text: "Next",
    button2Text: "Skip",
    button2Variant: "text",
    nextSlide1: 1,
    nextSlide2: 4,
  },
  {
    image: group4,
    header: "Reach your target market",
    subHeader:
      "Showcase your products, reach a wider audience, and elevate your online business to new heights.",
    bottomImage: null,
    button1Text: "Next",
    button2Text: "Skip",
    button2Variant: "text",
    nextSlide1: 2,
    nextSlide2: 4,
  },
  {
    image: group3,
    header: "Deliver services to any destination",
    subHeader: "Deliver services to any destination",
    bottomImage: null,
    button1Text: "Next",
    button2Text: "Skip",
    button2Variant: "text",
    nextSlide1: 3,
    nextSlide2: 4,
  },
  {
    image: group2,
    header: "Track Shipment",
    subHeader: "Monitor the progress point of your package",
    bottomImage: cuate,
    button1Text: "Get Started",
    button2Text: null,
    button2Variant: "text",
    nextSlide1: 4,
    nextSlide2: -1,
  },
  {
    image: group1,
    header: "Welcome to Kupon Logistics",
    subHeader: "Streamline your logistics processes",
    bottomImage: null,
    button1Text: "Log In",
    button2Text: "Sign Up",
    button2Variant: "outlined",
    nextPage1: "Log In",
    nextPage2: "Sign Up",
  },
];

export default function OnboardingScreen({ navigation: nav }) {
  const [slide, setSlide] = useArrayState(slides);
  const theme = useTheme();
  return (
    <View style={AppStyles.splashContainer}>
      <Spacer style={{ backgroundColor: LIGHTEST_GRAY }} />
      <Image source={slide.image} style={AppStyles.topImage}></Image>
      <Image
        source={slide.bottomImage}
        style={[
          {
            position: "absolute",
            bottom: -10,
            left: 0,
            right: 0,
            width: "auto",
            resizeMode: "contain",
          },
        ]}
      ></Image>
      <Spacer />
      <Text
        variant="titleLarge"
        style={{ marginBottom: 10, textAlign: "center" }}
      >
        {slide.header}
      </Text>
      <Text variant="titleSmall" style={[{ marginBottom: 50 }]}>
        {slide.subHeader}
      </Text>
      <Button
        onPress={() =>
          slide.nextPage1
            ? nav.navigate(slide.nextPage1)
            : setSlide(slides[slide.nextSlide1])
        }
        mode="contained"
        style={[{ marginVertical: 10, width: "100%" }]}
      >
        {slide.button1Text}
      </Button>
      <Button
        onPress={
          slide.button2Text
            ? () =>
                slide.nextPage2
                  ? nav.navigate(slide.nextPage2)
                  : setSlide(slides[slide.nextSlide2])
            : null
        }
        mode={slide.button2Variant}
        style={[
          { marginVertical: 10, width: "100%" },
          { borderColor: theme.colors.primary },
        ]}
      >
        {slide.button2Text}
      </Button>
    </View>
  );
}
