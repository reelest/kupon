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
export default function SenderInformation({ navigation, route }) {
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
            images: null,
            name: "",
            condition: "",
            category: "",
            price: "",
          }}
          validationRules={fields}
          onSubmit={(data) => {
            navigation.push("Receiver's Information", data);
          }}
        >
          <FormImage
            name="images"
            style={{ marginTop: 40, marginBottom: 20 }}
          />
          <Text style={{ textAlign: "center" }}>
            Note: maximum of two files
          </Text>
          <Text style={{ textAlign: "center" }}>
            Note: image should not be more than 500kb
          </Text>
          <Text
            variant="titleLarge"
            style={[AppStyles.primary50Text, { marginTop: 30 }]}
          >
            {route.name}
          </Text>
          <FormErrors />
          <FormField
            name="senderName"
            label="Full Name"
            placeholder="eg. Shoe"
          />
          <FormField name="senderEmail" label="Email Address" />
          <FormField name="senderPhoneNumber" label="Phone Number" />
          <FormField name="senderCompany" label="Company" />
          <FormField
            name="pickupAddress"
            label="Pick Up Address"
            placeholder="eg. Shoe"
          />
          <FormField name="pickupCity" label="Pick Up City" />
          <FormSubmit mode="contained" style={{ marginTop: 40 }}>
            Next
          </FormSubmit>
        </Form>
      </View>
    </ScrollView>
  );
}
