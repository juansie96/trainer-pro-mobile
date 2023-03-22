import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingOverlay from "./components/atoms/LoadingOverlay";
import { UserContextProvider } from "./hooks/useUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
export { useUser } from "./hooks";
import AppTabs from "./AppTabs";
import Workout from "./screens/Workout";
import MealPlan from "./screens/MealPlan";
import Exercise from "./screens/Exercise";
import colors from "./styles/colors";
import Logout from "./components/atoms/Logout";
import RegisterMetricsForm from "./screens/RegisterMetricsForm";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [session, isSessionLoading] = useAuthState(auth);

  const getStyledHeader = (title: string) => ({
    headerTitle: title,
    headerTitleStyle: {
      color: colors.white[100],
    },
    headerStyle: {
      backgroundColor: colors.blue[100],
    },
    headerTintColor: colors.white[100],
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
            <>
              <Stack.Screen
                name="AppTabs"
                component={AppTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Workout"
                component={Workout}
                options={getStyledHeader("Rutina")}
              />
              <Stack.Screen
                name="MealPlan"
                component={MealPlan}
                options={getStyledHeader("Plan Nutricional")}
              />
              <Stack.Screen
                name="Exercise"
                component={Exercise}
                options={getStyledHeader("Ejercicio")}
              />
              <Stack.Screen
                name="RegisterMetricsForm"
                component={RegisterMetricsForm}
                options={getStyledHeader("Registrar Métricas")}
              />
            </>
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
