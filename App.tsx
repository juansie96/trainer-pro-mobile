import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingOverlay from "./components/atoms/LoadingOverlay";
import { UserContextProvider } from "./hooks/useUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
export { useUser } from "./hooks";
import AppTabs from "./AppTabs";

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
              name="AppTabs"
              component={AppTabs}
              options={{ headerShown: false }}
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
