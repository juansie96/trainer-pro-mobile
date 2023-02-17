import { collection } from "firebase/firestore";
import { clientConverter } from "./converters";
import { firestoreDB } from "./firebase";

export const clientsRef = collection(firestoreDB, "clients").withConverter(
  clientConverter
);
