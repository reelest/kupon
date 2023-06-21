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
import { IconButton, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import useModal from "../../utils/useModal";
import { ScrollView } from "react-native-gesture-handler";
const fields = {
  fullName: REQUIRED,
  email: REQUIRED_EMAIL,
  phoneNumber: REQUIRED_PHONE,
  message: REQUIRED,
};
export default function GetInTouchScreen({ navigation }) {
  const route = useRoute();
  const successModal = useModal();
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
              fullName: "",
              email: "",
              phoneNumber: "",
              message: "",
            }}
            onSubmit={async (data) => {
              //TODO
              await console.log(data);
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
              mode="contained"
              style={{ marginVertical: 32 }}
            >
              Send
            </FormSubmit>
          </Form>
        </View>
      </ScrollView>
    </Screen>
  );
}
