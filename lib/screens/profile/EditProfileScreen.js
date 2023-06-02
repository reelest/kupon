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
import { useImagePicker } from "../../components/ImagePicker";
import Form, { FormField, FormImage } from "../../components/Form";

function ProfileImagePicker({ image, setImage }) {
  const theme = useTheme();
  const [picked, pick] = useImagePicker(image, setImage);
  return (
    <View style={{ position: "relative" }}>
      <Image
        style={{
          width: 108,
          height: 108,
          borderRadius: 54,
          backgroundColor: LIGHT_GRAY,
          marginBottom: 20,
        }}
        source={{ uri: picked[0] }}
      />
      <IconButton
        icon="camera-plus-outline"
        onPress={pick}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          backgroundColor: "white",
          borderColor: theme.colors.outline,
          borderWidth: 1,
        }}
      />
    </View>
  );
}

export default function EditProfileScreen({ navigation }) {
  const user = useUser();
  const theme = useTheme();

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
          <Form initialValue={user} onSubmit={({ details }) => {}}>
            <FormImage name="photoURL" as={ProfileImagePicker} />
            <Text variant="titleLarge" style={{ marginBottom: 60 }}>
              {user?.displayName}
            </Text>
            <View
              style={{
                width: "100%",
                flex: 1,
                paddingBottom: 30,
              }}
            >
              <FormField name="name" label="Full Name" />
              <FormField name="email" label="Email Address" />
              <FormField name="phoneNumber" label="Phone Number" />
              <FormField name="address" label="House Address" />
              <Spacer />
              <Button
                mode="contained"
                onPress={() => navigation.push("Edit Profile")}
                buttonColor={theme.colors.tertiary}
                textColor={theme.colors.onTertiary}
              >
                Save Changes
              </Button>
            </View>
          </Form>
        </View>
      </ScrollView>
    </Screen>
  );
}
