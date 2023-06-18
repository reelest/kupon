import AppStyles, { PRIMARY_DARK } from "../../components/AppStyles";
import { View, ScrollView, Image } from "react-native";
import Screen from "../../components/Screen";
import { IconButton, Text } from "react-native-paper";
import Rectangle_2226 from "./assets/Rectangle_2226_big.png";
import Rectangle_2227 from "./assets/Rectangle_2227_big.png";
import Frame_38971 from "./assets/Frame_38971.png";
import Frame_38971_1 from "./assets/Frame_38971_1.png";
import Frame_38971_2 from "./assets/Frame_38971_2.png";
import ResponsiveImage from "../home/ResponsiveImage";
import { useUser } from "../../logic/auth";
export default function AboutUsScreen({ navigation }) {
  console.log("About Us");
  return (
    <Screen>
      <ScrollView>
        <IconButton
          icon="arrow-left"
          style={[AppStyles.topButton, { marginLeft: 15 }]}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            paddingHorizontal: 25,
            marginBottom: 150,
            width: "100%",
          }}
        >
          <Text variant="displaySmall" style={AppStyles.aboutUsParagraph}>
            About Kupon
          </Text>
          <Text variant="titleSmall" style={AppStyles.aboutUsParagraph}>
            Kupon is a leading provider of logistics and ecommerce services for
            businesses of all sizes. Founded in 2023, our company has
            established a reputation for excellence in the industry by
            delivering reliable and cost-effective solutions that help our
            clients grow and succeed.
          </Text>
          <View
            style={{ flexDirection: "row", marginBottom: 16, marginTop: 32 }}
          >
            <ResponsiveImage
              style={{ width: "50%", resizeMode: "contain" }}
              source={Rectangle_2226}
            />
            <ResponsiveImage
              style={{ width: "50%", resizeMode: "contain" }}
              source={Rectangle_2227}
            />
          </View>
          <Text
            variant="titleLarge"
            style={{ color: PRIMARY_DARK, marginBottom: 8 }}
          >
            Logistics and E-commerce
          </Text>
          <Text variant="titleSmall" style={AppStyles.aboutUsParagraph}>
            Kupon is a logistics and online ecommerce website that offers a wide
            range of products and services to customers.
          </Text>
          <ResponsiveImage
            source={Frame_38971}
            style={{ width: "100%", marginTop: 32, marginBottom: 16 }}
          />
          <Text
            variant="titleLarge"
            style={{ color: PRIMARY_DARK, marginBottom: 8 }}
          >
            Products
          </Text>
          <Text variant="titleSmall" style={AppStyles.aboutUsParagraph}>
            The website provides a seamless and convenient shopping experience,
            allowing customers to easily browse and purchase products online
            from the comfort of their own home. Kupon is dedicated to providing
            the highest quality products at affordable prices, making it an
            ideal choice for customers looking for a great deal. The website
            features a wide range of products, including electronics, clothing,
            accessories, and more. In addition to its ecommerce offerings, Kupon
            also provides logistics services to businesses, helping them to
            manage their supply chain and streamline their operations.
          </Text>
          <ResponsiveImage
            source={Frame_38971_1}
            style={{ width: "100%", marginTop: 32, marginBottom: 16 }}
          />
          <Text
            variant="titleLarge"
            style={{ color: PRIMARY_DARK, marginBottom: 8 }}
          >
            Warehousing ,Transportation and Inventory
          </Text>
          <Text variant="titleSmall" style={AppStyles.aboutUsParagraph}>
            The website's logistics services include transportation,
            warehousing, and inventory management, among others. Kupon's
            commitment to customer satisfaction is evident in its user-friendly
            website design and excellent customer service.
          </Text>
          <ResponsiveImage
            source={Frame_38971_2}
            style={{ width: "100%", marginTop: 32, marginBottom: 16 }}
          />
          <Text
            variant="titleLarge"
            style={{ color: PRIMARY_DARK, marginBottom: 8 }}
          >
            Track item
          </Text>
          <Text variant="titleSmall" style={AppStyles.aboutUsParagraph}>
            Customers can easily track their orders and receive updates on the
            status of their shipments, ensuring that they always know where
            their products are and when they will arrive. Overall, Kupon is a
            one-stop-shop for all your ecommerce and logistics needs. With its
            wide range of products, affordable prices, and exceptional customer
            service, Kupon is an excellent choice for anyone looking for a
            reliable and convenient online shopping experience.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#1D2939",
            padding: 16,
            width: "100%",
          }}
        >
          <Text variant="bodyMedium" style={{ color: "#98A2B3" }}>
            Quick Links
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
