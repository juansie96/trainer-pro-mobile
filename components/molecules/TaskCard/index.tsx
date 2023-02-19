import React from "react";
import { View } from "react-native";
import colors from "../../../styles/colors";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TPText from "../../atoms/TPText";
import styles from "../../../styles";
import { GeneralTask } from "../../../types/task";

const getDescription = (task: GeneralTask) => {
  switch (task.type) {
    case "cardio":
      return task.distance;
    case "mealPlan":
      return;
    case "workout":
      return "";
  }
};

const getTaskIcon = (task: GeneralTask) => {
  switch (task.type) {
    case "cardio":
      return <FontAwesome name="heartbeat" size={24} />;
    case "mealPlan":
      return <MCI name="dumbbell" size={28} />;
    case "workout":
      return <MCI name="dumbbell" size={28} />;
  }
};

const TaskCard = ({ task }: { task: GeneralTask }) => {
  const { flexRowCenter, boxShadow } = styles;
  return (
    <View
      style={{
        backgroundColor: colors.white[100],
        width: "100%",
        padding: 15,
        marginBottom: 15,
        ...flexRowCenter,
        ...boxShadow,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          width: "100%",
          ...flexRowCenter,
        }}
      >
        <View style={flexRowCenter}>
          {getTaskIcon(task)}
          <View style={{ paddingLeft: 10, flexShrink: 1 }}>
            <TPText fs={17} type="medium">
              {task.title.length < 28
                ? task.title
                : task.title.slice(0, 28) + "..."}
            </TPText>
            <TPText mt={5} fs={16} type="lightItalic">
              {getDescription(task)}
            </TPText>
          </View>
        </View>
        <Entypo name="chevron-thin-right" size={28} />
      </View>
    </View>
  );
};

export default TaskCard;
