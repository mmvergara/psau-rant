import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import useAuthStateRouter from "@/utilities/hooks/useAuthStateRouter";
import { formatFirebaseAuthError } from "@/utilities/StringFormatter";

const SignUpPage = () => {
  const { user, loading, router } = useAuthStateRouter();
  if (loading) return <CenterCircularProgress />;
  if (!user) {
    router.push("/");
    return <></>;
  }
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(
        FirebaseAuth,
        "email@gmail.com",
        "pasasdassd"
      );
    } catch (e) {
      const error = e as AuthError;
      toast.error(formatFirebaseAuthError(error.code));
    }
  };

  return (
    <>
      SignIn <Button onClick={handleSignUp}>Signup</Button>
    </>
  );
};

export default SignUpPage;
