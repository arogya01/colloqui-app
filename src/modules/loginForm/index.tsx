import React from "react";
import { Stack, YStack, Button, Text, View } from "tamagui";
import TextField from "../../components/TextField";
import { Link } from "expo-router";
import { colors } from "../../theme";

const LoginForm = () => {
  return (
    <Stack
      backgroundColor={colors.primaryBlack}
      justifyContent='center'
      height='100%'
      alignItems='center'
      padding='$4'
    >
      <YStack
        backgroundColor={colors.primaryWhite}
        borderRadius='$4'
        padding='$4'
        maxWidth='300px'
      >
        <Text fontWeight='400' >
          Welcome back
        </Text>
        <YStack  width='200'>
          <Text padding='$0' color={colors.primary}>Email</Text>
          <TextField margin="$0" width="200px" padding='$0' placeholder='Enter your email' />
        </YStack>
        <YStack>
          <Text color={colors.primary}>Password</Text>
          <TextField placeholder='Enter your password' secureTextEntry />
        </YStack>
        <View display='flex' gap='$4'>
          <Button theme='primary'>
            <Text>Sign in</Text>
          </Button>
          <Button>
            <Link href='/signup'>Don't have an account yet? Sign Up</Link>
          </Button>
        </View>
      </YStack>
    </Stack>
  );
};

export default LoginForm;
