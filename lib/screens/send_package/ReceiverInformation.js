import {
  Button,
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import AppStyles, { PRIMARY_DARK } from "../../components/AppStyles";
import { View, ScrollView, Image, Share } from "react-native";
import Form, {
  FormErrors,
  FormField,
  FormSubmit,
  REQUIRED,
  REQUIRED_NUMBER,
  REQUIRED_PHONE,
} from "../../components/Form";
import useModal from "../../utils/useModal";
import Screen from "../../components/Screen";
import { useState } from "react";
import { wff } from "../../components/AppTheme";
import { Copy } from "iconsax-react-native";
import { useMutex } from "../../utils/mutex";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";
const fields = {
  receiverName: REQUIRED,
  receiverEmail: { email: true },
  receiverPhoneNumber: REQUIRED_PHONE,
  receiverPostCode: REQUIRED_NUMBER,
  receiverCode: REQUIRED,
  deliveryAddress: REQUIRED,
  deliveryCity: REQUIRED,
};
/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps} props
 */
export default function ReceiverInformation({ navigation, route }) {
  const sendersInfo = route.params;
  const successModal = useModal();
  const [result, setResult] = useState();
  const theme = useTheme();
  const copyToClipboard =
    result &&
    (async () => {
      await Clipboard.setStringAsync(result.receiverCode);
      Toast.show("Tracking code copied", {
        duration: Toast.durations.LONG,
      });
    });
  const shareLink = useMutex(async () => {
    if (result?.trackingLink) {
      try {
        const res = await Share.share({
          message: `I've sent you a package using Kupon Logistics. You can track your delivery here: ${result.trackingLink}.`,
          url: result.trackingLink,
          title: "Package on its way",
        });
        if (res.action === Share.sharedAction) {
          if (res.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (res.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  });
  return (
    <Screen>
      <ScrollView
        style={[AppStyles.container, { paddingHorizontal: 10, paddingTop: 0 }]}
      >
        <IconButton
          icon="arrow-left"
          style={AppStyles.topButton}
          onPress={() => {
            navigation.goBack();
          }}
        ></IconButton>
        <View
          style={{ paddingHorizontal: 15, marginBottom: 150, width: "100%" }}
        >
          <Text variant="titleLarge">Send Package</Text>
          <Form
            initialValue={{
              ...sendersInfo,
              receiverName: "",
              receiverEmail: "",
              receiverPhoneNumber: "",
              receiverPostCode: "",
              receiverCode: "",
              deliveryAddress: "",
              deliveryCity: "",
            }}
            onSubmit={async (data) => {
              //TODO
              await console.log(data);
              setResult({ trackingLink: "www.google.com", ...data });
              successModal.show();
            }}
            validationRules={fields}
          >
            <Text
              variant="titleLarge"
              style={[AppStyles.primary50Text, { marginTop: 30 }]}
            >
              {route.name}
            </Text>
            <FormErrors />
            <FormField
              name="receiverName"
              label="Full Name"
              placeholder="Firstname Lastname"
            />
            <FormField
              name="receiverEmail"
              label="Email Address"
              keyboardType="email-address"
            />
            <FormField
              name="receiverPhoneNumber"
              label="Phone Number"
              keyboardType="phone-pad"
            />
            <FormField
              name="receiverPostCode"
              label="Post Code"
              keyboardType="number-pad"
            />
            <FormField name="receiverCode" label="Receiver's Code" />
            <FormField name="deliveryAddress" label="Delivery Address" />
            <FormField name="deliveryCity" label="Delivery City" />
            <FormSubmit mode="contained" style={{ marginTop: 40 }}>
              Proceed To Checkout
            </FormSubmit>
          </Form>
        </View>
      </ScrollView>
      {result ? (
        <successModal.Modal
          style={{
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          {result.images?.length ? (
            <Image
              source={{ uri: result.images?.[0] }}
              style={{ width: 72, height: 72, borderRadius: 10 }}
            />
          ) : null}
          {/* <Image source={resul}></Image> */}
          <Text
            style={wff({
              color: theme.colors.onSurface,
              fontWeight: 700,
              fontSize: 24,
              textAlign: "center",
              marginVertical: 16,
            })}
          >
            You have sent{" "}
            <Text style={{ color: PRIMARY_DARK }}>
              {result.itemName ?? "an item"}
            </Text>{" "}
            for delivery
          </Text>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            You can share the link to this item you sent for delivery so that
            the recipient can track their order
          </Text>
          <TouchableRipple
            onPress={copyToClipboard}
            style={{ flexDirection: "row", paddingVertical: 0 }}
          >
            <View
              style={{
                padding: 4,
                flexDirection: "row",
                borderRadius: 10,
                flex: 1,
                marginVertical: 16,
                paddingHorizontal: 10,
                borderColor: "rgba(103, 80, 164, 0.16)",
                borderWidth: 2,
                borderStyle: "solid",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={wff({
                  color: theme.colors.onSurfaceVariant,
                  fontWeight: 700,
                  paddingVertical: 2,
                  marginRight: 5,
                  textAlign: "center",
                })}
              >
                Tracking Code - {result.receiverCode}
              </Text>
              <Copy
                size={16}
                variant="Bold"
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          </TouchableRipple>
          {result?.trackingLink ? (
            <Button
              mode="contained"
              icon="link"
              style={{ marginVertical: 16 }}
              onPress={shareLink}
            >
              Share Link with receipient
            </Button>
          ) : null}
        </successModal.Modal>
      ) : null}
    </Screen>
  );
}
