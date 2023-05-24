import SignupScreen from "../signup/SignupScreen";

export default function LoginScreen(props) {
  return SignupScreen({ isLogin: true, ...props });
}
