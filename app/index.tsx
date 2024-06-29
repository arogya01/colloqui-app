import React from "react";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { View, Text } from "react-native";
import { config } from "@tamagui/config/v3";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import LoginForm from "../src/modules/loginForm";
// import {customConfig} from "./theme"

const tamaguiConfig = createTamagui(config);

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View>
        <Text>arogya</Text>
      </View>
      <LoginForm />
    </TamaguiProvider>
  );
}
