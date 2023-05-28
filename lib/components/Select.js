import { Menu, TextInput, TouchableRipple, useTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState, useLayoutEffect } from "react";
import Template from "./Template";

export default function Select({
  values,
  value,
  placeholder = "Select ...",
  onChangeText,
  outlineColor,
  activeOutlineColor,
  ...props
}) {
  const [visible, setVisible] = useState();
  useLayoutEffect(() => {
    setVisible(false);
  }, [value]);
  const width = Dimensions.get("window").width;
  const current = values?.find?.((e) => e.value === value);
  const theme = useTheme();
  return (
    <Menu
      visible={visible}
      anchor={
        <TouchableRipple
          onPress={() => {
            setVisible(true);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Template
            as={TextInput}
            props={props}
            label="Item Condition"
            editable={false}
            value={current ? current.label ?? current.value : placeholder}
            textColor={!current ? "#777777" : undefined}
            outlineColor={
              visible
                ? activeOutlineColor || theme.colors.primary
                : outlineColor
            }
            outlineStyle={{
              borderWidth: visible ? 2 : 1,
            }}
            mode="outlined"
            right={
              <TextInput.Icon
                onPressIn={() => {
                  setVisible(true);
                }}
                icon={visible ? "chevron-up" : "chevron-down"}
              />
            }
          />
        </TouchableRipple>
      }
      onDismiss={() => setVisible(false)}
      style={{ width: width - 50 }}
      contentStyle={{ backgroundColor: "white" }}
      anchorPosition="bottom"
    >
      {values?.map?.(({ value, label = value }) => {
        return (
          <Menu.Item
            title={label}
            onPress={() => onChangeText?.(value)}
            key={value}
          />
        );
      })}
    </Menu>
  );
}
