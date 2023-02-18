import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import LoadingOverlay from "./components/atoms/LoadingOverlay";
import Logout from "./components/atoms/Logout";
import { UserContextProvider } from "./hooks/useUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useFonts } from "expo-font";
export { useUser } from "./hooks";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [session, isSessionLoading] = useAuthState(auth);
  const [fontsLoaded] = useFonts({
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
  });

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="main">
          {isSessionLoading ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="LoadingOverlay"
              component={LoadingOverlay}
            />
          ) : session ? (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "TP",
                headerRight: () => <Logout />,
              }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}
