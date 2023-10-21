import { RantNoId, RantWithId } from "@/types/models/RantTypes";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FirebaseFirestore } from "../Firebase-Client";

// Add a new document with a generated id.
type rantData = {
  rant_author_username: string;
  rant_author_id: string;
  rant_title: string;
  rant_content: string;
  rant_likes: { [key: string]: string };
};

export const addRant = async (rant_data: rantData) => {
  const {
    rant_author_username,
    rant_content,
    rant_title,
    rant_author_id,
    rant_likes,
  } = rant_data;
  try {
    const rant: RantNoId = {
      rant_author_username,
      rant_author_id,
      rant_title,
      rant_content,
      rant_likes,
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
  rant_id: string,
  isLiked: boolean,
  user_id: string | undefined
) => {
  if (!user_id) return { error: "User not logged in", data: null };
  try {
    const rantRef = doc(FirebaseFirestore, "rants", rant_id);
    const rantLikeRef = `rant_likes.${user_id}`;
    if (!isLiked) {
      // Add Like
      await updateDoc(rantRef, { [rantLikeRef]: user_id });
    } else {
      // Delete Like
      await updateDoc(rantRef, { [rantLikeRef]: deleteField() });
    }

    return { error: null, data: null };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};
