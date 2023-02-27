import { useState, useEffect, Fragment } from "react";
import { View } from "react-native";
import TPText from "../../components/atoms/TPText";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import { getWorkout } from "../../firebase/api";
import { Workout } from "../../types/workout";
import { useNavigation } from "@react-navigation/native";
import EntityCard from "../../components/molecules/EntityCard";

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
          <EntityCard
            key={exercise.name}
            entity={{
              type: "exercise",
              data: exercise,
              onPress: () =>
                navigation.navigate("Exercise" as never, {
                  exercise,
                }),
            }}
          />
        );
      })}
    </View>
  );
};

export default WorkoutScreen;
