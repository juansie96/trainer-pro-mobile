import React from "react";
import { View } from "react-native";
import colors from "../../../styles/colors";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TPText from "../../atoms/TPText";
import styles from "../../../styles";
import { GeneralTask } from "../../../types/task";
import { useNavigation } from "@react-navigation/native";
import { MealPlan } from "../../../types/meal";

const getTaskIcon = (task: GeneralTask) => {
  switch (task.type) {
    case "cardio":
      return <FontAwesome name="heartbeat" size={24} />;
    case "mealPlan":
      return <MaterialCommunityIcons name="food-drumstick-outline" size={28} />;
    case "workout":
      return <MCI name="dumbbell" size={28} />;
  }
};

const getTaskRoute = (task: GeneralTask): never => {
  switch (task.type) {
    case "mealPlan":
      return "MealPlan" as never;
    case "workout":
      return "Workout" as never;
  }
  return "" as never;
};

const TaskCard = ({
  task,
  entity,
}: {
  task: GeneralTask;
  entity?: MealPlan;
}) => {
  const navigation = useNavigation<any>();
  const { flexRowCenter, boxShadow } = styles;

  const getDescription = () => {
    switch (task.type) {
      case "cardio":
        return task.distance;
      case "mealPlan":
        return entity
          ? `${entity.meals.length} comida${
              entity.meals.length === 1 ? "" : "s"
            }`
          : "¿Qué hay de comer?";
      case "workout":
        return "";
    }
  };

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
          <View style={{ paddingLeft: 15, flexShrink: 1 }}>
            <TPText fs={17} type="medium">
              {entity
                ? entity.name
                : task.title.length < 28
                ? task.title
                : task.title.slice(0, 28) + "..."}
            </TPText>
            <TPText mt={5} fs={16} type="lightItalic">
              {getDescription()}
            </TPText>
          </View>
        </View>
        {!(task.type === "cardio") && (
          <Entypo
            name="chevron-thin-right"
            size={28}
            onPress={() =>
              navigation.navigate(getTaskRoute(task), {
                entityId: task.entityId,
              })
            }
          />
        )}
      </View>
    </View>
  );
};

export default TaskCard;
