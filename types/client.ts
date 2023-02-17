import { DocumentReference } from "firebase/firestore";
import { GeneralTask } from "./task";

export interface Client {
  name: string;
  lastname: string;
  email: string;
  trainerId: string;
  password: string;
  gender: string;
  objective: string;
  birthDate: string;
  weight: number;
  height: number;
  healthFormQuestions: HealthFormQuestion[];
  tasks: GeneralTask[];
  id?: string;
  ref?: DocumentReference<Client>;
}

export interface HealthFormQuestion {
  question: string;
  answer: boolean | null;
}
