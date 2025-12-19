import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('Ndima'); 
  const [email, setEmail] = useState('ndima.karabo3@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const handleUpdateProfile = () => {
    // 1. Validation check
    if (!name || !email) {
      Alert.alert("Error", "Username and Email are required.");
      return;
    }

    // 2. First Alert: Confirm Success
    Alert.alert(
      "Updated Successfully", 
      "Your profile information has been saved.",
      [
        {
          text: "Next",
          onPress: () => {
            // 3. Second Alert: Security Requirement
            Alert.alert(
              "Security Action Required",
              "For your security, please login again using your updated password.",
              [
                {
                  text: "Go to Login",
                  onPress: async () => {
                    // 4. Log the user out
                    try {
                      // Clear any saved user session/token here
                      await AsyncStorage.removeItem('user_session'); 
                      
                      // Redirect to login and clear navigation history
                      router.replace('/authentication/Login');
                    } catch (e) {
                      router.replace('/authentication/Login');
                    }
                  }
                }
              ],
              { cancelable: false } // Force the user to click the button
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1A1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Settings</Text>
          <View style={{ width: 24 }} /> 
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={50} color="#fff" />
          </View>
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

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/authentication/Login')}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  inner: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1C1E' },
  avatarSection: { alignItems: 'center', marginBottom: 30 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#00ff37ff', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  userRole: { color: '#666', fontSize: 14 },
  section: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  label: { fontSize: 14, color: '#666', marginBottom: 5, marginLeft: 4 },
  input: { backgroundColor: '#F5F7FA', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#E1E4E8' },
  saveButton: { backgroundColor: '#2bff00ff', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#131313ff', fontWeight: 'bold', fontSize: 16 },
  logoutButton: { marginTop: 20, padding: 16, alignItems: 'center' },
  logoutButtonText: { color: '#FF3B30', fontWeight: '600' },
});
