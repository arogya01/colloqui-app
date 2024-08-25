import React from "react";
import { Stack, Text } from "tamagui";

interface RedirectingTabProps {
  color?: string;
}

const Redirection = ({ color = "black" }: RedirectingTabProps) => {
  return (
    <Stack
      position="absolute"
      bottom="0"
      left="0"
      right="0"
      backgroundColor="white"
      padding="$2"
      justifyContent="center"
      alignItems="center"
    >
      <Text color={color}>Redirecting you to login page...</Text>
    </Stack>
  );
};

export default Redirection;
