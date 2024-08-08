import React from "react";
import { Text } from "tamagui";
import { useSession } from "../../../src/hooks/useSession";
import { Redirect, Stack } from "expo-router";

const Chat = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return <Stack />;
};

export default Chat;
