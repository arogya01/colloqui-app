import React from "react";
import { Slot } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"; 
import appConfig from "../tamagui.config";
import { useFonts } from "@expo-google-fonts/inter";
import Toast from "react-native-toast-message";


const tamaguiConfig = createTamagui({ ...config, appConfig });
const queryClient = new QueryClient(); 

export const HomeLayout = () => {
    let [fontsLoaded, fontError] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
      });
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

      
    return (
        <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
    <TamaguiProvider config={tamaguiConfig}>
        <Slot/>
        </TamaguiProvider>
        <Toast />
        </SafeAreaProvider>
        </QueryClientProvider>
    )
}