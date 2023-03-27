import { FirestoreUser } from "@/types/models/user_types";
import { simplifyFirebaseAuthError } from "@/utilities/StringFormatter";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseAuth, FirebaseFirestore } from "../Firebase-Client";

export const signUpFirebaseWithEmailAndPassword = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    // Register user with email and password
    const { data: UserCredential, errM: errM1 } =
      await registerWithEmailAndPassword(email, password);
    if (!UserCredential) throw new Error(errM1);

    const { user } = UserCredential;

    // Add username to user document
    const { errM: errM2 } = await addUserUsername(user.uid, username);
    if (errM2) throw new Error(errM2);

    return { errM: null, data: UserCredential };
  } catch (e) {
    const error = e as Error;
    return {
      errM: simplifyFirebaseAuthError(error.message),
      data: null,
    };
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return { errM: null, data: userCredential };
  } catch (e) {
    const error = e as FirebaseError;
    return { errM: error.message, data: null };
  }
};

export const addUserUsername = async (user_id: string, username: string) => {
  try {
    const userRef = await setDoc(doc(FirebaseFirestore, "users", user_id), {
      username,
    });
    return { errM: null, data: userRef };
  } catch (e) {
    const error = e as FirebaseError;
    return { errM: error.message, data: null };
  }
};

export const getUserUsernameById = async (user_id: string) => {
  try {
    const userRef = await getDoc(doc(FirebaseFirestore, "users", user_id));
    return { errM: null, data: userRef.data() as FirestoreUser };
  } catch (e) {
    const error = e as FirebaseError;
    return { errM: error.message, data: null };
  }
};
