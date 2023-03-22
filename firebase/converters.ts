import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { Client } from "../types/client";
import { MealPlan } from "../types/meal";
import { IMetrics } from "../types/metrics";
import { Exercise, Workout } from "../types/workout";

export const clientConverter: FirestoreDataConverter<Client> = {
  toFirestore(client: WithFieldValue<Client>): DocumentData {
    return client;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Client>,
    options: SnapshotOptions
  ): Client {
    const data = snapshot.data(options);

    return {
      ...data,
      id: snapshot.id,
      ref: snapshot.ref,
    };
  },
};

export const workoutConverter: FirestoreDataConverter<Workout> = {
  toFirestore(workout: WithFieldValue<Workout>): DocumentData {
    return workout;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Workout>,
    options: SnapshotOptions
  ): Workout {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      ref: snapshot.ref,
    };
  },
};

export const exerciseConverter: FirestoreDataConverter<Exercise> = {
  toFirestore(exercise: WithFieldValue<Exercise>): DocumentData {
    return exercise;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Exercise>,
    options: SnapshotOptions
  ): Exercise {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      ref: snapshot.ref,
    };
  },
};

export const mealPlanConverter: FirestoreDataConverter<MealPlan> = {
  toFirestore(mealPlan: WithFieldValue<MealPlan>): DocumentData {
    return mealPlan;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<MealPlan>,
    options: SnapshotOptions
  ): MealPlan {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

export const metricsConverter: FirestoreDataConverter<IMetrics> = {
  toFirestore(metrics: WithFieldValue<IMetrics>): DocumentData {
    return metrics;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<IMetrics>,
    options: SnapshotOptions
  ): IMetrics {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

export function getConverter(table: string) {
  switch (table) {
    case "exercises":
      return exerciseConverter;
    case "workouts":
      return workoutConverter;
    case "mealPlans":
      return mealPlanConverter;
    // case "trainers":
    //   return trainerConverter;
    // case "foods":
    //   return foodConverter;
  }
}
