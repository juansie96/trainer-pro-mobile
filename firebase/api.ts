import { getDoc, getDocs, query, where } from "firebase/firestore";
import { Workout } from "../types/workout";
import { clientsRef, getDocumentRef } from "./refs";

export const getUserData = async (email: string) => {
  const querySnapshot = await getDocs(
    query(clientsRef, where("email", "==", email))
  );
  if (querySnapshot.empty) {
    throw new Error("No user found");
  }
  return querySnapshot.docs[0].data();
};

export const getWorkout = (id: string) =>
  getDoc<Workout>(getDocumentRef("workouts", id));
