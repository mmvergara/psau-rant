import { Card } from "@/types/models/card_types";
import { FirebaseError } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseFirestore } from "../Firebase-Client";

type createCardSetInfo = {
  card_set_name: string;
  card_set_author_id: string;
  card_set_cards: Card[];
};
export const createCardSet = async (card_set: createCardSetInfo) => {
  try {
    const card_set_ref = collection(FirebaseFirestore, "card_sets");
    const addCardSet = await addDoc(card_set_ref, card_set);
    return { error: null, data: addCardSet };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};
