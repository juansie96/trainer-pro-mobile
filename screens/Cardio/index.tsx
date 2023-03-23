import { Button } from "@rneui/themed";
import { ActivityIndicator, View } from "react-native";
import { useState } from "react";
import TPText from "../../components/atoms/TPText";
import { getDocumentRef } from "../../firebase/refs";
import { CardioTask } from "../../types/task";
import { useUser } from "../../hooks";
import { updateDoc } from "firebase/firestore";
import { Client } from "../../types/client";
import colors from "../../styles/colors";

const Cardio = ({ route }: { route: any }) => {
  const { task } = route.params as { task: CardioTask };
  const [isCompleting, setIsCompleting] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const { user } = useUser();

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
      setIsTaskCompleted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <View>
      <View style={{ paddingHorizontal: 15 }}>
        <TPText fs={35} type="medium" mt={20}>
          {task.title}
        </TPText>
      </View>
      <View
        style={{
          backgroundColor: colors.gray[200],
          width: "100%",
          height: 1,
          marginVertical: 10,
        }}
      ></View>
      <View style={{ paddingHorizontal: 15 }}>
        <TPText fs={20} type="black">
          Objetivo
        </TPText>
        <TPText fs={16} gray type="light" mt={10}>
          {task.distance}
        </TPText>
      </View>
      <View
        style={{
          backgroundColor: colors.gray[200],
          width: "100%",
          height: 1,
          marginVertical: 10,
        }}
      ></View>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        <Button
          radius={"sm"}
          type="solid"
          style={{ width: 200, marginTop: 15 }}
          onPress={handleCompleteTask}
          disabled={task.completed?.value || isTaskCompleted}
        >
          {isCompleting ? (
            <ActivityIndicator size="large" />
          ) : task.completed?.value || isTaskCompleted ? (
            "Tarea completada"
          ) : (
            "Completar tarea"
          )}
        </Button>
      </div>
    </View>
  );
};

export default Cardio;
