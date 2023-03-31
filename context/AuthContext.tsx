import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import Navbar from "@/components/Layout/Navbar";
import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { getUserDataById } from "@/firebase/services/auth_service";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export type userData = {
  username: string;
  user: User | null | undefined;
};
type providerProps = {
  children: JSX.Element | JSX.Element[];
};

export const UserDataContext = createContext<userData>({
  user: null,
  username: "",
});

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider = ({ children }: providerProps) => {
  const [user, authStateLoading] = useAuthState(FirebaseAuth);
  const [userData, setUserData] = useState<userData>({
    user: null,
    username: "",
  });
  const [needToSetUsername, setNeedToSetUsername] = useState(false);
  const [settingNameLoading, setSettingNameLoading] = useState(true);
  const router = useRouter();

  const loading = authStateLoading || settingNameLoading;
  const getAndSetUserData = async (u: User) => {
    const { data } = await getUserDataById(u.uid);
    setSettingNameLoading(false);
    if (!data) {
      return setNeedToSetUsername(true);
    }
    setUserData((lu) => ({ ...lu, username: data.username }));
  };

  useEffect(() => {
    if (user) {
      getAndSetUserData(user);
    } else {
      setSettingNameLoading(false);
    }
  }, [user, router.pathname]);

  const value = {
    username: userData?.username,
    user,
  };
  return (
    <UserDataContext.Provider value={value}>
      <Navbar authIsLoading={loading} needToSetUsername={needToSetUsername} />
      {loading ? <CenterCircularProgress /> : children}
    </UserDataContext.Provider>
  );
};
