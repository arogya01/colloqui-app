import React from "react";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import appConfig from "../tamagui.config";
import { SessionProvider } from "../src/context/AuthContextProvider";
import { useFonts } from "@expo-google-fonts/inter";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";

const tamaguiConfig = createTamagui({ ...config, ...appConfig });
const queryClient = new QueryClient();

if(__DEV__) {
  import("../reactotron.config");
}
export default function Layout() {
  let [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  console.log({ fontsLoaded, fontError });

  if (!fontsLoaded && !fontError) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  if (fontError) {
    return (
      <View>
        <Text>Error loading fonts: {fontError.message}</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <SessionProvider>
            <Slot />
            <Toast />
          </SessionProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
