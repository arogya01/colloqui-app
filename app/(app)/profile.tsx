import React from "react";
import { Spinner, Stack, Text } from "tamagui";
import { useGetProfile } from "../../src/hooks/services/useGetProfile";
import { colors } from "../../src/theme";

export default function Profile() {
  const { data: profileData, isLoading: isProfileLoading = false } =
    useGetProfile();

  if (isProfileLoading) {
    return <Spinner size="large" color={colors.primary} />;
  }
  return (
    <Stack
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      padding="$8"
      flex={1}
      backgroundColor={colors.notQuiteBlack}
    >
      <Text color={colors.primaryWhite}>Profile</Text>
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
      ></Stack>
    </Stack>
  );
}
