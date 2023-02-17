import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import LoadingOverlay from "./components/atoms/LoadingOverlay";
import Logout from "./components/atoms/Logout";
import { UserContextProvider } from "./hooks/useUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
export { useUser } from "./hooks";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [session, isSessionLoading] = useAuthState(auth);

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
