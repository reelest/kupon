import { IconButton, Text } from "react-native-paper";
import AppStyles from "../../components/AppStyles";
import { View, ScrollView } from "react-native";
import Select from "../../components/Select";
import Form, {
  FormErrors,
  FormField,
  FormImage,
  FormSubmit,
  REQUIRED,
  REQUIRED_NUMBER,
} from "../../components/Form";
import { sellProduct } from "../../logic/products";
const fields = {
  name: { required: true, minlength: 2 },
  price: REQUIRED_NUMBER,
  condition: REQUIRED,
  category: REQUIRED,
  location: REQUIRED,
  city: REQUIRED,
  state: REQUIRED,
  material: REQUIRED,
  description: REQUIRED,
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
      />
      <View style={{ paddingHorizontal: 15, marginBottom: 150, width: "100%" }}>
        <Text variant="titleLarge">List an Item for Sale</Text>
        <Form
          initialValue={
            __DEV__
              ? {
                  images: [],
                  name: "Shoe",
                  condition: "Used",
                  category: "Wears",
                  location: "Sapele",
                  city: "Benin City",
                  state: "Edo State",
                  material: "Leather",
                  description: "No description",
                  price: "50",
                }
              : {
                  images: [],
                  name: "",
                  condition: "",
                  category: "",
                  location: "",
                  city: "",
                  state: "",
                  material: "",
                  description: "",
                  price: "",
                }
          }
          onSubmit={sellProduct}
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
            name="location"
            label="Item Location"
            placeholder="eg. Shoe"
          />
          <FormField name="city" label="City" placeholder="eg. Shoe" />
          <FormField name="state" label="State" placeholder="eg. Shoe" />
          <FormField name="material" label="Material" placeholder="eg. Shoe" />
          <FormField
            as={Select}
            name="condition"
            label="Condition"
            values={[{ value: "Hello" }]}
          />
          <FormField name="category" label="Category" />
          <FormField name="price" label="Price" keyboardType="numeric" />
          <FormField
            name="description"
            label="Description"
            multiline
            style={AppStyles.multilineInput}
          />
          <FormSubmit mode="contained" style={{ marginTop: 40 }}>
            Next
          </FormSubmit>
        </Form>
      </View>
    </ScrollView>
  );
}
