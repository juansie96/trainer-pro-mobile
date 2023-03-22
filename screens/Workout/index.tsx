import { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import TPText from "../../components/atoms/TPText";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import { getWorkout } from "../../firebase/api";
import { Workout } from "../../types/workout";
import { useNavigation } from "@react-navigation/native";
import EntityCard from "../../components/molecules/EntityCard";
import { Button } from "@rneui/base";
import { getDocumentRef } from "../../firebase/refs";
import { useUser } from "../../hooks";
import { updateDoc } from "firebase/firestore";
import { Client } from "../../types/client";

const WorkoutScreen = ({ route }: { route: any }) => {
  const { entityId, task } = route.params;
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [isCompleting, setIsCompleting] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    getWorkout(entityId)
      .then(setWorkout)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCompleteTask = async () => {
    const docRef = getDocumentRef("clients", user?.id as string);
    setIsCompleting(true);
    const newTasks = user?.tasks.map((t) =>
      t.id === task.id
        ? { ...t, completed: { value: true, date: new Date().toISOString() } }
        : t
    );

    try {
      await updateDoc<Client>(docRef, { tasks: newTasks });
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompleting(false);
    }
  };

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
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        <Button
          radius={"sm"}
          type="solid"
          style={{ width: 200, marginTop: 15 }}
          onPress={handleCompleteTask}
          disabled={task.completed.value}
        >
          {isCompleting ? (
            <ActivityIndicator size="large" />
          ) : task.completed.value ? (
            "Tarea completada"
          ) : (
            "Completar tarea"
          )}
        </Button>
      </div>
    </View>
  );
};

export default WorkoutScreen;
