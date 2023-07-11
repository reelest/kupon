import AppStyles, { PRIMARY_DARK } from "../../components/AppStyles";
import { View, ScrollView, Image } from "react-native";
import Screen from "../../components/Screen";
import { Button, Text, TouchableRipple } from "react-native-paper";
import { SearchView } from "../home/HomeScreen";
import { noop } from "lodash";
import useArrayState from "../../utils/useArrayState";
import range from "../../utils/range";
import { useMemo } from "react";
import { dummyData } from "../../utils/dummy_data";
import Animated, {
  SlideInDown,
  SlideInRight,
  SlideInUp,
} from "react-native-reanimated";
import sentenceCase from "../../utils/sentenceCase";

/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps<any, any, any>} props
 */
export default function ProductScreen({ route, navigation }) {
  /** @type {import("../../logic/products").Product} */
  const product = route.params.item;
  const images =
    // useMemo(() => dummyData({ images: ["image"] }).images, []) ||
    product.images || [];
  const [previewIndex, setPreviewIndex] = useArrayState(
    range(0, images.length)
  );
  const mainImage = images[previewIndex];
  const otherImages = useMemo(() =>
    images.map((e, i) => [e, i]).filter(([e]) => e !== mainImage)
  );
  console.log({ mainImage, otherImages });
  return (
    <Screen>
      <SearchView onSearch={noop} onEndReached={noop}>
        <Text variant="titleLarge" style={{ color: "#7E7570", marginTop: 16 }}>
          {sentenceCase(product.title)}
        </Text>
        <Text variant="titleLarge">#{product.price}</Text>
        <View
          style={{
            height: 355,
            width: "100%",
            flexDirection: "row",
            marginVertical: 24,
            overflow: "hidden",
          }}
        >
          <Animated.Image
            entering={SlideInUp}
            key={mainImage + previewIndex}
            source={{ uri: mainImage }}
            style={{
              width: 140,
              flex: 1,
              height: "100%",
              resizeMode: "contain",
              backgroundColor: "#dddfe9",
              borderRadius: 8,
            }}
            resizeMode="contain"
          />

          <View style={{ height: "100%" }}>
            <ScrollView nestedScrollEnabled>
              {otherImages.map(([e, i]) => (
                <TouchableRipple
                  key={e + i}
                  onPress={() => setPreviewIndex(i)}
                  style={{
                    marginLeft: 24,
                    marginBottom: 24,
                  }}
                >
                  <Animated.Image
                    entering={SlideInRight}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                    }}
                    source={{ uri: e }}
                  />
                </TouchableRipple>
              ))}
            </ScrollView>
          </View>
        </View>
        <Text variant="titleMedium" style={{ marginTop: 16 }}>
          Description
        </Text>
        <Text variant="bodyMedium">
          {product.descriptions || "No description provided."}
        </Text>
        <Text variant="titleMedium" style={{ marginTop: 32 }}>
          Other Buyers
        </Text>
        <Text variant="bodyMedium">
          {product.comments || "No comments yet."}
        </Text>
        <Text variant="titleMedium" style={{ marginTop: 32 }}>
          Other Products From This Seller
        </Text>
        <Text variant="bodyMedium">
          {product.comments || "No comments yet."}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text variant="titleMedium" style={{ marginTop: 32 }}>
            Related Products
          </Text>
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate("Home", { search: product.title });
            }}
          >
            See All
          </Button>
        </View>
        <Text variant="bodyMedium" onPress={() => navigate}>
          {product.comments || "No comments yet."}
        </Text>
        <View style={{ paddingBottom: 144 }}></View>
      </SearchView>
    </Screen>
  );
}
