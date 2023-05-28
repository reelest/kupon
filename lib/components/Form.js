import { Button, Text, TextInput, useTheme } from "react-native-paper";
import Template from "./Template";
import { createContext, useContext, useState } from "react";
import AppStyles from "./AppStyles";
import useFormHandler from "../utils/useFormHandler";
import { noop } from "../utils/none";
import ImagePicker from "./ImagePicker";
import {
  defaultMessages,
  defaultRules,
  useValidation,
} from "react-simple-form-validator";

/**
 * @typedef {{
 *  handler: {textInput: Function},
 * }} FormParams
 */
/**
 * @type {React.Context<FormParams>}
 */
const FormContext = createContext();

export default function Form({
  children,
  validationRules = {},
  initialValue = {},
  onSubmit = noop,
  ...props
}) {
  const handler = useFormHandler(initialValue, async function handle(fd) {
    if (isFormValid) await onSubmit(fd);
    else if (!showErrors) setShowErrors(true);
  });

  const [showErrors, setShowErrors] = useState(false);
  console.log(handler.data);
  const { isFieldInError, getErrorMessages, isFormValid, getErrorsInField } =
    useValidation({
      fieldsRules: validationRules,
      locale: "en",
      rules: {
        phone: (_, val) => /^\+?\d+$/.test(val),
        equalField: (field, val) => val === handler.data[field],
        ...defaultRules,
      },
      messages: {
        ...defaultMessages,
        en: {
          ...defaultMessages.en,
          phone: "Invalid phone number",
          equalField: defaultMessages.en.equalPassword,
        },
      },
      state: handler.data,
    });
  return (
    <FormContext.Provider
      value={{
        handler,
        data: handler.data,
        isFieldInError,
        showErrors,
        getErrorMessages,
        getErrorsInField,
        ...props,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

/**
 *
 * @param {import("react-native-paper").TextInputProps} param0
 * @returns
 */
export function FormField({ name, ...props }) {
  const theme = useTheme();
  const { isFieldInError, handler, showErrors } = useContext(FormContext);
  return (
    <Template
      as={TextInput}
      props={props}
      {...handler.textInput(name)}
      mode="outlined"
      outlineColor={
        showErrors && isFieldInError?.(name) ? theme.colors.error : null
      }
      activeOutlineColor={
        showErrors && isFieldInError?.(name) ? theme.colors.error : null
      }
      style={AppStyles.formElement}
    />
  );
}

export function FormImage({ name, ...props }) {
  const { handler } = useContext(FormContext);

  return (
    <ImagePicker
      image={handler.data[name]}
      setImage={(e) => handler.set(name, e)}
      {...props}
    />
  );
}

export function FormSubmit({ name, ...props }) {
  const { handler } = useContext(FormContext);
  return <Button {...handler.submit(name)} {...props} />;
}

export function FormErrors({ lines = 2 }) {
  const { showErrors, getErrorMessages } = useContext(FormContext);
  const theme = useTheme();
  return showErrors ? (
    <Text variant="labelLarge" style={{ color: theme.colors.error }}>
      {getErrorMessages().split("\n").slice(0, lines).join("\n")}
    </Text>
  ) : null;
}
