import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import Navbar from "@/components/Layout/Navbar";
import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { getUserDataById } from "@/firebase/services/auth_service";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type userData = {
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

  const [settingNameLoading, setSettingNameLoading] = useState(true);

  const loading = authStateLoading || settingNameLoading;

  const getAndSetUserData = async (u: User) => {
    setSettingNameLoading(true);
    const { data } = await getUserDataById(u.uid);
    if (!data) return;
    setUserData((lu) => ({ ...lu, username: data.username }));
    setSettingNameLoading(false);
  };

  useEffect(() => {
    if (user) getAndSetUserData(user);
  }, [user]);

  const value = {
    username: userData?.username || "",
    user,
  };

  return (
    <UserDataContext.Provider value={value}>
      <Navbar authIsLoading={loading} />
      {loading ? <CenterCircularProgress /> : children}
    </UserDataContext.Provider>
  );
};
