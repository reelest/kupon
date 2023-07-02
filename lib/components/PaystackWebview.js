import { WebView } from "react-native-webview";

export default function PaystackWebview({ url, onClose }) {
  const authorization_url = url;
  // const callback_url = "https://yourcallback.com";

  const onNavigationStateChange = (state) => {
    const { url } = state;

    if (!url) return;

    // if (url === callback_url) {
    //   // get transaction reference from url and verify transaction, then redirect
    //   const redirectTo = 'window.location = "' + callback_url + '"';
    //   this.webview.injectJavaScript(redirectTo);
    // }

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
