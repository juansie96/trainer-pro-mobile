import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { Client } from "../types/client";

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
