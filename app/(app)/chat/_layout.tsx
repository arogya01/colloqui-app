import React from "react";
import { Text } from "tamagui";
import { useSession } from "../../../src/hooks/useSession";
import { Redirect, Slot } from "expo-router";
import { SocketContextProvider } from "../../../src/context/SocketContextProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  const { session, isLoading } = useSession();

  console.log("session", session);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView>
      <SocketContextProvider>
        <Slot />
      </SocketContextProvider>
    </SafeAreaView>
  );
};

export default Chat;
