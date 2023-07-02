import { useNavigation } from "@react-navigation/native";
import { Dimensions, Linking, View, ScrollView, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellItemScreen from "./sell_item/SellItemScreen";
import HomeScreen from "./home/HomeScreen";
import SenderInformation from "./send_package/SenderInformation";
import ReceiverInformation from "./send_package/ReceiverInformation";
import appIconImg from "../assets/icon.png";
import {
  Avatar,
  Divider,
  IconButton,
  Text,
  TouchableRipple,
} from "react-native-paper";

import { setHomeTabIndex, useHomeTabIndex } from "./home/BottomNav";
import { doLogout } from "../logic/auth";
import ProfileScreen from "./profile/ProfileScreen";
import EditProfileScreen from "./profile/EditProfileScreen";
import {
  GRAY_SIDEBAR,
  HIGHLIGHT,
  PRIMARY_DARK,
  SCROLL_BACKGROUND,
} from "../components/AppStyles";
import GetInTouchScreen from "./get_in_touch/GetInTouchScreen";
import AboutUsScreen from "./about_us/AboutUsScreen";
const Drawer = createDrawerNavigator();

const AppIcon = ({ size }) => {
  return (
    <Image
      source={appIconImg}
      width={size}
      style={{
        marginLeft: 13,
        marginRight: 15,
        marginVertical: 10,
        maxHeight: 28,
        maxWidth: 28,
      }}
    />
  );
};

function CustomDrawerItem({
  label,
  icon,
  onPress,
  focused,
  iconComponent,
  inactiveIcon = icon ? icon + "-outline" : undefined,
  activeIcon = icon,
}) {
  const color = focused ? PRIMARY_DARK : GRAY_SIDEBAR;
  return (
    <View
      style={{
        borderRadius: 30,
        backgroundColor: focused ? HIGHLIGHT : null,
        paddingHorizontal: 0,
        overflow: "hidden",
        marginVertical: 1,
      }}
    >
      <TouchableRipple
        rippleColor={focused ? PRIMARY_DARK : HIGHLIGHT}
        onPress={onPress}
      >
        <View
          style={{
            borderRadius: 30,
            display: "flex",
            padding: 0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {iconComponent ?? (
            <IconButton
              icon={focused ? activeIcon : inactiveIcon}
              size={24}
              iconColor={color}
              style={{ marginRight: 10, padding: 0 }}
            />
          )}
          <Text variant="titleSmall" style={{ color }}>
            {label}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
}

/**
 *
 * @param {import("@react-navigation/drawer").DrawerContentComponentProps} props
 * @returns
 */
function CustomDrawerContent(props) {
  const { state } = props;
  const navigate = useNavigation().navigate;
  const index = useHomeTabIndex();

  return (
    <ScrollView
      {...props}
      style={{
        backgroundColor: SCROLL_BACKGROUND,
        paddingHorizontal: 10,
        paddingVertical: 50,
      }}
    >
      <TouchableRipple
        onPress={() => navigate("Profile")}
        style={{ paddingHorizontal: 10, marginBottom: 20 }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 10,
          }}
        >
          <Avatar.Image size={24} />
          <Text variant="titleSmall" style={{ marginLeft: 10 }}>
            James DOWEN
          </Text>
        </View>
      </TouchableRipple>
      <Text style={{ color: GRAY_SIDEBAR, marginLeft: 20 }}>My menu</Text>
      <CustomDrawerItem
        label="Home"
        icon="home"
        focused={state.index === 0 && index === 0}
        onPress={() => {
          navigate("Home");
          setHomeTabIndex(0);
        }}
      />
      <CustomDrawerItem
        label="Market Place"
        icon="storefront"
        focused={state.index === 0 && index === 1}
        onPress={() => {
          navigate("Home");
          setHomeTabIndex(1);
        }}
      />
      <CustomDrawerItem
        icon="shopping"
        label="Sell Item"
        focused={state.index === 1}
        onPress={() => {
          navigate("Sell Item");
        }}
      />
      <CustomDrawerItem
        label="Send Package"
        icon="send"
        focused={state.index === 2}
        onPress={() => {
          navigate("Send Package");
        }}
      />
      <Divider style={{ marginVertical: 64 }} />
      <CustomDrawerItem
        label="About Us"
        iconComponent={<AppIcon />}
        focused={state.index === 3}
        onPress={() => {
          navigate("About Us");
        }}
      />
      <CustomDrawerItem
        label="Contact Us"
        icon="email"
        focused={state.index === 4}
        onPress={() => {
          navigate("Contact Us");
        }}
      />
      <CustomDrawerItem
        label="Log Out"
        inactiveIcon="logout"
        onPress={doLogout}
      />
    </ScrollView>
  );
}

export default function MainRoutes() {
  const width = Dimensions.get("window").width;
  console.log("Main Routes 3");
  return (
    <Drawer.Navigator
      // initialRouteName="About Us"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width - 20,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        },
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} key={0} />
      <Drawer.Screen name="Sell Item" component={SellItemScreen} key={1} />
      <Drawer.Screen
        name="Send Package"
        component={SendPackageScreens}
        key={2}
      />
      <Drawer.Screen name="Profile" component={ProfileScreens} key={2} />
      <Drawer.Screen name="Contact Us" component={GetInTouchScreen} key={2} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} key={2} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function SendPackageScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sender's Information" component={SenderInformation} />
      <Stack.Screen
        name="Receiver's Information"
        component={ReceiverInformation}
      />
    </Stack.Navigator>
  );
}
function ProfileScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="View Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
