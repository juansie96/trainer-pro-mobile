import { Timestamp } from "firebase/firestore";

export interface MealPlan {
  name: string;
  description: string;
  meals: Meal[];
  id?: string;
  trainerId: string;
  kcal: number;
  createdAt?: Timestamp;
  clientId?: string;
}

export interface Meal {
  name: string;
  foods: Food[];
}

export interface Food {
  name: string;
  nutritionalValues: NutritionalValues;
  id?: string;
  creatorId?: string;
  grams?: number;
}

export interface NutritionalValues {
  kcal: NutritionalValue;
  proteins: NutritionalValue;
  carbs: NutritionalValue;
  fats: NutritionalValue;
  fiber: NutritionalValue;
}

export interface NutritionalValue {
  value: number;
  ratio: number;
}

export type NutritionalValueKeys =
  | "kcal"
  | "proteins"
  | "carbs"
  | "fats"
  | "fiber";
