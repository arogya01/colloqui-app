import React from "react";
import { useStorageState } from "../hooks/useStorageState";

export const AuthContext = React.createContext<{
  signIn: (accessToken: string, userId: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  console.log("session", session);
  return (
    <AuthContext.Provider
      value={{
        signIn: (accessToken: string, userId: string) => {
          setSession(accessToken);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
