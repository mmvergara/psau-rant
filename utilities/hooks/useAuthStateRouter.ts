import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuthStateRouter = () => {
  const [user, loading, error] = useAuthState(FirebaseAuth);
  const router = useRouter();
  return { user, loading, error, router };
};

export default useAuthStateRouter;
