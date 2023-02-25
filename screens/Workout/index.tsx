import { Image } from "@rneui/base";
import { useState, useEffect, Fragment } from "react";
import { View } from "react-native";
import TPText from "../../components/atoms/TPText";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import { getWorkout } from "../../firebase/api";
import styles from "../../styles";
import { Exercise, Workout } from "../../types/workout";
import Entypo from "@expo/vector-icons/Entypo";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { extractVideoID } from "../../utils";

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

const WorkoutScreen = ({ route }: { route: any }) => {
  const { entityId } = route.params;
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    setLoading(true);
    getWorkout(entityId)
      .then(setWorkout)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <TransparentOverlay />;
  if (!workout) return null;

  const { flexRowCenter, flexRowBetweenCenter } = styles;

  return (
    <View>
      <View style={{ padding: 20 }}>
        <TPText fs={35} type="medium">
          {workout.name}
        </TPText>
        <TPText fs={20} type="light" my={10}>
          {workout.description}
        </TPText>
      </View>
      {workout.workoutExercises.map((exercise, i) => {
        return (
          <Fragment key={exercise.exerciseId + i}>
            <View style={flexRowBetweenCenter}>
              <View style={flexRowCenter}>
                <Image
                  source={{
                    uri: getExerciseImgUrl(exercise),
                  }}
                  style={{ width: 100, height: 100 }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignSelf: "stretch",
                    paddingLeft: 12,
                    paddingRight: 7,
                    paddingVertical: 10,
                  }}
                >
                  <TPText fs={18} type="light">
                    {exercise.name}
                  </TPText>
                  <TPText fs={14} type="medium" color={colors.gray[200]}>
                    {exercise.objective}
                  </TPText>
                </View>
              </View>
              <Entypo
                name="chevron-thin-right"
                size={28}
                style={{ marginRight: 12 }}
                onPress={() =>
                  navigation.navigate("Exercise" as never, {
                    exercise,
                  })
                }
              />
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
      })}
    </View>
  );
};

export default WorkoutScreen;
