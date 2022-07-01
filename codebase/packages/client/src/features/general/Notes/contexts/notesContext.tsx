import React, { createContext, FC, useContext, useState } from 'react';
import { FoldersWithNotesTypes, FoldersWithNotesTypesTEAM, NoteData, NotesType, NotesTypeTEAM } from '../configs';

const defaultData = {
  selectedFolder: null,
  setSelectedFolder: () => null,
  foldersWithNotes: [],
  setFoldersWithNotes: () => null,
  selectedNoteToEdit: null,
  setSelectedNoteToEdit: () => null,
  selectedTEAMFolder: null,
  setSelectedTEAMFolder: () => [],
  foldersWithNotesTEAM: [],
  setFoldersWithNotesTEAM: () => [],
  selectedTEAMNoteToEdit: null,
  setSelectedTEAMNoteToEdit: () => null,
  archiveMode: {
    user: false,
    team: false,
  },
  setArchiveMode: () => ({}),
};

type Data = {
  selectedFolder: null | NoteData;
  setSelectedFolder: (T) => void;
  foldersWithNotes: [] | Array<FoldersWithNotesTypes>;
  setFoldersWithNotes: (T) => void;
  selectedNoteToEdit: NotesType | null;
  setSelectedNoteToEdit: (T) => void;
  selectedTEAMFolder: null | NoteData;
  setSelectedTEAMFolder: (T) => void;
  foldersWithNotesTEAM: Array<FoldersWithNotesTypesTEAM> | [];
  setFoldersWithNotesTEAM: (T) => void;
  selectedTEAMNoteToEdit: null | NotesTypeTEAM;
  setSelectedTEAMNoteToEdit: (T) => void;
  archiveMode: { user: boolean; team: boolean };
  setArchiveMode: (T) => void;
};

export const NotesContext = createContext<Data>(defaultData);

export const NotesProvider: FC = ({ children }) => {
  const [selectedFolder, setSelectedFolder] = useState<NoteData | null>(null);
  const [foldersWithNotes, setFoldersWithNotes] = useState<Array<FoldersWithNotesTypes> | []>([]);
  const [selectedNoteToEdit, setSelectedNoteToEdit] = useState<NotesType | null>(null);
  const [selectedTEAMFolder, setSelectedTEAMFolder] = useState<NoteData | null>(null);
  const [foldersWithNotesTEAM, setFoldersWithNotesTEAM] = useState<Array<FoldersWithNotesTypesTEAM> | []>([]);
  const [selectedTEAMNoteToEdit, setSelectedTEAMNoteToEdit] = useState<NotesTypeTEAM | null>(null);
  const [archiveMode, setArchiveMode] = useState<{ user: boolean; team: boolean }>({
    user: false,
    team: false,
  });

  return (
    <NotesContext.Provider
      value={{
        selectedFolder,
        setSelectedFolder,
        foldersWithNotes,
        setFoldersWithNotes,
        selectedNoteToEdit,
        setSelectedNoteToEdit,
        selectedTEAMFolder,
        setSelectedTEAMFolder,
        foldersWithNotesTEAM,
        setFoldersWithNotesTEAM,
        selectedTEAMNoteToEdit,
        setSelectedTEAMNoteToEdit,
        archiveMode,
        setArchiveMode,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const NotesConsumer = NotesContext.Consumer;
export const useNotesContainer = () => useContext(NotesContext);

export default NotesContext;
