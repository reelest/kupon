import {
  Button,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import AppStyles, {
  LIGHT_GRAY,
  PRIMARY_DARK,
  PRIMARY_LIGHT,
  TERTIARY_LIGHT,
} from "../../components/AppStyles";
import { View, ScrollView, Image } from "react-native";
import { useUser } from "../../logic/auth";
import Screen from "../../components/Screen";
import Iconset from "../../components/Iconset";
import Spacer from "../../components/Spacer";
import { ActivityIndicator } from "react-native-paper";
import { useSentItemsAPI } from "../../logic/products";

export default function ProfileScreen({ navigation }) {
  const user = useUser();
  console.log("profile Screen");
  const theme = useTheme();
  const sentItems = useSentItemsAPI();
  console.log({ sentItems });
  if (!user) return;
  return (
    <Screen>
      <ScrollView
        style={{
          flexGrow: 1,
          width: "100%",
          height: 0,
          maxHeight: "100%",
        }}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
      >
        <IconButton
          icon="arrow-left"
          style={[
            AppStyles.topButton,
            { alignSelf: "flex-start", backgroundColor: TERTIARY_LIGHT },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        ></IconButton>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingBottom: 30,
            flexGrow: 1,
          }}
        >
          <Image
            style={{
              width: 108,
              height: 108,
              borderRadius: 54,
              backgroundColor: LIGHT_GRAY,
              marginBottom: 20,
            }}
            source={{ uri: user.photoURL }}
          />
          <Text variant="titleLarge" style={{ marginBottom: 40 }}>
            {user?.displayName}
          </Text>
          <Surface
            style={{
              backgroundColor: theme.colors.tertiary,
              flexGrow: 1,
              width: "100%",
              flexShrink: 0,
              // height: 100,
              borderRadius: 24,
              paddingHorizontal: 20,
              paddingVertical: 32,
            }}
          >
            <View style={AppStyles.itemRow}>
              <Iconset name="email-outline" color="white" size={24} />
              <Text
                variant="bodyMedium"
                style={{ color: "white", marginLeft: 10 }}
              >
                {user.email}
              </Text>
            </View>
            <View style={AppStyles.itemRow}>
              <Iconset name="phone-outline" color="white" size={24} />
              <Text
                variant="bodyMedium"
                style={{ color: "white", marginLeft: 10 }}
              >
                {user.phoneNumber}
              </Text>
            </View>
            <View style={AppStyles.itemRow}>
              <Iconset name="map-marker-outline" color="white" size={24} />
              <Text
                variant=""
                style={{
                  color: "white",
                  marginLeft: 10,
                  ...(user.address ? {} : AppStyles.italic400),
                }}
              >
                {user.address || "No address supplied "}
              </Text>
            </View>
            <Spacer />
            <Button
              mode="contained"
              onPress={() => navigation.push("Edit Profile")}
              buttonColor={theme.colors.tertiaryContainer}
              textColor={theme.colors.onTertiaryContainer}
            >
              Edit Details
            </Button>
          </Surface>
          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
              paddingVertical: 32,
              flexShrink: 0,
            }}
          >
            <Text variant="titleLarge">Sent Items</Text>
            <View style={{ flexGrow: 1, width: "100%", marginVertical: 8 }}>
              {sentItems ? (
                sentItems.length ? (
                  sentItems.map((e) => (
                    <View
                      key={e.id}
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 10,
                        width: "100%",
                        marginVertical: 4,
                        borderColor: theme.colors.outlineVariant,
                        backgroundColor: "#FFF8F5",
                        borderWidth: 1,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: e.image }}
                        style={{
                          width: 48,
                          height: 48,
                          marginRight: 16,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text variant="titleMedium">{e.name}</Text>
                          <Text
                            variant="bodyMedium"
                            style={{
                              color: theme.colors.onSurfaceVariant,
                            }}
                          >
                            {" "}
                            - Tracking Number:{e.trackingNumber}
                          </Text>
                        </View>
                        <Text
                          variant="labelMedium"
                          style={{ color: theme.colors.tertiary, marginTop: 4 }}
                        >
                          {e.status}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text>No sent Items</Text>
                )
              ) : (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    marginVertical: 16,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={50} />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
