import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { useSession } from '../../src/hooks/useSession';
import  {SocketContextProvider} from "../../src/context/SocketContextProvider";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetProfile } from '../../src/hooks/services/useGetProfile';


export default function AppLayout() {
  const { session, isLoading } = useSession();
  const {data, isLoading: isProfileLoading = false} = useGetProfile(); 
  const {userId = '' } = data || {};
console.log('profile data',data);
  
  if (isLoading || isProfileLoading) {
    return(
    < SafeAreaView style={styles.container} > 
      < View style={styles.loadingContainer}>
        < ActivityIndicator size="small" color="#0000ff" />
      </View>
      </SafeAreaView>
      );
  }
  console.log('userId',userId);
  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session || !userId) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  
  // This layout can be deferred because it's not the root layout.
  return (
    <SafeAreaView>
      <SocketContextProvider>
        <Slot />      
      </SocketContextProvider>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginRight: 10,
  },
});