import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Notes',
          tabBarIcon: ({ color }) => <FontAwesome name="sticky-note" size={28} color={color} />,
          
          headerRight: () => (
            <Link href="/authentication/Profile" asChild>
              <Pressable style={{ marginRight: 15 }}>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-circle"
                    size={28}
                    color="#007AFF"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    
    </Tabs>
  );
}