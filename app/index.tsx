import React from "react";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"; 
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import LoginForm from "../src/modules/loginForm";
import appConfig from "../tamagui.config";
// import {customConfig} from "./theme"

const tamaguiConfig = createTamagui({ ...config, appConfig });
const queryClient = new QueryClient(); 
export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <TamaguiProvider config={tamaguiConfig}>
      <LoginForm />
    </TamaguiProvider>
    </QueryClientProvider>
  );
}
