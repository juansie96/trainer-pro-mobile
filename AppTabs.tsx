import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logout from "./components/atoms/Logout";
import Home from "./screens/Home";
import Nutrition from "./screens/Nutrition";
import Schedule from "./screens/Schedule";
import colors from "./styles/colors";

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
    <Tab.Navigator>
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
