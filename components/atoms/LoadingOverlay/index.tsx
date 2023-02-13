import { View, ActivityIndicator } from "react-native";
import styles from "../../../styles";

const LoadingOverlay = () => (
  <View style={styles.root}>
    <View style={styles.overlay}>
      <ActivityIndicator size="large" />
    </View>
  </View>
);

export default LoadingOverlay;
