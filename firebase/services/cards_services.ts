import { Card, CardSet } from "@/types/models/card_types";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
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

export const getAllCardsByUserId = async (user_id: string) => {
  try {
    const card_sets_ref = collection(FirebaseFirestore, "card_sets");
    const card_sets = await getDocs(card_sets_ref);
    const card_sets_data = card_sets.docs.map((doc) => {
      return {
        card_set_id: doc.id,
        ...doc.data(),
      } as CardSet;
    });

    // temp
    const user_card_sets = card_sets_data.filter(
      (card_set) => card_set.card_set_author_id === user_id
    );
    //temp

    return { error: null, data: user_card_sets };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};

export const getCardSetById = async (card_set_id: string) => {
  try {
    const card_set_ref = doc(FirebaseFirestore, "card_sets", card_set_id);
    const card_set = await getDoc(card_set_ref);
    console.log(card_set.data());
    const data = {
      card_set_id: card_set.id,
      ...card_set.data(),
    } as CardSet;
    return { error: null, data };
  } catch (e) {
    const error = e as FirebaseError;
    return { error: error.message, data: null };
  }
};
