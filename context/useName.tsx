import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type nameContext = {
  username: string;
  email: string;
};

export const nameContext = createContext<null | nameContext>(null);

export const useNameContext = () => {
  const [u, loading, error] = useAuthState(FirebaseAuth);

  const [user, setUser] = useState<User | null>(u);

  useEffect(() => {
    setUser(u);
  }, [user]);

  return { user };
};
