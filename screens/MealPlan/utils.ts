import { Meal } from "../../types/meal";
import { NutritionalValueKeys } from "./types";

export const getTotalNV = (key: NutritionalValueKeys, meals: Meal[]) =>
  meals.reduce((total, m) => {
    if (!m.foods) return total + 0;
    return (
      total +
      m.foods.reduce((t, food) => t + food.nutritionalValues[key].value, 0)
    );
  }, 0);
