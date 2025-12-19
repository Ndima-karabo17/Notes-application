import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Note = {
  id: string;
  title?: string;
  content: string;
  category: string;
  dateAdded: string;
  dateUpdated?: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('user_notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load notes.");
    }
  };

  const deleteNote = async (id: string) => {
    Alert.alert("Confirm Delete", "This action cannot be undone.", [
      { text: "Cancel", style: 'cancel' },
      { 
        text: "Delete", 
        style: 'destructive', 
        onPress: async () => {
          const updatedNotes = notes.filter(n => n.id !== id);
          setNotes(updatedNotes);
          await AsyncStorage.setItem('user_notes', JSON.stringify(updatedNotes));
        } 
      }
    ]);
  };

  const filteredNotes = notes.filter((note) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      note.content.toLowerCase().includes(searchLower) ||
      note.title?.toLowerCase().includes(searchLower) ||
      note.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes found. Tap + to add one!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <TouchableOpacity 
              style={styles.noteContent}
              onPress={() => router.push({ pathname: '/AddNote', params: { id: item.id } })}
            >
              <View style={styles.noteHeader}>
                <Text style={styles.categoryTag}>{item.category}</Text>
                <Text style={styles.dateText}>
                  {item.dateUpdated ? `Edited: ${item.dateUpdated}` : item.dateAdded}
                </Text>
              </View>
              {item.title && <Text style={styles.noteTitle}>{item.title}</Text>}
              <Text style={styles.noteSnippet} numberOfLines={2}>{item.content}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={22} color="#f0483fff" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/AddNote')}
      >
        <Ionicons name="add" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', paddingHorizontal: 16 },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 12, 
    marginTop: 60, // Added margin for status bar
    marginBottom: 20 
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  noteCard: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  noteContent: { flex: 1 },
  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryTag: { backgroundColor: '#E0EFFF', color: '#007AFF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 12, fontWeight: '600' },
  dateText: { fontSize: 12, color: '#8E8E93' },
  noteTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  noteSnippet: { fontSize: 15, color: '#3A3A3C' },
  deleteButton: { marginLeft: 10, padding: 8 },
  emptyText: { textAlign: 'center', color: '#8E8E93', marginTop: 50 },
  fab: { 
    position: 'absolute', 
    bottom: 30, 
    right: 20, 
    backgroundColor: '#34C759', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});
