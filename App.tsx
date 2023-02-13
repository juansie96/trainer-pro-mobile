import Login from "./screens/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Login/Home";

export default function App() {
  const [user] = useAuthState(auth);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
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
