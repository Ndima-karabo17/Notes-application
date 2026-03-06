import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert, View } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNoteScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');

  const categories = ['Work', 'Study', 'Personal'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => router.push('/Profile')}
          style={{ marginRight: 15 }}
        >
          <FontAwesome name="user-circle" size={28} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (id) loadNoteToEdit();
  }, [id]);

  const loadNoteToEdit = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('user_notes');
      if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        const noteToEdit = notes.find((n: any) => n.id === id);
        if (noteToEdit) {
          setTitle(noteToEdit.title || '');
          setContent(noteToEdit.content);
          setCategory(noteToEdit.category);
        }
      }
    } catch (error) {
      console.log('Error loading note', error);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('Wait', 'Please enter some note details.');
      return;
    }

    const now = new Date().toLocaleDateString();

    try {
      const existingData = await AsyncStorage.getItem('user_notes');
      let notes = existingData ? JSON.parse(existingData) : [];

      if (id) {
        notes = notes.map((n: any) =>
          n.id === id ? { ...n, title, content, category, dateUpdated: now } : n
        );
      } else {
        const newNote = {
          id: Date.now().toString(),
          title,
          content,
          category,
          dateAdded: now,
        };
        notes = [newNote, ...notes];
      }

      await AsyncStorage.setItem('user_notes', JSON.stringify(notes));
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the note.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.label}>Title (Optional)</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task 1"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.radioContainer}>
        {categories.map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.radioButton, category === item && styles.radioButtonActive]}
            onPress={() => setCategory(item)}
          >
            <View style={[styles.radioOuter, category === item && styles.radioOuterActive]}>
              {category === item && <View style={styles.radioInner} />}
            </View>
            <Text style={[styles.radioText, category === item && styles.radioTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Note Details</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Type your note here..."
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{id ? 'Update Note' : 'Save Note'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
  input: { backgroundColor: '#F2F2F7', padding: 15, borderRadius: 10, marginBottom: 20, fontSize: 16 },
  radioContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  radioButtonActive: { backgroundColor: '#E7FFE7', borderColor: '#34C759' },
  radioOuter: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioOuterActive: { borderColor: '#34C759' },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#34C759' },
  radioText: { fontSize: 14, color: '#666', fontWeight: '500' },
  radioTextActive: { color: '#000', fontWeight: 'bold' },
  textArea: { height: 200, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#34C759', padding: 18, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});