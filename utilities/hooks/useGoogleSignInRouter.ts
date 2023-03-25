import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { useRouter } from "next/router";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

const useGoogleSignInRouter = () => {
  const [signInWithGoogle] = useSignInWithGoogle(FirebaseAuth);
  const [user, loading] = useAuthState(FirebaseAuth);
  const router = useRouter();
  return { user, router, loading, signInWithGoogle };
};

export default useGoogleSignInRouter;
