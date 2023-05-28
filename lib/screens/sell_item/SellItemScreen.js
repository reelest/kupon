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
export default function SellItemScreen({ navigation }) {
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
        <Text variant="titleLarge">List an Item for Sale</Text>
        <Form
          initialValue={{
            images: null,
            name: "",
            condition: "",
            category: "",
            price: "",
          }}
          validationRules={fields}
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
            {"Item's Description"}
          </Text>
          <FormErrors />
          <FormField name="name" label="Item Name" placeholder="eg. Shoe" />
          <FormField
            as={Select}
            name="condition"
            values={[{ value: "Hello" }]}
          />
          <FormField name="category" label="Category" />
          <FormField name="price" label="Price" keyboardType="numeric" />
          <FormSubmit mode="contained" style={{ marginTop: 40 }}>
            Next
          </FormSubmit>
        </Form>
      </View>
    </ScrollView>
  );
}
