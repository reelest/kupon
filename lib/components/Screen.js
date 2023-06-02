import { SafeAreaView } from "react-native-safe-area-context";
import AppStyles from "./AppStyles";

export default function Screen(props) {
  return <SafeAreaView {...props} style={AppStyles.root} />;
}
