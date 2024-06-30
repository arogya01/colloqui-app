import React from "react";
import { TextInput } from "react-native";
import { Stack, XStack, YStack, Button, Text, View, Input } from "tamagui";
import TextField from "../../components/TextField";
import { Link } from "expo-router";
import { colors } from "../../theme";

const LoginForm = () => {
  return (
    <Stack
      backgroundColor={colors.primaryBlack}
      justifyContent='center'
      // borderWidth='1px'
      // borderColor={colors.primaryWhite}
      // borderStyle='solid'
      height='100%'
      alignItems='center'
      padding='$4'
    >
      <YStack
        background='$background'
        borderRadius='$4'
        padding='$4'
        maxWidth='300px'
        alignItems='center'
      >
        <Text fontWeight='400' color='white'>
          Welcome back
        </Text>
        <Text fontWeight='400' color='white'>
          Please enter your details to sign in.
        </Text>
        <YStack width='100px'>
          <Text color={colors.primary}>Email</Text>
          <TextField placeholder='Enter your email' />
        </YStack>
        <YStack>
          <Text color={colors.primary}>Password</Text>
          <TextField placeholder='Enter your password' secureTextEntry />
        </YStack>
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
