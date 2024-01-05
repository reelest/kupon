import { useState } from "react";
import PaystackWebview from "../../components/PaystackWebview";
import Screen from "../../components/Screen";
import { ActivityIndicator as CircularProgress } from "react-native-paper";
import createSubscription from "../../utils/createSubscription";

const [usePayments, onPayments, setPayments] = createSubscription();
let PAYMENTS;
onPayments((e) => {
  PAYMENTS = e;
  console.log({ PAYMENTS });
});
setPayments({});
export function usePayment(paymentURL) {
  return usePayments((e) => {
    console.log({ e });
    return e?.[paymentURL];
  });
}
/**
 * @typedef {import("@react-navigation/drawer").DrawerScreenProps<K,V,A>} DrawerScreenProps
 * @param {DrawerScreenProps} props
 */
export default function PaymentScreen({ navigation, route }) {
  const [closed, setClosed] = useState(false);
  const onClose = async (txnReference) => {
    setClosed(true);
    setPayments({ ...PAYMENTS, [route.params.paymentURL]: txnReference });
    navigation.goBack();
  };
  return (
    <Screen>
      {closed ? (
        <div style={{ width: "100%" }}>
          <CircularProgress />
        </div>
      ) : (
        <PaystackWebview
          url={route.params.paymentURL}
          onClose={onClose}
          callbackURL={route.params.callbackURL}
        />
      )}
    </Screen>
  );
}
