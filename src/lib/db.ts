import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase-admin/firestore";
import { firestore } from "./firebase-admin";
import type { Registration } from "./types";

const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore(modelObject: WithFieldValue<T>): DocumentData {
    return modelObject as DocumentData;
  },

  fromFirestore(snapshot: QueryDocumentSnapshot): T {
    return snapshot.data() as T;
  },
});

const collection = <T>(path: string) =>
  firestore.collection(path).withConverter(converter<T>());

export const db = {
  registrations: collection<Registration>("registrations"),
};

export default db;
