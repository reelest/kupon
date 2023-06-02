import { View } from "react-native";
export default function Spacer({ style }) {
  return <View style={{ flexGrow: 1, width: 1, ...style }} />;
}
