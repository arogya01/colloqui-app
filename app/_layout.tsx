import React from "react";
import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import appConfig from "../tamagui.config";
import { SessionProvider } from "../src/context/AuthContextProvider";
import { useFonts } from "@expo-google-fonts/inter";
import Toast from "react-native-toast-message";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const tamaguiConfig = createTamagui({ ...config, ...appConfig });
const queryClient = new QueryClient();

if (__DEV__) {
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
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (fontError) {
    return (
      <SafeAreaView>
        <View>
          <Text>Error loading fonts: {fontError.message}</Text>
        </View>
      </SafeAreaView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginRight: 10,
  },
});
