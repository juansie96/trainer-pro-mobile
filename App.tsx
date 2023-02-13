import Login from "./screens/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import LoadingOverlay from "./components/atoms/LoadingOverlay";
import Logout from "./components/atoms/Logout";

export default function App() {
  const [user, loading] = useAuthState(auth);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        {loading ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoadingOverlay"
            component={LoadingOverlay}
          />
        ) : user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "TrainerPro",
                headerRight: () => <Logout />,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
