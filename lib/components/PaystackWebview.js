import { WebView } from "react-native-webview";

export default function PaystackWebview({ url, callbackURL, onClose }) {
  const authorization_url = url;
  /**
   *
   * @param {import("react-native-webview/lib/WebViewTypes").WebViewNavigationEvent} state
   * @returns
   */
  const onNavigationStateChange = (state) => {
    const { url } = state;
    console.log({ url, callbackURL });
    if (!url) return;

    if (url.startsWith(callbackURL)) {
      // get transaction reference from url and verify transaction, then redirect
      const txnReference = new URL(url).searchParams.get("trxref");
      onClose(txnReference);
    }

    if (url === "https://standard.paystack.co/close") {
      // handle webview removal
      // You can either unmount the component, or
      // Use a navigator to pop off the view
      onClose();
    }
  };

  return (
    <WebView
      source={{ uri: authorization_url }}
      style={{ marginTop: 40 }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}
