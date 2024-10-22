import React from "react";
import { Stack, Text } from "tamagui";
import { useGetProfile } from "../../src/hooks/services/useGetProfile";
import { colors } from "../../src/theme";

export default function Profile() {
  const { data, isLoading: isProfileLoading = false } = useGetProfile();
  console.log("profile screen", { data });
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
      backgroundColor={colors.notQuiteBlack}
    >
      <Text color={colors.primaryWhite}>Profile</Text>
    </Stack>
  );
}
