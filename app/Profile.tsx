import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user_session');
        if (userData) {
          const user = JSON.parse(userData);
          setName(user.name || '');
          setEmail(user.email || '');
        }
      } catch (e) {
        console.log('Failed to load user', e);
      }
    };
    loadUser();
  }, []);

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Username and Email are required.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user_session');
      const existingUser = userData ? JSON.parse(userData) : {};

      if (newPassword) {
        if (!currentPassword) {
          Alert.alert('Error', 'Please enter your current password to set a new one.');
          return;
        }
        if (currentPassword !== existingUser.password) {
          Alert.alert('Error', 'Current password is incorrect.');
          return;
        }
        if (newPassword.length < 6) {
          Alert.alert('Error', 'New password must be at least 6 characters.');
          return;
        }
      }

      const updatedUser = {
        ...existingUser,
        name,
        email,
        password: newPassword ? newPassword : existingUser.password,
      };
      await AsyncStorage.setItem('user_session', JSON.stringify(updatedUser));

      Alert.alert(
        'Updated Successfully',
        'Your profile has been saved. Please log in again.',
        [
          {
            text: 'Go to Login',
            onPress: async () => {
              await AsyncStorage.removeItem('user_session');
              router.replace('/authentication/Login');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user_session');
    router.replace('/authentication/Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={50} color="#fff" />
          </View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userRole}>Member since 2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Login Credentials</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Update username"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>

          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
          <Text style={styles.saveButtonText}>Update Credentials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  inner: { padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#1A1C1E' },
  userRole: { color: '#666', fontSize: 14, marginTop: 4 },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  label: { fontSize: 14, color: '#666', marginBottom: 5, marginLeft: 4 },
  input: {
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  saveButton: { backgroundColor: '#34C759', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  logoutButton: { marginTop: 20, padding: 16, alignItems: 'center' },
  logoutButtonText: { color: '#FF3B30', fontWeight: '600' },
});