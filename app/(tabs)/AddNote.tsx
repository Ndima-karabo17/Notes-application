import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddNoteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  const handleSave = () => {
    const now = new Date().toLocaleDateString();
    
    if (id) {
   
      console.log("Updating note with timestamp:", now);
    } else {
    
      console.log("Saving new note with date:", now);
    }
    
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.label}>Title (Optional)</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder='Task 1'/>

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Work" />

      <Text style={styles.label}>Note Details</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        value={content} 
        onChangeText={setContent} 
        placeholder="Type your note here..." 
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{id ? "Update Note" : "Save Note"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
  input: { backgroundColor: '#F2F2F7', padding: 15, borderRadius: 10, marginBottom: 20, fontSize: 16 },
  textArea: { height: 200, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#04ff00ff', padding: 18, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: '#090808ff', fontWeight: 'bold', fontSize: 18 }
});