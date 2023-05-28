import { IconButton, Text } from "react-native-paper";
import AppStyles from "../../components/AppStyles";
import { View, ScrollView } from "react-native";
import Select from "../../components/Select";
import Form, {
  FormErrors,
  FormField,
  FormImage,
  FormSubmit,
} from "../../components/Form";
const fields = {
  name: { required: true, minlength: 2 },
  price: { required: true, numbers: true },
  condition: { required: true },
  category: {
    required: true,
  },
};

/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps} props
 */
export default function ReceiverInformation({ navigation, route }) {
  const sendersInfo = route.params;
  console.log({ sendersInfo });
  return (
    <ScrollView style={[AppStyles.container, { paddingHorizontal: 10 }]}>
      <IconButton
        icon="arrow-left"
        style={AppStyles.topButton}
        onPress={() => {
          navigation.goBack();
        }}
      ></IconButton>
      <View style={{ paddingHorizontal: 15, marginBottom: 150, width: "100%" }}>
        <Text variant="titleLarge">Send Package</Text>
        <Form
          initialValue={{
            ...sendersInfo,
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
          <FormField name="receiverEmail" label="Email Address" />
          <FormField name="receiverPhoneNumber" label="Phone Number" />
          <FormField name="receiverPostCode" label="Post Code" />
          <FormField name="receiverCode" label="Receiver's Code" />
          <FormField name="deliveryAddress" label="Delivery Address" />
          <FormField name="deliveryCity" label="Delivery City" />
          <FormSubmit mode="contained" style={{ marginTop: 40 }}>
            Proceed To Checkout
          </FormSubmit>
        </Form>
      </View>
    </ScrollView>
  );
}
