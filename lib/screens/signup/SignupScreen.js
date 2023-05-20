import { ScrollView, View, Image } from "react-native";
import AppStyles from "../../components/AppStyles";
import { Button, Text, TextInput } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import google from "./Google.png";
export default function SignupScreen({ navigation }) {
  return (
    <ScrollView style={AppStyles.container}>
      <View>
        <Text variant="titleLarge">Create Account</Text>
        <TextInput
          mode="outlined"
          label="Full Name"
          style={[AppStyles.formElement, { marginTop: 30 }]}
        ></TextInput>
        <TextInput
          mode="outlined"
          label="Email Address"
          keyboardType="email-address"
          style={AppStyles.formElement}
        ></TextInput>
        <TextInput
          mode="outlined"
          label="Phone Number"
          keyboardType="phone-pad"
          style={AppStyles.formElement}
        ></TextInput>
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          autoCorrect={false}
          keyboardType="visible-password"
          right={<TextInput.Icon icon="eye" size={24} />}
          style={AppStyles.formElement}
        ></TextInput>
        <TextInput
          mode="outlined"
          label="Confirm Password"
          secureTextEntry
          autoCorrect={false}
          keyboardType="visible-password"
          right={<TextInput.Icon icon="eye" size={24} />}
          style={AppStyles.formElement}
        ></TextInput>
        <Button
          mode="contained"
          style={[{ marginVertical: 20, width: "100%" }]}
        >
          Create Account
        </Button>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          <Text>Already have an account?</Text>
          <Button mode="text">Sign In</Button>
        </View>
        <Button
          icon={() => (
            <Image
              source={google}
              style={{
                height: 18,
                width: 18,
                objectFit: "contain",
                resizeMode: "contain",
              }}
            />
          )}
          mode="outlined"
          style={{ marginVertical: 20, borderRadius: 10 }}
        >
          Create Account With Gooogle
        </Button>
      </View>
    </ScrollView>
  );
}
