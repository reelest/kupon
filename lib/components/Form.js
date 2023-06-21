import { Button, Text, TextInput, useTheme } from "react-native-paper";
import Template from "./Template";
import { createContext, useContext, useState } from "react";
import AppStyles from "./AppStyles";
import useFormHandler from "../utils/useFormHandler";
import ImagePicker from "./ImagePicker";
import {
  defaultMessages,
  defaultRules,
  useValidation,
} from "react-simple-form-validator";
import { useMutex } from "../utils/mutex";

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
  onSubmit,
  ...props
}) {
  onSubmit = useMutex(onSubmit);
  const [success, setSuccess] = useState(false);
  const handler = useFormHandler(initialValue, async function handle(fd) {
    if (!showErrors) setShowErrors(true);
    if (!isFormValid) {
      setSuccess(true);
      try {
        handler.setError(null);
        await onSubmit?.(fd);
      } catch (e) {
        setSuccess(false);
      }
    }
  });

  const [showErrors, setShowErrors] = useState(false);
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
        rules: validationRules,
        isFieldInError,
        showErrors,
        getErrorMessages,
        getErrorsInField,
        ...props,
        success,
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
export function FormField({ name, label, ...props }) {
  const theme = useTheme();
  const { isFieldInError, handler, rules, showErrors } =
    useContext(FormContext);
  return (
    <Template
      as={TextInput}
      props={props}
      label={rules?.[name]?.required ? (label || "") + " *" : label}
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
    <Template
      as={ImagePicker}
      image={handler.data[name]}
      setImage={(e) => handler.set(name, e)}
      props={props}
    />
  );
}

export function FormSubmit({ name, disableOnClick, ...props }) {
  const { handler, success } = useContext(FormContext);
  return (
    <Button
      {...handler.submit(name)}
      disabled={success && disableOnClick}
      {...props}
    />
  );
}

export function FormErrors({ lines = 2 }) {
  const { showErrors, getErrorMessages, handler } = useContext(FormContext);
  const theme = useTheme();
  return showErrors ? (
    <Text variant="labelLarge" style={{ color: theme.colors.error }}>
      {handler.error ? handler.error.message : null}
      {getErrorMessages().split("\n").slice(0, lines).join("\n")}
    </Text>
  ) : null;
}

export const REQUIRED = { required: true, minlength: 1 };
export const REQUIRED_NUMBER = { required: true, numbers: true };
export const REQUIRED_PHONE = { required: true, phone: true };
export const REQUIRED_EMAIL = { required: true, email: true };
