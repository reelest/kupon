import PaystackWebview from "../../components/PaystackWebview";
import Screen from "../../components/Screen";

/**
 * @param {import("@react-navigation/drawer").DrawerScreenProps} props
 */
export default function PaymentScreen({ navigation, route }) {
  return (
    <Screen>
      <PaystackWebview
        url={route.params.paymentURL}
        onClose={() => navigation.goBack()}
      />
    </Screen>
  );
}
