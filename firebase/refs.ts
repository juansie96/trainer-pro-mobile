import { collection, doc, FirestoreDataConverter } from "firebase/firestore";
import {
  clientConverter,
  exerciseConverter,
  getConverter,
  workoutConverter,
} from "./converters";
import { firestoreDB } from "./firebase";

export const clientsRef = collection(firestoreDB, "clients").withConverter(
  clientConverter
);
export const workoutsRef = collection(firestoreDB, "workouts").withConverter(
  workoutConverter
);
export const exercisesRef = collection(firestoreDB, "exercises").withConverter(
  exerciseConverter
);

export const getDocumentRef = (table: string, id: string) =>
  doc(firestoreDB, table, id).withConverter(
    getConverter(table) as FirestoreDataConverter<any>
  );
