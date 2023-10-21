"use client";
import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import Navbar from "@/components/Layout/Navbar";
import { FirebaseAuth } from "@/firebase/Firebase-Client";
import { getUserDataById } from "@/firebase/services/auth_service";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export type userContextData = {
  username: string;
  user: User | null | undefined;
  authIsLoading: boolean;
  needToSetUsername: boolean;
};
type providerProps = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
};
const initialState = {
  user: null,
  username: "",
  authIsLoading: true,
  needToSetUsername: false,
};
export const UserDataContext = createContext<userContextData>(initialState);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider = ({ children }: providerProps) => {
  const [user, authStateLoading] = useAuthState(FirebaseAuth);
  const [userData, setUserData] = useState<userContextData>(initialState);
  const [needToSetUsername, setNeedToSetUsername] = useState(false);
  const [settingNameLoading, setSettingNameLoading] = useState(true);

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
  }, [user]);

  const value = {
    username: userData?.username,
    user,
    authIsLoading: loading,
    needToSetUsername,
  };
  return (
    <UserDataContext.Provider value={value}>
      {loading ? <CenterCircularProgress /> : children}
    </UserDataContext.Provider>
  );
};
