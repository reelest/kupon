import { ScrollView } from "react-native";
import Screen from "../../components/Screen";
import AppStyles from "../../components/AppStyles";
import { IconButton, Text } from "react-native-paper";
import { View } from "react-native";
import Form, { REQUIRED } from "../../components/Form";

export default function TrackItemScreen({ route, navigation }) {
  return (
    <Screen>
      <ScrollView style={[AppStyles.container, { paddingHorizontal: 10 }]}>
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
              trackingCode: route.params?.trackingCode,
            }}
            validationRules={{ trackingCode: REQUIRED }}
            onSubmit={(data) => {
              navigation.push("Track Item", data);
            }}
          ></Form>
        </View>
      </ScrollView>
    </Screen>
  );
}
