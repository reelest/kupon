import { ScrollView, View, Image } from "react-native";
import AppStyles from "../../components/AppStyles";
import { Button, Text } from "react-native-paper";
import google from "./Google.png";
import PasswordBox from "../../components/PasswordBox";
import {
  createAccount,
  createAccountGoogle,
  doLogin,
  doLoginGoogle,
} from "../../logic/auth";
import Form, { FormErrors, FormField, FormSubmit } from "../../components/Form";
import useGoogleSignIn from "../../utils/useGoogleSignIn";

const loginFields = {
  email: { email: true, required: true },
  password: {
    required: true,
  },
};

const signupFields = {
  firstName: { required: true, minlength: 2 },
  lastName: { required: true, minlength: 2 },
  email: loginFields.email,
  telephone: { required: true, phone: true },
  address: { required: true, minlength: 2 },
  password: loginFields.password,
  confirmpassword: {
    required: true,
    equalField: "password",
  },
};
export default function SignupScreen({ isLogin, navigation }) {
  // const [userData, signInGoogle] = useGoogleSignIn();
  return (
    <ScrollView style={AppStyles.container}>
      <View>
        <Text variant="titleLarge" style={{ marginTop: 50, marginBottom: 30 }}>
          {!isLogin ? "Create Account" : "Sign In"}
        </Text>
        <Form
          initialData={{
            data: {
              firstName: "",
              lastName: "",
              email: "",
              telephone: "",
              address: "",
              password: "",
              confirmpassword: "",
            },
          }}
          validationRules={isLogin ? loginFields : signupFields}
          onSubmit={isLogin ? doLogin : createAccount}
        >
          <FormErrors />
          {!isLogin ? (
            <>
              <FormField
                name="firstName"
                mode="outlined"
                label="First Name"
                style={AppStyles.formElement}
              />
              <FormField
                name="lastName"
                mode="outlined"
                label="Last Name"
                style={AppStyles.formElement}
              />
            </>
          ) : null}
          <FormField
            name="email"
            mode="outlined"
            label="Email Address"
            keyboardType="email-address"
            style={AppStyles.formElement}
          />
          {!isLogin ? (
            <>
              <FormField
                name="telephone"
                mode="outlined"
                label="Phone Number"
                keyboardType="phone-pad"
                style={AppStyles.formElement}
              />
              <FormField
                name="address"
                mode="outlined"
                label="Address"
                style={AppStyles.formElement}
              />
            </>
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
          {/* <Button
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
            disabled={!signInGoogle}
            onPress={signInGoogle}
            style={{ marginVertical: 20, borderRadius: 10 }}
          >
            Create Account With Google
          </Button> */}
        </Form>
      </View>
    </ScrollView>
  );
}
