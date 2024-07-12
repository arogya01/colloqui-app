import React from "react";
import { Stack, YStack, Button, Text, View } from "tamagui";
import TextField from "../../components/TextField";
import { Link } from "expo-router";
import { colors } from "../../theme";

const LoginForm = () => {
  console.log("loginForm")
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
        <Stack justifyContent="flex-start">
          <Text padding='$0' height="10px" margin="$0" color={colors.primary}>Email</Text>
          <TextField margin="$0" height="28px" width="200px" padding='$2' placeholder='Enter your email' />
        </Stack>
        <Stack>
          <Text color={colors.primary}>Password</Text>
          <TextField height="28px" width="200px" padding='$2'  placeholder='Enter your password' secureTextEntry />
        </Stack>
        <View display='flex' gap='$4'>
          <Button theme='primary'>
            <Text>Sign in</Text>
          </Button>
          <Button>
            <Link href='/signup'>Don't have an account yet? Sign Up</Link>
          </Button>
          <Button>
            <Link href='/chat'>Chat Screen</Link>
          </Button>
        </View>
      </YStack>
      
    </Stack>
  );
};

export default LoginForm;
