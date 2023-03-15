import { Image } from "@rneui/base";
import { View } from "react-native";
import styles from "../../../styles";
import colors from "../../../styles/colors";
import { Food, Meal, MealPlan } from "../../../types/meal";
import { Exercise, WorkoutExercise } from "../../../types/workout";
import TPText from "../../atoms/TPText";
import Entypo from "@expo/vector-icons/Entypo";
import { Fragment } from "react";
import { extractVideoID } from "../../../utils";

interface ExerciseEntity {
  type: "exercise";
  data: WorkoutExercise;
  onPress: () => void;
}

interface MealPlanEntity {
  type: "mealPlan";
  data: MealPlan;
  onPress: () => void;
}

interface FoodEntity {
  type: "food";
  data: Food;
  onPress: () => void;
}

export function getExerciseImgUrl(exercise: Exercise): string {
  if (exercise.videoUrl && exercise.videoUrl.length > 0) {
    const videoId = extractVideoID(exercise.videoUrl);
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  } else if (exercise.imgUrls && exercise.imgUrls.length) {
    return exercise.imgUrls[0];
  } else {
    return "https://reviverestore.org/wp-content/uploads/2017/05/placeholder-image-cropped.jpg";
  }
}

const EntityCard = ({
  entity,
}: {
  entity: ExerciseEntity | MealPlanEntity | FoodEntity;
}) => {
  const { flexRowBetweenCenter, flexRowCenter } = styles;
  const { type, data } = entity;

  const getImageUrl = () => {
    switch (type) {
      case "exercise":
        return getExerciseImgUrl(data);
      case "mealPlan":
        return "wa";
    }
  };

  const getBottomInfo = () => {
    switch (type) {
      case "exercise":
        return data.objective;
      case "mealPlan":
        return `${data.meals.length} comida${
          data.meals.length === 1 ? "" : "s"
        }`;
      case "food":
        return entity.data.grams + ' g';
    }
  };

  return (
    <Fragment>
      <View
        style={{
          ...flexRowBetweenCenter,
          backgroundColor: type === "food" ? "#fff" : "inherit",
        }}
      >
        <View style={flexRowCenter}>
          {type !== "food" && (
            <Image
              source={
                type === "mealPlan"
                  ? require("../../../assets/images/nutrition.webp")
                  : { uri: getImageUrl() }
              }
              style={{ width: 100, height: 100 }}
            />
          )}
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignSelf: "stretch",
              paddingLeft: 12,
              paddingRight: 7,
              paddingVertical: 10,
              minHeight: 100,
            }}
          >
            <TPText fs={18} type="light">
              {data.name}
            </TPText>
            <TPText fs={14} type="medium" color={colors.gray[200]}>
              {getBottomInfo()}
            </TPText>
          </View>
        </View>

        {entity.type !== 'food' && <Entypo
          name="chevron-thin-right"
          size={28}
          style={{ marginRight: 12 }}
          onPress={entity.onPress}
        />}
      </View>
      <View
        style={{
          backgroundColor: colors.gray[200],
          width: "100%",
          height: 1,
        }}
      ></View>
    </Fragment>
  );
};

export default EntityCard;
