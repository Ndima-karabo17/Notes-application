import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const checkAuth = async () => {
    const data = await AsyncStorage.getItem('user_session');
    setIsLoggedIn(!!data);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn === null) return;

    const inAuth = segments[0] === 'authentication';

    if (!isLoggedIn && !inAuth) {
      router.replace('/authentication/Login');
    } else if (isLoggedIn && inAuth) {
      router.replace('/');
    }
  }, [isLoggedIn, segments]);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#34C759" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'My Notes' }} />
      <Stack.Screen name="AddNote" options={{ title: 'Add Note' }} />
      <Stack.Screen name="authentication/Login" options={{ headerShown: false }} />
      <Stack.Screen name="authentication/Register" options={{ headerShown: false }} />
      <Stack.Screen name="Profile" options={{ title: 'Profile' }} />
    </Stack>
  );
}