import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logout from "./components/atoms/Logout";
import Home from "./screens/Home";
import Nutrition from "./screens/Nutrition";
import Schedule from "./screens/Schedule";
import colors from "./styles/colors";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const headerOptions = {
  headerTitle: "TP",
  headerTitleStyle: {
    color: colors.white[100],
  },
  headerStyle: {
    backgroundColor: colors.blue[100],
  },
  headerRight: () => <Logout />,
};

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <SimpleLineIcons name="home" size={size} color={color} />;
          } else if (route.name === "Agenda") {
            return <FontAwesome name="calendar" size={size} color={color} />;
          } else if (route.name === "Nutrición") {
            return (
              <MaterialCommunityIcons
                name="food-drumstick-outline"
                size={size}
                color={color}
              />
            );
          }
          return null;
        },
        tabBarActiveTintColor: colors.blue[100],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} options={headerOptions} />
      <Tab.Screen name="Agenda" component={Schedule} options={headerOptions} />
      <Tab.Screen
        name="Nutrición"
        component={Nutrition}
        options={headerOptions}
      />
    </Tab.Navigator>
  );
}

export default AppTabs;
