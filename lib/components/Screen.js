import { SafeAreaView } from "react-native-safe-area-context";
import AppStyles from "./AppStyles";
import { ErrorBoundary } from "react-error-boundary";

export default function Screen(props) {
  return (
    <ErrorBoundary>
      <SafeAreaView {...props} style={AppStyles.root} />
    </ErrorBoundary>
  );
}
