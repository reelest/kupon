import { IconButton, PaperProvider, Text } from "react-native-paper";
import AppStyles from "../../components/AppStyles";
import { View, ScrollView } from "react-native";
import Select from "../../components/Select";
import Form, {
  FormErrors,
  FormField,
  FormSubmit,
  REQUIRED,
  REQUIRED_EMAIL,
  REQUIRED_NUMBER,
  REQUIRED_PHONE,
} from "../../components/Form";
import useModal from "../../utils/useModal";
import Screen from "../../components/Screen";
const fields = {
  receiverName: REQUIRED,
  receiverEmail: { email: true },
  receiverPhoneNumber: REQUIRED_PHONE,
  receiverPostCode: REQUIRED_NUMBER,
  receiverCode: REQUIRED,
  deliveryAddress: REQUIRED,
  deliveryCity: REQUIRED,
};
/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps} props
 */
export default function ReceiverInformation({ navigation, route }) {
  const sendersInfo = route.params;
  const successModal = useModal();
  return (
    <Screen>
      <ScrollView
        style={[AppStyles.container, { paddingHorizontal: 10, paddingTop: 0 }]}
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
          <Text variant="titleLarge">Send Package</Text>
          <Form
            initialValue={{
              ...sendersInfo,
              receiverName: "",
              receiverEmail: "",
              receiverPhoneNumber: "",
              receiverPostCode: "",
              receiverCode: "",
              deliveryAddress: "",
              deliveryCity: "",
            }}
            onSubmit={async (data) => {
              //TODO
              await console.log(data);
              successModal.show();
            }}
            validationRules={fields}
          >
            <Text
              variant="titleLarge"
              style={[AppStyles.primary50Text, { marginTop: 30 }]}
            >
              {route.name}
            </Text>
            <FormErrors />
            <FormField
              name="receiverName"
              label="Full Name"
              placeholder="eg. Shoe"
            />
            <FormField
              name="receiverEmail"
              label="Email Address"
              keyboardType="email-address"
            />
            <FormField
              name="receiverPhoneNumber"
              label="Phone Number"
              keyboardType="phone-pad"
            />
            <FormField
              name="receiverPostCode"
              label="Post Code"
              keyboardType="number-pad"
            />
            <FormField name="receiverCode" label="Receiver's Code" />
            <FormField name="deliveryAddress" label="Delivery Address" />
            <FormField name="deliveryCity" label="Delivery City" />
            <FormSubmit mode="contained" style={{ marginTop: 40 }}>
              Proceed To Checkout
            </FormSubmit>
          </Form>
        </View>
      </ScrollView>
      <successModal.Modal>
        <Text>Hello</Text>
      </successModal.Modal>
    </Screen>
  );
}
