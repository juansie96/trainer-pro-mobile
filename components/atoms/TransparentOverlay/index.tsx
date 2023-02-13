import { View, ActivityIndicator } from "react-native";
import styles from "../../../styles";

const TransparentOverlay = () => {
  return (
    <View
      style={{
        ...styles.overlay,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 10,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default TransparentOverlay;
