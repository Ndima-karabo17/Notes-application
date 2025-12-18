import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


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
  

  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Groceries', content: 'Buy milk and eggs', category: 'Personal', dateAdded: '2025-12-18' },
    { id: '2', content: 'Finish notes taking application', category: 'Work', dateAdded: '2025-12-18' },
   { id: '3', content: 'Material', category: 'Personal', dateAdded: '2025-12-18' },
  ]);


  const filteredNotes = notes.filter((note) => {
    const searchLower = searchQuery.toLowerCase();
    const contentMatch = note.content.toLowerCase().includes(searchLower);
    const titleMatch = note.title?.toLowerCase().includes(searchLower);
    const categoryMatch = note.category.toLowerCase().includes(searchLower);
    return contentMatch || titleMatch || categoryMatch;
  });

 
  const deleteNote = (id: string) => {
    Alert.alert("Confirm to delete", "When you delete note you cannot recover it.", [
      { text: "Cancel" },
      { text: "Confirm", style: 'destructive', onPress: () => {
          setNotes(notes.filter(n => n.id !== id));
      }}
    ]);
  };

  return (
    <View style={styles.container}>
 
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#020202ff" />
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
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <TouchableOpacity 
              style={styles.noteContent}
              onPress={() => router.push({ pathname: '/(tabs)/AddNote', params: { id: item.id } })}
            >
              <View style={styles.noteHeader}>
                <Text style={styles.categoryTag}>{item.category}</Text>
                <Text style={styles.dateText}>{item.dateUpdated ? `Edited: ${item.dateUpdated}` : item.dateAdded}</Text>
              </View>
              {item.title && <Text style={styles.noteTitle}>{item.title}</Text>}
              <Text style={styles.noteSnippet} numberOfLines={2}>{item.content}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/(tabs)/AddNote')}
      >
        <Ionicons name="add" size={30} color="#080808ff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', paddingHorizontal: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 15, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  noteCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  noteContent: { flex: 1 },
  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryTag: { backgroundColor: '#E0EFFF', color: '#0f0f0fff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 12, fontWeight: '600' },
  dateText: { fontSize: 12, color: '#8E8E93' },
  noteTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  noteSnippet: { fontSize: 15, color: '#3A3A3C' },
  deleteButton: { marginLeft: 10, padding: 8 },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#08f54bff', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5}
});