import React from "react";
import { TextInput } from "react-native";
import { Stack, XStack, YStack, Button, Text, View, Input } from "tamagui";
import TextField from "../../components/TextField";
import { Link } from "expo-router";

const LoginForm = () => {
  return (
    <Stack
      backgroundColor='$black'
      justifyContent='center'
      height='100%'
      alignItems='center'
      padding='$4'
    >
      <YStack
        background='$background'
        borderRadius='$4'
        padding='$4'
        maxWidth='300px'
      >
        <Text theme='heading'>Welcome back</Text>
        <Text theme='label'>Please enter your details to sign in.</Text>
        <XStack
          gap='$2'
          alignItems='center'
          justifyContent='center'
          padding='$4'
        >
          <Button theme='button'>
            <Text>Google</Text>
          </Button>
        </XStack>
        <Text theme='label'>OR</Text>
        <YStack padding='$4'>
          <TextField placeholder='Enter your email' />
        </YStack>
        <TextField placeholder='Enter your password' secureTextEntry />
        <XStack
          gap='$4'
          alignItems='center'
          justifyContent='space-between'
          padding='$4'
        >
          <Button theme='link'>
            <Text>Forgot password?</Text>
          </Button>
        </XStack>
        <View display='flex' gap='$4'>
          <Button theme='primary'>
            <Text>Sign in</Text>
          </Button>
          <Button theme='link'>
            <Link href='/signup'>Don't have an account yet? Sign Up</Link>
          </Button>
        </View>
      </YStack>
    </Stack>
  );
};

export default LoginForm;
