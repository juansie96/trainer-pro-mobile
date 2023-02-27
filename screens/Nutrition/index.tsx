import dayjs from "dayjs";
import { View } from "react-native";
import SectionText from "../../components/atoms/SectionText";
import TPText from "../../components/atoms/TPText";
import { useUser } from "../../hooks";
import TaskCard from "../../components/molecules/TaskCard";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { clientAssignedMealPlansQuery } from "../../firebase/api";
import { Client } from "../../types/client";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import EntityCard from "../../components/molecules/EntityCard";
import { useNavigation } from "@react-navigation/native";

const Nutrition = () => {
  const { user } = useUser();
  const navigation = useNavigation<any>();
  const todayAssignedMeals = user?.tasks
    ? user.tasks.filter(
        (t) =>
          dayjs(t.date).format("DD/MM/YYYY") ===
            dayjs(new Date()).format("DD/MM/YYYY") && t.type === "mealPlan"
      )
    : null;

  const [mealPlans, isLoading] = useCollectionData(
    clientAssignedMealPlansQuery((user as Client).id as string)
  );

  if (isLoading) {
    return <TransparentOverlay />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15 }}>
        <SectionText>Nutrición</SectionText>
        <TPText fs={22} type="medium">
          ¿Qué hay para comer?
        </TPText>
        <View style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
          {todayAssignedMeals && todayAssignedMeals.length > 0 ? (
            todayAssignedMeals.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                entity={mealPlans?.find((mp) => mp.id === task.entityId)}
              />
            ))
          ) : (
            <TPText gray textAlign="center" fs={18} mt={5}>
              No tienes ningún plan asignado
              <br /> para hoy
            </TPText>
          )}
        </View>
        <TPText fs={22} type="medium" mt={20}>
          Todos los planes asignados
        </TPText>
      </View>
      <View style={{ marginTop: 10 }}>
        {mealPlans?.map((mealPlan, i) => {
          return (
            <EntityCard
              key={mealPlan.name}
              entity={{
                type: "mealPlan",
                data: mealPlan,
                onPress: () =>
                  navigation.navigate("Exercise" as never, {
                    mealPlan,
                  }),
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Nutrition;
