import React from "react";
import { Text } from "tamagui";
import { useSession } from "../../../src/hooks/useSession";
import { Redirect, Slot } from "expo-router";

const Chat = () => {
  const { session, isLoading } = useSession();

  console.log("session", session);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return <Slot />;
};

export default Chat;
