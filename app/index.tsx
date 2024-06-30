import React from "react";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import LoginForm from "../src/modules/loginForm";
import appConfig from "../tamagui.config";
// import {customConfig} from "./theme"

const tamaguiConfig = createTamagui({ ...config, appConfig });

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <LoginForm />
    </TamaguiProvider>
  );
}
