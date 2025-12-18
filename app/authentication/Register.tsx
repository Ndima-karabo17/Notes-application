import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.h1}>Register now and take your note-taking to next level</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput style={styles.input} placeholder="Username" value={name} onChangeText={setName} />
      <Text style={styles.label}>Email Address:</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text style={styles.label}>Password:</Text>
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link href="/authentication/Register" asChild>
        <TouchableOpacity style={styles.link}>
          <Text>Already have an account? <Text style={{color: '#007AFF'}}>Login</Text></Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  h1:{fontSize: 16, fontWeight:'bold', marginBottom:30,marginTop: -30, textAlign: 'center'},
 
  label:{},
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, alignItems: 'center' },
});