import AppStyles from "../../components/AppStyles";
import { View } from "react-native";
import Screen from "../../components/Screen";
import Form, {
  FormErrors,
  FormField,
  FormSubmit,
  REQUIRED,
  REQUIRED_EMAIL,
  REQUIRED_PHONE,
} from "../../components/Form";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import useModal from "../../utils/useModal";
import { ScrollView } from "react-native-gesture-handler";
import { contactUs } from "../../logic/api";
import { wff } from "../../components/AppTheme";
import { useUser } from "../../logic/auth";
const fields = {
  fullName: REQUIRED,
  email: REQUIRED_EMAIL,
  phoneNumber: REQUIRED_PHONE,
  message: REQUIRED,
};
export default function GetInTouchScreen({ navigation }) {
  const route = useRoute();
  const successModal = useModal();
  const theme = useTheme();
  const user = useUser();
  return (
    <Screen>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <IconButton
          icon="arrow-left"
          style={AppStyles.topButton}
          onPress={() => {
            navigation.goBack();
          }}
        ></IconButton>
        <View
          style={{ paddingHorizontal: 15, marginBottom: 150, width: "100%" }}
        >
          <Text variant="titleLarge">{route.name}</Text>

          <Form
            initialValue={{
              fullName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              message: "",
            }}
            onSubmit={async (data) => {
              //TODO
              await contactUs(data);
              successModal.show();
            }}
            validationRules={fields}
          >
            <FormErrors />
            <FormField
              name="fullName"
              label="Full Name"
              placeholder="Firstname Lastname"
            />
            <FormField name="email" label="Email Address" placeholder="" />
            <FormField
              name="phoneNumber"
              label="Phone Number"
              keyboardType="phone-pad"
              placeholder=""
            />
            <FormField
              name="message"
              label="Message"
              placeholder="What would you like to tell us"
            />
            <FormSubmit
              icon="send"
              showLoader
              mode="contained"
              style={{ marginVertical: 32 }}
            >
              Send
            </FormSubmit>
          </Form>
        </View>
      </ScrollView>
      <successModal.Modal style={{ paddingHorizontal: 24 }}>
        <Text
          style={wff({
            color: theme.colors.onSurface,
            fontWeight: 700,
            fontSize: 24,
            textAlign: "left",
            marginVertical: 16,
          })}
        >
          Thank you for reaching out
        </Text>
        <Text variant="bodyMedium">We will get in touch soon</Text>
        <View style={{ marginVertical: 16, justifyContent: "flex-end" }}>
          <Button mode="outlined" onPress={() => navigation.goBack()}>
            Return
          </Button>
        </View>
      </successModal.Modal>
    </Screen>
  );
}
