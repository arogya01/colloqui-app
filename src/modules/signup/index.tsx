import React from "react";
import { Stack, YStack, Button, Text } from "tamagui";
import TextField from "../../components/TextField";
import { Link, router } from "expo-router";
import { colors } from "../../theme";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SafeAreaView } from "react-native";
import { useCreateUser } from "../../hooks/services/useCreateUser";
import Toast from "react-native-toast-message";

const signupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
  userName: z.string({
    required_error: "Name is required",
  }),
  bio: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),
  image: z.string().optional(),
});

const SignupForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      bio: "",
      phoneNumber: "",
      image: "",
    },
  });
  const { mutate, isPending } = useCreateUser();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "User created, redirecting to Login",
        });
        setTimeout(() => {
          router.push("/");
        }, 500);
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Error",
        });
      },
    });
  };

  return (
    <SafeAreaView>
      <Stack
        backgroundColor={colors.primaryBlack}
        justifyContent="center"
        minHeight="100%"
        width="100%"
        padding="$2"
        alignItems="stretch"
      >
        <YStack
          backgroundColor={colors.primaryWhite}
          borderRadius="$4"
          padding="$4"
          width="100%"
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Stack gap="$2" marginVertical="$2">
                <Text color={colors.primaryBlack}>Email</Text>
                <TextField
                  containerPadding="$1"
                  height="40px"
                  width="100%"
                  backgroundColor={colors.primaryWhite}
                  color={colors.primaryBlack}
                  padding="$2"
                  placeholder="Enter your email"
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email && (
                  <Text color="red">{errors.email.message}</Text>
                )}
              </Stack>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Stack gap="$2" marginVertical="$2">
                <Text color={colors.primaryBlack}>Password</Text>
                <TextField
                  containerPadding="$1"
                  height="40px"
                  width="100%"
                  padding="$2"
                  color={colors.primaryBlack}
                  backgroundColor={colors.primaryWhite}
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
                {errors.password && (
                  <Text color="red">{errors.password.message}</Text>
                )}
              </Stack>
            )}
          />

          <Controller
            control={control}
            name="userName"
            render={({ field: { onChange, value } }) => (
              <Stack gap="$2" marginVertical="$2">
                <Text color={colors.primaryBlack}>Name</Text>
                <TextField
                  containerPadding="$1"
                  height="40px"
                  width="100%"
                  color={colors.primaryBlack}
                  backgroundColor={colors.primaryWhite}
                  padding="$2"
                  placeholder="Enter your name"
                  onChangeText={onChange}
                  value={value}
                />
                {errors.userName && (
                  <Text color="red">{errors.userName.message}</Text>
                )}
              </Stack>
            )}
          />

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value } }) => (
              <Stack gap="$2" marginVertical="$2">
                <Text color={colors.primaryBlack}>Bio</Text>
                <TextField
                  overflow="scroll"
                  containerPadding="$1"
                  height="80px"
                  color={colors.primaryBlack}
                  width="100%"
                  padding="$2"
                  backgroundColor={colors.primaryWhite}
                  placeholder="Enter your bio"
                  onChangeText={onChange}
                  value={value}
                  multiline
                />
                {errors.bio && <Text color="red">{errors.bio.message}</Text>}
              </Stack>
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <Stack gap="$2" marginVertical="$2">
                <Text color={colors.primaryBlack}>Phone Number</Text>
                <TextField
                  containerPadding="$1"
                  height="40px"
                  width="100%"
                  color={colors.primaryBlack}
                  padding="$2"
                  placeholder="Enter your phone number"
                  backgroundColor={colors.primaryWhite}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
                {errors.phoneNumber && (
                  <Text color="red">{errors.phoneNumber.message}</Text>
                )}
              </Stack>
            )}
          />
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => (
              <Stack gap="$2" marginVertical="$2">
                <Text color={colors.primaryBlack}>Profile Image URL</Text>
                <TextField
                  containerPadding="$1"
                  backgroundColor={colors.primaryWhite}
                  height="40px"
                  color={colors.primaryBlack}
                  width="100%"
                  padding="$2"
                  placeholder="Enter profile image URL"
                  onChangeText={onChange}
                  value={value}
                />
                {errors.image && (
                  <Text color="red">{errors.image.message}</Text>
                )}
              </Stack>
            )}
          />

          <Stack alignItems="stretch">
            <Button
              padding="$2"
              marginVertical="$2"
              height="40px"
              onPress={handleSubmit(onSubmit)}
            >
              <Text>{isPending ? "Signing Up" : "Sign up"}</Text>
            </Button>
            <Button
              padding="$2"
              marginVertical="$2"
              height="40px"
              color={colors.primaryBlack}
            >
              <Link href="/">Back to Login</Link>
            </Button>
          </Stack>
        </YStack>
      </Stack>
    </SafeAreaView>
  );
};

export default SignupForm;
