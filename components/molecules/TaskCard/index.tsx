import React from "react";
import { View } from "react-native";
import colors from "../../../styles/colors";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import TPText from "../../atoms/TPText";
import styles from "../../../styles";

const TaskCard = () => {
  return (
    <View
      style={{
        backgroundColor: colors.white[100],
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginBottom: 15,
        ...styles.boxShadow,
      }}
    >
      <MCI name="dumbbell" size={28} />
      <View style={{ paddingLeft: 10, flexShrink: 1 }}>
        <TPText fs={17} type="medium">
          Plan nutricional 1500kcal
        </TPText>
        <TPText mt={5} fs={16} type="lightItalic">
          ¿Qué hay de comer?
        </TPText>
      </View>
    </View>
  );
};

export default TaskCard;
