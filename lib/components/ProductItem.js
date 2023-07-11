import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Animated, { StretchInY, StretchOutY } from "react-native-reanimated";
import ResponsiveImage from "../screens/home/ResponsiveImage";
import AppStyles, { GRAY_TEXT } from "./AppStyles";
import { Text } from "react-native-paper";
import { formatNumber } from "../utils/formatNumber";
import Template from "./Template";
import { View } from "react-native";

export default function ProductItem({ item, ...props }) {
  const navigation = useNavigation();
  return (
    <Template
      as={TouchableOpacity}
      props={props}
      style={{ padding: 10 }}
      onPress={() => navigation.navigate("View Product", { item: item })}
    >
      <Animated.View
        entering={StretchInY}
        exiting={StretchOutY}
        style={{ height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#e0e9ef",
            borderRadius: 8,
          }}
        >
          <ResponsiveImage uri={item.image} style={AppStyles.productImage} />
        </View>
        <Text variant="titleMedium" style={{ color: GRAY_TEXT }}>
          {item.title}
        </Text>
        <Text variant="bodyMedium">{"N" + formatNumber(item.price)}</Text>
      </Animated.View>
    </Template>
  );
}
