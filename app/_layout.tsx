import { NotesProvider } from '@/context/NotesContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    

<NotesProvider>
     <Stack screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="authentication/Login" />
      <Stack.Screen name="authentication/Register" />
      <Stack.Screen name="authentication/Profile" options={{ title: 'My Profile' }} />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />

    </Stack>
    </NotesProvider>

  );
}
