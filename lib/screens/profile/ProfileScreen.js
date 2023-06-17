import {
  Button,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import AppStyles, {
  LIGHT_GRAY,
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
  const theme = useTheme();
  // const sentItems = useSentItemsAPI();
  if (!user) return;
  return (
    <Screen>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          height: 0,
        }}
        contentContainerStyle={{ flex: 1, paddingHorizontal: 10 }}
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
            flex: 1,
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
              flex: 1,
              width: "100%",
              height: 100,
              borderRadius: 24,
              padding: 20,
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
          <Text variant="titleLarge">Sent Items</Text>
          {/* <View style={{ flex: 1 }}>
            {sentItems ? (
              sentItems.length ? (
                sentItems.map((e) => <Text key={e.id}>{e.name}</Text>)
              ) : (
                <Text>No sent Items</Text>
              )
            ) : (
              <ActivityIndicator />
            )}
          </View> */}
        </View>
      </ScrollView>
    </Screen>
  );
}
