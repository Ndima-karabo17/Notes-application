import React, { createContext, useState, useContext } from 'react';
import { Note } from '@/app/(tabs)'; 

const NotesContext = createContext<any>(null);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (newNote: Note) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);