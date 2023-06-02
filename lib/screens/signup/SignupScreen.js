import { ScrollView, View, Image } from "react-native";
import AppStyles from "../../components/AppStyles";
import { Button, Text } from "react-native-paper";
import google from "./Google.png";
import PasswordBox from "../../components/PasswordBox";
import {
  createAccount,
  createAccountGoogle,
  doLoginGoogle,
} from "../../logic/auth";
import Form, { FormErrors, FormField, FormSubmit } from "../../components/Form";
import useGoogleSignIn from "../../utils/useGoogleSignIn";

const loginFields = {
  email: { email: true, required: true },
  password: {
    required: true,
    hasNumber: true,
    hasUpperCase: true,
    hasLowerCase: true,
    minlength: 8,
  },
};

const signupFields = {
  name: { required: true, minlength: 2 },
  email: loginFields.email,
  phoneNumber: { required: true, phone: true },
  password: loginFields.password,
  confirmpassword: {
    required: true,
    equalField: "password",
  },
};
export default function SignupScreen({ isLogin, navigation }) {
  const [disabled, signInGoogle] = useGoogleSignIn();
  return (
    <ScrollView style={AppStyles.container}>
      <View>
        <Text variant="titleLarge" style={{ marginTop: 50, marginBottom: 30 }}>
          {!isLogin ? "Create Account" : "Sign In"}
        </Text>
        <Form
          initialData={{
            data: {
              name: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmpassword: "",
            },
          }}
          validationRules={isLogin ? loginFields : signupFields}
          onSubmit={createAccount}
        >
          <FormErrors />
          {!isLogin ? (
            <FormField
              name="name"
              mode="outlined"
              label="Full Name"
              style={AppStyles.formElement}
            />
          ) : null}
          <FormField
            name="email"
            mode="outlined"
            label="Email Address"
            keyboardType="email-address"
            style={AppStyles.formElement}
          />
          {!isLogin ? (
            <FormField
              name="phoneNumber"
              mode="outlined"
              label="Phone Number"
              keyboardType="phone-pad"
              style={AppStyles.formElement}
            />
          ) : null}
          <PasswordBox name="password" label="Password" />
          {!isLogin ? (
            <PasswordBox name="confirmpassword" label="Confirm Password" />
          ) : null}

          <FormSubmit
            mode="contained"
            style={[{ marginVertical: 20, width: "100%" }]}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </FormSubmit>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <Text>
              {!isLogin ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <Button
              mode="text"
              onPress={() =>
                navigation.navigate(isLogin ? "Sign Up" : "Log In")
              }
            >
              {!isLogin ? "Sign In" : "Create one now"}
            </Button>
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
            disabled={disabled}
            onPress={signInGoogle}
            style={{ marginVertical: 20, borderRadius: 10 }}
          >
            Create Account With Google
          </Button>
        </Form>
      </View>
    </ScrollView>
  );
}
