import { TextInput } from "react-native-paper";
import AppStyles from "./AppStyles";
import { useState } from "react";
import Template from "./Template";
export default function PasswordBox(props) {
  const [show, setShow] = useState();
  return (
    <Template
      props={props}
      as={TextInput}
      mode="outlined"
      secureTextEntry={!show}
      autoCorrect={false}
      right={
        <TextInput.Icon
          icon={show ? "eye-off-outline" : "eye-outline"}
          onPress={() => setShow(!show)}
          forceTextInputFocus={false}
          size={24}
        />
      }
      style={AppStyles.formElement}
    />
  );
}
