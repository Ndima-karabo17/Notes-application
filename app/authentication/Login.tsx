import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // 1. Basic Validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      // 2. Fetch the saved user data from storage
      const userData = await AsyncStorage.getItem('user_session');
      
      if (userData) {
        const user = JSON.parse(userData);

        // 3. CHECK CREDENTIALS: Compare input with stored data
        if (email.toLowerCase() === user.email.toLowerCase() && password === user.password) {
          // Success! Redirect to home
          router.replace('/(tabs)');
        } else {
          // Failure: Incorrect details
          Alert.alert("Login Failed", "The email or password you entered is incorrect.");
        }
      } else {
        // No user found in storage (User hasn't registered or updated profile yet)
        Alert.alert("No Account", "No user found. Please register first.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong during login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.h1}>Log in to get started and take your notes to new height</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/authentication/Register" asChild>
        <TouchableOpacity style={styles.link}>
          <Text>Do not have an account? <Text style={{color: '#007AFF'}}>Register</Text></Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  h1:{fontSize: 16, fontWeight: 'bold',  marginBottom:30, marginTop: -30, textAlign: 'center'},
  label:{ marginBottom: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, alignItems: 'center' },
});
