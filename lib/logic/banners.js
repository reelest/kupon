import rafiki from "./assets/rafiki.png";
import rafiki2 from "./assets/rafiki_2.png";
import phone from "./assets/phone_bigger.png";
import { useNavigation } from "@react-navigation/native";
export default function useBannersAPI() {
  const navigation = useNavigation();
  return [
    {
      id: "1",
      image: rafiki,
      h1: "Kupon Logistics Company",
      desc: "Send packages across the country with no hastle",
      cta: "Get Started",
      onPress: () => {
        navigation.push("Main", {
          screen: "Send Package",
        });
      },
      bg: "#904D00",
      color: "#ffffff",
      buttonBg: "#FD901A",
      buttonColor: "#ffffff",
      variant: "expandable",
    },
    {
      id: "2",
      image: phone,
      h1: "Kupon Online Market Place",
      desc: "Browse our top quality items with exciting offers",
      cta: "Start Shopping",
      href: "/#",
      bg: "#E9C400",
      color: "#ffffff",
      buttonBg: "#B46200",
      buttonColor: "#ffffff",
    },
  ];
}
