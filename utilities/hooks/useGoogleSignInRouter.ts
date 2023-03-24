import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const useGoogleSignInRouter = () => {
  const [signInWithGoogle, user, loading, error] =
    useSignInWithGoogle(FirebaseAuth);
  const router = useRouter();
  return { user, loading, error, router, signInWithGoogle };
};

export default useGoogleSignInRouter;
