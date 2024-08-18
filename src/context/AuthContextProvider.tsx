import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { router } from "expo-router";
import { Text } from "tamagui";

export const AuthContext = React.createContext<{
  signIn: (accessToken: string) => void;
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
  // need to push it down another layer, something related to Root Layout should be mounted. something of that sort.
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  if (session) {
    router.replace("/chat");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: (accessToken: string) => {
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
