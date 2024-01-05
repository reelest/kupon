import { SafeAreaView } from "react-native-safe-area-context";
import AppStyles, { PRIMARY_DARK, PRIMARY_LIGHT } from "./AppStyles";
import { ErrorBoundary } from "react-error-boundary";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { KyberNetwork, Warning2 } from "iconsax-react-native";

export default function Screen(props) {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <SafeAreaView {...props} style={AppStyles.root} />
    </ErrorBoundary>
  );
}

function ErrorComponent() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        height: "100%",
      }}
    >
      <Warning2 size={96} color={PRIMARY_DARK} variant="Broken" />
      <Text
        variant="displaySmall"
        style={{ textAlign: "center", color: PRIMARY_DARK, marginVertical: 8 }}
      >
        Something Went Wrong!
      </Text>
      <Text
        variant="bodyLarge"
        style={{ textAlign: "center", marginBottom: 16 }}
      >
        An unknown error seems to have occurred. Click the button below to
        notify the developers and help us fix this.
      </Text>
      <Button mode="contained-tonal">Send Bug Report</Button>
    </View>
  );
}
