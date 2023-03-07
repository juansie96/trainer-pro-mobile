import React, { useEffect, useState } from "react";
import { ColorValue, View, ScrollView } from "react-native";
import TPText from "../../components/atoms/TPText";
import TransparentOverlay from "../../components/atoms/TransparentOverlay";
import EntityCard from "../../components/molecules/EntityCard";
import { getMealPlan } from "../../firebase/api";
import { MealPlan } from "../../types/meal";
import { macroItems } from "./data";
import { NutritionalValueKeys } from "./types";
import { getTotalNV } from "./utils";

const MealPlanScreen = ({ route }: { route: any }) => {
  const { entityId, data } = route.params;
  const [mealPlan, setMealPlan] = useState<MealPlan | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setMealPlan(data);
    } else if (entityId) {
      setLoading(true);
      getMealPlan(entityId)
        .then(setMealPlan)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <TransparentOverlay />;
  if (!mealPlan) return null;

  const NutritionalValue = ({
    title,
    color,
    nvKey,
  }: {
    title: string;
    color: ColorValue;
    nvKey: NutritionalValueKeys;
  }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: color,
          borderRadius: 50,
          marginRight: 8,
        }}
      />
      <TPText fs={16} type="light" bold>
        {title}:
      </TPText>
      <TPText fs={16} type="light">
        {" " +
          getTotalNV(nvKey as NutritionalValueKeys, mealPlan.meals).toFixed(
            2
          )}{" "}
        {nvKey === "kcal" ? "kcal" : "g"}
      </TPText>
    </View>
  );

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TPText fs={35} type="medium">
          {mealPlan.name}
        </TPText>
        <TPText fs={20} type="light" my={10}>
          {mealPlan.description}
        </TPText>
        <TPText fs={20} type="bold" my={10}>
          Información nutricional
        </TPText>
        {macroItems.map((i) => (
          <NutritionalValue
            key={i.nvKey}
            title={i.title}
            color={i.pointColor}
            nvKey={i.nvKey as NutritionalValueKeys}
          />
        ))}
      </View>
      <View style={{ marginVertical: 10 }} />
      {mealPlan.meals.map((meal, i) => (
        <View key={meal.name + i}>
          <TPText fs={20} type="bold" my={10} ml={20}>
            {meal.name}
          </TPText>
          {meal.foods.map((food) => (
            <EntityCard
              key={food.id}
              entity={{ data: food, type: "food", onPress: () => {} }}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default MealPlanScreen;
