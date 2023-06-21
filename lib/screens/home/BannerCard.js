import { Button, IconButton, Surface, Text } from "react-native-paper";
import { Linking, View, Image } from "react-native";

import { p, shiftY, w } from "../../utils/cssUtils";
import createSubscription from "../../utils/createSubscription";
import { noop } from "../../utils/none";
import { wff } from "../../components/AppTheme";
import Iconset from "../../components/Iconset";

const [useExpanded, , setExpanded] = createSubscription(noop);
setExpanded("1");
export default function BannerCard({
  id,
  image,
  color,
  h1,
  bg,
  desc,
  cta,
  href,
  buttonBg,
  buttonColor,
  onPress,
  variant = "small",
}) {
  const isExpanded = useExpanded() === id && variant === "expandable";
  const isReduced = !isExpanded && variant === "expandable";
  const isSmall = !isExpanded && !isReduced;
  return (
    <View style={p(0, 5, 10)}>
      <Surface
        style={{
          borderRadius: 20,
          backgroundColor: bg,
          width: "100%",
          maxHeight: isSmall ? 180 : isExpanded ? 500 : 150,
          minHeight: isSmall ? 180 : 150,
          display: "flex",
          flexDirection: isExpanded || isSmall ? "column" : "row",
          paddingTop: isExpanded ? 30 : 10,
          paddingLeft: isReduced ? 10 : 20,
          paddingRight: isExpanded ? 20 : 0,
          paddingBottom: isReduced ? 10 : isExpanded ? 30 : null,
        }}
      >
        {!isSmall ? (
          <Image
            source={image}
            resizeMode="contain"
            style={[
              shiftY(5),
              w(isExpanded ? "100%" : "45%"),
              { height: isExpanded ? 150 : 110, maxHeight: "90%" },
            ]}
          />
        ) : null}
        <View
          style={
            isReduced
              ? {
                  width: "55%",
                  flex: isReduced ? 1 : null,
                  height: "100%",
                  justifyContent: "space-between",
                  paddingRight: isReduced ? 16 : null,
                  alignItems: "flex-end",
                }
              : null
          }
        >
          <Text
            variant={
              isReduced
                ? "titleLarge"
                : isExpanded
                ? "displaySmall"
                : "titleMedium"
            }
            style={[
              { color, marginTop: isExpanded ? 30 : 0 },
              isExpanded ? wff({ fontWeight: 700, fontSize: 36 }) : null,
            ]}
          >
            {h1}
          </Text>
          {isExpanded ? (
            <>
              <Text variant="titleMedium" style={{ color, marginVertical: 16 }}>
                {desc}
              </Text>
              <Button
                mode="contained"
                icon={(props) => (
                  <Iconset name="open-in-new" size={20} {...props} />
                )}
                buttonColor={buttonBg}
                textColor={buttonColor}
                onPress={onPress || (() => Linking.openURL(href))}
              >
                {cta}
              </Button>
            </>
          ) : null}
          {isReduced ? (
            <IconButton
              icon="chevron-down"
              textColor={buttonBg}
              containerColor={buttonColor}
              onPress={() => setExpanded(id)}
            />
          ) : null}
        </View>
        {isSmall ? (
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
        ) : null}
      </Surface>
    </View>
  );
}
