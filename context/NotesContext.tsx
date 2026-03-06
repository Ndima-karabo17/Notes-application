import React, { createContext, useState, useContext } from 'react';

export type Note = {
  id: string;
  title?: string;
  content: string;
  category: string;
  dateAdded: string;
  dateUpdated?: string;
};

type NotesContextType = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  addNote: (note: Note) => void;
};

const NotesContext = createContext<NotesContextType | null>(null);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (newNote: Note) => {
    setNotes(prev => [newNote, ...prev]);
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within a NotesProvider');
  return context;
};