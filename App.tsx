import React from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'tamagui';
import { createTamagui, TamaguiProvider , View } from '@tamagui/core';
import { config } from '@tamagui/config/v3'
import { StyleSheet, Text } from 'react-native';
import { Button } from 'tamagui';
import LoginForm  from "./src/modules/loginForm";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


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
     <Stack alignItems="center" justifyContent='center' width='100%' >
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 40 }}>wow I just centered this shit right here woohoo!!</Text>      
      </Stack>
      <LoginForm />
    </TamaguiProvider>
  );
}
