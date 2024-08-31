import React, { useState } from "react";
import { useStorageState } from "../hooks/useStorageState";

export const AuthContext = React.createContext<{
  signIn: (accessToken: string,userId:string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userId:string |undefined;
}>({
  signIn: () => null,
  signOut: () => null,
  userId: '',
  session: null,
  isLoading: false,
});

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [userId, setUserId] = useState<undefined | string>(undefined); 


  return (
    <AuthContext.Provider
      value={{
        signIn: (accessToken: string,userId:string) => {
          setSession(accessToken);
          setUserId(userId);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        userId,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
