import React from 'react';
import { Text } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { useSession } from '../../src/hooks/useSession';
import  {SocketContextProvider} from "../../src/context/SocketContextProvider";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  console.log('session is:',session);

  
  // This layout can be deferred because it's not the root layout.
  return (
    <SafeAreaView>
      <SocketContextProvider>
        <Slot />
      </SocketContextProvider>
    </SafeAreaView>
  )
}
