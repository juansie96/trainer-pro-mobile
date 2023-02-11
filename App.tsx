import { View } from "react-native";
import Login from "./screens/Login";
import styles from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}
