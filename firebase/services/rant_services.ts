import { RantNoId, RantWithId } from "@/types/models/rant_types";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { FirebaseFirestore } from "../Firebase-Client";

// Add a new document with a generated id.
type rantData = {
  rant_author: string;
  rant_title: string;
  rant_content: string;
};

export const addRant = async (rant_data: rantData) => {
  const { rant_author, rant_content, rant_title } = rant_data;
  try {
    const rant: RantNoId = {
      rant_author,
      rant_title,
      rant_content,
      rant_date: Timestamp.now(),
    };
    const docRef = await addDoc(collection(FirebaseFirestore, "rants"), rant);
    return { error: null, data: docRef };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};

export const deleteRant = async (rant_id: string) => {
  try {
    const docRef = await deleteDoc(doc(FirebaseFirestore, "rants", rant_id));
    return { error: null, data: docRef };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};

export const getAllRant = async () => {
  try {
    const querySnapshot = await getDocs(collection(FirebaseFirestore, "rants"));
    const rants: RantWithId[] = [];

    querySnapshot.forEach((doc) => {
      const rant: RantWithId = {
        rant_id: doc.id,
        ...(doc.data() as RantNoId),
      };
      rants.push(rant);
    });

    return { error: null, data: rants };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};

export const handleLikeRant = async (
  isLiked: boolean,
  rant_id: string,
  user_id: string
) => {
  if (isLiked) {
    return await deleteLikeRant(rant_id, user_id);
  } else {
    return await addLikeRant(rant_id, user_id);
  }
};

export const addLikeRant = async (rant_id: string, user_id: string) => {
  try {
    const docRef = await setDoc(
      doc(FirebaseFirestore, "rants", rant_id, "likes", user_id),
      {
        rant_like_id: user_id,
        rant_like_author: user_id,
      }
    );
    return { error: null, data: docRef };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};

export const deleteLikeRant = async (rant_id: string, user_id: string) => {
  try {
    const docRef = await deleteDoc(
      doc(FirebaseFirestore, "rants", rant_id, "likes", user_id)
    );
    return { error: null, data: docRef };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};
