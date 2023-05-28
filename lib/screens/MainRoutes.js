import { useNavigation } from "@react-navigation/native";
import { Dimensions, Linking, View, ScrollView } from "react-native";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellItemScreen from "./sell_item/SellItemScreen";
import HomeScreen, {
  setHomeTabIndex,
  useHomeTabIndex,
} from "./home/HomeScreen";
import SenderInformation from "./send_package/SenderInformation";
import ReceiverInformation from "./send_package/ReceiverInformation";
import {
  Avatar,
  Button,
  IconButton,
  Text,
  TouchableRipple,
} from "react-native-paper";

const Drawer = createDrawerNavigator();

function CustomDrawerItem({ label, icon, onPress, focused }) {
  const color = focused ? "#904D00" : "#777777";
  return (
    <View
      style={{
        borderRadius: 30,
        backgroundColor: focused ? "#FFE16E" : null,
        paddingHorizontal: 20,
      }}
    >
      <TouchableRipple onPress={onPress}>
        <View
          style={{
            borderRadius: 30,
            display: "flex",
            padding: 0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            icon={icon}
            size={24}
            iconColor={color}
            style={{ marginRight: 10, padding: 0 }}
          />
          <Text style={{ color, fontWeight: 700 }}>{label}</Text>
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
        backgroundColor: "#FDF1EB",
        paddingHorizontal: 10,
        paddingVertical: 50,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 10,
          marginBottom: 30,
        }}
      >
        <Avatar.Image size={24} />
        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>James DOWEN</Text>
      </View>

      <CustomDrawerItem
        label="Home"
        icon="home-outline"
        focusedIcon="home"
        focused={state.index === 0 && index === 0}
        onPress={() => {
          navigate("Home");
          setHomeTabIndex(0);
        }}
      />
      <CustomDrawerItem
        label="Market Place"
        icon="storefront-outline"
        focused={state.index === 0 && index === 1}
        onPress={() => {
          navigate("Home");
          setHomeTabIndex(1);
        }}
      />
      <CustomDrawerItem
        label="Sell Item"
        focused={state.index === 1}
        onPress={() => {
          navigate("Sell Item");
        }}
      />
      <CustomDrawerItem
        label="Send Package"
        focused={state.index === 2}
        onPress={() => {
          navigate("Send Package");
        }}
      />
      <CustomDrawerItem
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </ScrollView>
  );
}

export default function MainRoutes() {
  const width = Dimensions.get("window").width;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: width - 20 },
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} key={0} />
      <Drawer.Screen name="Sell Item" component={SellItemScreen} key={1} />
      <Drawer.Screen
        name="Send Package"
        component={SendPackageScreen}
        key={2}
      />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function SendPackageScreen() {
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
