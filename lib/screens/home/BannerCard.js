import { Button, Surface, Text } from "react-native-paper";
import { Linking, View, Image } from "react-native";

import { p, shiftY, w } from "../../utils/cssUtils";

export default function BannerCard({
  image,
  color,
  h1,
  bg,
  desc,
  cta,
  href,
  buttonBg,
  buttonColor,
}) {
  return (
    <View style={p(0, 5, 10)}>
      <Surface
        style={{
          borderRadius: 20,
          backgroundColor: bg,
          width: "100%",
          height: "100%",
          display: "flex",
          paddingTop: 10,
          paddingLeft: 20,
        }}
      >
        <Text variant="titleMedium" style={{ color }}>
          {h1}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "55%",
              paddingBottom: 10,
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <View />
            <Text variant="bodyMedium" style={{ color }}>
              {desc}
            </Text>
            <Button
              mode="contained"
              buttonColor={buttonBg}
              textColor={buttonColor}
              onPress={() => Linking.openURL(href)}
            >
              {cta}
            </Button>
          </View>
          <Image
            source={image}
            resizeMode="contain"
            style={[shiftY(5), w("45%"), { height: 110, maxHeight: "90%" }]}
          />
        </View>
      </Surface>
    </View>
  );
}
