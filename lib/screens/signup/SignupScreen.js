import { ScrollView, View, Image } from "react-native";
import AppStyles from "../../components/AppStyles";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import google from "./Google.png";
import PasswordBox from "../../components/PasswordBox";
import {
  createAccount,
  createAccountGoogle,
  doLoginGoogle,
} from "../../logic/auth";
import useFormHandler from "../../utils/useFormHandler";
import {
  useValidation,
  defaultRules,
  defaultMessages,
} from "react-simple-form-validator";
import { useState } from "react";

export default function SignupScreen({ isLogin, navigation }) {
  const theme = useTheme();
  const [showErrors, setShowErrors] = useState(false);
  const form = useFormHandler(
    {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmpassword: "",
    },
    async function handle(fd) {
      if (isFormValid) await createAccount(fd);
      else if (!showErrors) setShowErrors(true);
    }
  );
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
  const { isFieldInError, getErrorMessages, isFormValid } = useValidation({
    fieldsRules: isLogin
      ? loginFields
      : {
          name: { required: true, minlength: 2 },
          email: loginFields.email,
          phoneNumber: { required: true, phone: true },
          password: loginFields.password,
          confirmpassword: {
            required: true,
            equalPassword: form.data.password,
          },
        },
    locale: "en",
    rules: {
      phone: (_, val) => /^\+?\d+$/.test(val),
      ...defaultRules,
    },
    messages: {
      ...defaultMessages,
      en: { ...defaultMessages.en, phone: "Invalid phone number" },
    },
    state: form.data,
  });

  return (
    <ScrollView style={AppStyles.container}>
      <View>
        <Text variant="titleLarge" style={{ marginTop: 50, marginBottom: 30 }}>
          {!isLogin ? "Create Account" : "Sign In"}
        </Text>
        {showErrors ? (
          <Text variant="labelLarge" style={{ color: theme.colors.error }}>
            {getErrorMessages().split("\n").slice(0, 2).join("\n")}
          </Text>
        ) : undefined}
        {!isLogin ? (
          <TextInput
            {...form.textInput("name")}
            mode="outlined"
            label="Full Name"
            outlineColor={
              showErrors && isFieldInError("name") ? theme.colors.error : null
            }
            activeOutlineColor={
              showErrors && isFieldInError("name") ? theme.colors.error : null
            }
            style={AppStyles.formElement}
          />
        ) : null}
        <TextInput
          {...form.textInput("email")}
          mode="outlined"
          label="Email Address"
          keyboardType="email-address"
          outlineColor={
            showErrors && isFieldInError("email") ? theme.colors.error : null
          }
          activeOutlineColor={
            showErrors && isFieldInError("email") ? theme.colors.error : null
          }
          style={AppStyles.formElement}
        />
        {!isLogin ? (
          <TextInput
            {...form.textInput("phoneNumber")}
            mode="outlined"
            label="Phone Number"
            keyboardType="phone-pad"
            outlineColor={
              showErrors && isFieldInError("phoneNumber")
                ? theme.colors.error
                : null
            }
            activeOutlineColor={
              showErrors && isFieldInError("phoneNumber")
                ? theme.colors.error
                : null
            }
            style={AppStyles.formElement}
          />
        ) : null}
        <PasswordBox
          {...form.textInput("password")}
          outlineColor={
            showErrors && isFieldInError("phoneNumber")
              ? theme.colors.error
              : null
          }
          activeOutlineColor={
            showErrors && isFieldInError("phoneNumber")
              ? theme.colors.error
              : null
          }
          label="Password"
        />
        {!isLogin ? (
          <PasswordBox
            {...form.textInput("confirmpassword")}
            outlineColor={
              showErrors && isFieldInError("phoneNumber")
                ? theme.colors.error
                : null
            }
            activeOutlineColor={
              showErrors && isFieldInError("phoneNumber")
                ? theme.colors.error
                : null
            }
            label="Confirm Password"
          />
        ) : null}

        <Button
          mode="contained"
          {...form.submit()}
          style={[{ marginVertical: 20, width: "100%" }]}
        >
          {isLogin ? "Sign In" : "Create Account"}
        </Button>
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
            onPress={() => navigation.navigate(isLogin ? "Sign Up" : "Log In")}
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
          style={{ marginVertical: 20, borderRadius: 10 }}
          onPress={isLogin ? createAccountGoogle : doLoginGoogle}
        >
          Create Account With Google
        </Button>
      </View>
    </ScrollView>
  );
}
