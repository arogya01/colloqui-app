import React from "react";
import { Stack, YStack, Button, Text, View } from "tamagui";
import TextField from "../../components/TextField";
import { Link } from "expo-router";
import { colors } from "../../theme";

const LoginForm = () => {
  return (
    <Stack 
      gap="$2"
      backgroundColor={colors.primaryBlack}
      justifyContent="center"
      height="100%"
      width="100%"
      alignItems="stretch"
      padding="$4"
    >
      <YStack
        backgroundColor={colors.primaryWhite}
        borderRadius="$4"
        padding="$4"
        width="300px"
      >
        <Stack gap="$2" marginVertical="$2">
          <Text  color={colors.primary}>Email</Text>
          <TextField
          containerPadding="$1"
            height="40px"
            width="100%"
            padding="$2"
            placeholder="Enter your email"
          />
        </Stack>
        <Stack gap="$2" marginVertical="$2">
          <Text color={colors.primary}>Password</Text>
          <TextField
            containerPadding="$1"
            height="40px"
            width="100%"
            padding="$2"
            placeholder="Enter your password"
            secureTextEntry
          />
        </Stack>
        <Stack  alignItems="stretch">
          <Button padding="$2" marginVertical="$2" height="40px">
            <Text>Sign in</Text>
          </Button>
          <Button padding="$3" marginVertical="$2" height="40px" color={colors.primary}>
            <Link href="/signup">Signup Boss</Link>
          </Button>
          <Button padding="$2" marginVertical="$2" height="40px" color={colors.primary}>
            <Link href="/chat">Chat Screen</Link>
          </Button>
        </Stack>
      </YStack>
    </Stack>
  );
};

export default LoginForm;