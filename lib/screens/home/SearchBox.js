import {
  Avatar,
  IconButton,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../logic/auth";
import { shiftY } from "../../utils/cssUtils";
import { View } from "react-native";
export default function SearchBox({
  onSearch,
  value,
  setValue,
  suggestions = ["Hello"],
}) {
  const theme = useTheme();
  const navigation = useNavigation();
  const user = useUser();
  const [isFocused, setFocused] = useState();
  return (
    <>
      <Searchbar
        mode="bar"
        placeholder="Search..."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        icon={() =>
          isFocused ? (
            <IconButton icon="chevron-left" size={32} style={shiftY(-3)} />
          ) : (
            <IconButton
              icon={() => (
                <Avatar.Text
                  size={32}
                  style={shiftY(-3)}
                  label={(user.email || "US").slice(0, 2).toUpperCase()}
                />
              )}
              size={24}
            />
          )
        }
        value={value}
        onChangeText={setValue}
        onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
        traileringIcon={() => (
          <IconButton icon="magnify" size={24} style={shiftY(-3)} />
        )}
        showDivider={true}
        right={() => (
          <IconButton
            onPress={() => navigation.openDrawer()}
            icon="menu"
            size={24}
          />
        )}
        style={
          isFocused && suggestions
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : null
        }
      />
      {isFocused && suggestions ? (
        <View
          style={{
            zIndex: 60,
            position: "relative",
            width: "100%",
            transform: [{ translateX: 0 }],
          }}
        >
          <Surface
            style={{
              paddingBottom: 30,
              borderTopWidth: 1,
              borderTopColor: theme.colors.outline,
              backgroundColor: theme.colors.elevation.level3,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              position: "absolute",
              width: "100%",
              zIndex: 60,
            }}
            elevation={0}
          >
            {suggestions.map((e, i) => (
              <Text
                key={i}
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  // borderBottomWidth: 1,
                  color: theme.colors.onSurfaceDisabled,
                  // borderBottomColor: "#aaaaaa",
                }}
                variant="bodyLarge"
              >
                {e}
              </Text>
            ))}
          </Surface>
        </View>
      ) : null}
    </>
  );
}
