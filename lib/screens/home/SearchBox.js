import {
  Avatar,
  IconButton,
  Menu,
  Portal,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../../logic/auth";
import { shiftY } from "../../utils/cssUtils";
import { View } from "react-native";
import { useSubscription } from "../../utils/createSubscription";
export default function SearchBox({ onSearch, value, setValue, suggestions }) {
  const route = useRoute();
  const theme = useTheme();
  const navigation = useNavigation();
  const user = useUser();
  const [isFocused, setFocused] = useState();
  const searchbarRef = useRef();
  const [useLayout, , setLayout] = useSubscription();
  return (
    <>
      <Searchbar
        mode="bar"
        ref={searchbarRef}
        placeholder="Search..."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        icon={() =>
          isFocused ? (
            <IconButton
              icon="chevron-left"
              size={32}
              style={shiftY(-3)}
              onPress={() => searchbarRef.current?.blur()}
            />
          ) : route.name !== "Home" ? (
            <IconButton
              icon="arrow-left"
              size={32}
              style={shiftY(-3)}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <IconButton
              icon={() => (
                <Avatar.Image
                  source={{ uri: user?.photoURL }}
                  size={32}
                  style={shiftY(-3)}
                />
              )}
              size={24}
              onPress={() => navigation.navigate("Profile")}
            />
          )
        }
        value={value}
        onChangeText={setValue}
        onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
        traileringIcon={
          isFocused
            ? undefined
            : () => (
                <IconButton
                  icon="magnify"
                  size={24}
                  style={shiftY(-3)}
                  onPress={() => {
                    searchbarRef.current?.focus();
                  }}
                />
              )
        }
        showDivider={true}
        right={() =>
          isFocused ? (
            <IconButton
              onPress={() => searchbarRef.current?.blur()}
              icon="close"
              size={24}
            />
          ) : (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
            />
          )
        }
        style={
          isFocused && suggestions
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : null
        }
      />
      <View
        style={{
          width: "100%",
        }}
        onLayout={(e) => {
          setLayout(e.nativeEvent.layout);
        }}
      />
      {isFocused && suggestions ? (
        <Portal>
          <SearchSuggestions {...{ theme, useLayout, suggestions }} />
        </Portal>
      ) : null}
      <Menu />
    </>
  );
}
function SearchSuggestions({ theme, useLayout, suggestions }) {
  const layout = useLayout();
  if (!layout) return null;
  return (
    <Surface
      style={{
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: theme.colors.outline,
        backgroundColor: theme.colors.elevation.level3,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: "absolute",
        width: layout.width,
        left: 20,
        top: 56,
        zIndex: 60,
      }}
      elevation={60}
    >
      {suggestions.map((e, i) => (
        <Text
          key={i}
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
            // borderBottomWidth: 1,
            color: theme.colors.onSurfaceDisabled,
          }}
          variant="bodyLarge"
        >
          {e}
        </Text>
      ))}
    </Surface>
  );
}
