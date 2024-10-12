import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Redirect, Slot, Tabs } from 'expo-router';
import { useSession } from '../../src/hooks/useSession';
import { SocketContextProvider } from "../../src/context/SocketContextProvider";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetProfile } from '../../src/hooks/services/useGetProfile';
import TabLayout from '../(tabs)/_layout';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const { data, isLoading: isProfileLoading = false } = useGetProfile();
  const { userId = '' } = data || {};

  if (isLoading || isProfileLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (!session || !userId) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SocketContextProvider>
        <TabLayout />
      </SocketContextProvider>
    </SafeAreaView>
  );
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
