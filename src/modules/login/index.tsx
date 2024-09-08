import React, { useState } from "react";
import { Stack, YStack, Button, Text } from "tamagui";
import TextField from "../../components/TextField";
import { Link, router } from "expo-router";
import { colors } from "../../theme";
import { useLoginUser } from "../../hooks/services/useLoginUser";
import { useSession } from "../../hooks/useSession";
import Toast from "react-native-toast-message";

const LoginForm = () => {
  const { mutate, isPending } = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();
  const handleSignIn = async () => {
    if (!email || !password) {
      // You might want to show an error message to the user here
      console.log("Email and password are required");
      return;
    }

    try {
      mutate(
        { email, password },
        {
          onSuccess: (response) => {
            console.log("login success", response);
            const { data: { accessToken = ""  , userId = ''} = {} } = response || {};
            console.log("accessToken is,", accessToken);
            signIn(accessToken, userId);
            router.replace("/");
          },
          onError: (error) => {
            console.log('error.response', error);
            Toast.show({
              type: "error",
              text1: "Error occurred",
              text2: error?.response?.data?.message || "",
            });
          },
        }
      );
    } catch (error) {
      // Handle login error here
      console.error("Login failed:", error);
    }
  };

  const onEmailChange = (text: string) => {
    setEmail(text);
  };

  const onPasswordChange = (text: string) => {
    setPassword(text);
  };

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
          <Text color={colors.primary}>Email</Text>
          <TextField
            value={email}
            backgroundColor={colors.primaryWhite}
            onChangeText={onEmailChange}
            containerPadding="$1"
            height="40px"
            color={colors.primaryBlack}
            width="100%"
            padding="$2"
            placeholder="Enter your email"
          />
        </Stack>
        <Stack gap="$2" marginVertical="$2">
          <Text color={colors.primary}>Password</Text>
          <TextField
            containerPadding="$1"
            backgroundColor={colors.primaryWhite}
            color={colors.primaryBlack}
            height="40px"
            value={password}
            onChangeText={onPasswordChange}
            width="100%"
            padding="$2"
            placeholder="Enter your password"
            secureTextEntry
          />
        </Stack>
        <Stack alignItems="stretch">
          <Button
            padding="$2"
            marginVertical="$2"
            height="40px"
            onPress={handleSignIn}
            disabled={isPending}
          >
            <Text fontSize={14}>{isPending ? "Signing in..." : "Sign in"}</Text>
          </Button>
          <Button padding="$2" marginVertical="$2" height="40px">
            <Link href="/signup">
              <Text>Signup Boss</Text>
            </Link>
          </Button>
          <Button padding="$2" marginVertical="$2" height="40px">
            <Link href="/chat">
              <Text>Chat Screen</Text>
            </Link>
          </Button>
        </Stack>
      </YStack>
    </Stack>
  );
};

export default LoginForm;
