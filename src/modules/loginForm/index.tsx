import React from 'react';
import { TextInput } from 'react-native';
import { Stack, XStack, YStack, Button, Text, useTheme } from 'tamagui';


const LoginForm = () => {
  const theme = useTheme();

  return (
    <Stack justifyContent="center" alignItems="center" padding="$4">
      <YStack background="$background" borderRadius="$4" padding="$4" maxWidth="300px">
        <Text theme="heading">Welcome back</Text>
        <Text theme="label">Please enter your details to sign in.</Text>
        <XStack alignItems="center" justifyContent="center">
          <Button  theme="button">
            <Text>Apple Icon</Text>
          </Button>
          <Button  theme="button">
            <Text>Google Icon</Text>
          </Button>
          <Button  theme="button">
            <Text>Twitter Icon</Text>
          </Button>
        </XStack>
        <Text theme="label">OR</Text>
        <TextInput  placeholder="Enter your email..." />
        <TextInput  placeholder="Password" secureTextEntry />
        <XStack alignItems="center" justifyContent="space-between" padding="$4">
          <Button theme="checkbox" size="$4">
            <Text>Checkbox Icon</Text>
          </Button>
          <Button theme="link">
            <Text>Forgot password?</Text>
          </Button>
        </XStack>
        <Button theme="primary">
          <Text>Sign in</Text>
        </Button>
        <Button theme="link">
          <Text>Don't have an account yet? Sign Up</Text>
        </Button>
      </YStack>
    </Stack>
  );
};

export default LoginForm;