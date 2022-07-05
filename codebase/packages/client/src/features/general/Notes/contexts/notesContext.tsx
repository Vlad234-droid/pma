import React, { createContext, FC, useContext, useState } from 'react';
import { NoteData, NoteTeamData } from '../configs';

const defaultData = {
  foldersWithNotes: [],
  setFoldersWithNotes: () => [],
  foldersWithNotesTEAM: [],
  setFoldersWithNotesTEAM: () => [],
  archiveMode: {
    user: false,
    team: false,
  },
  setArchiveMode: () => ({}),
  searchValue: '',
  setSearchValue: () => '',
};

type Data = {
  foldersWithNotes: [] | Array<NoteData>;
  setFoldersWithNotes: (T) => void;
  foldersWithNotesTEAM: [] | Array<NoteTeamData>;
  setFoldersWithNotesTEAM: (T) => void;
  archiveMode: { user: boolean; team: boolean };
  setArchiveMode: (T) => void;
  searchValue: string;
  setSearchValue: (T) => void;
};

export const NotesContext = createContext<Data>(defaultData);

export const NotesProvider: FC = ({ children }) => {
  const [foldersWithNotes, setFoldersWithNotes] = useState<Array<NoteData> | []>([]);
  const [foldersWithNotesTEAM, setFoldersWithNotesTEAM] = useState<Array<NoteTeamData> | []>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [archiveMode, setArchiveMode] = useState<{ user: boolean; team: boolean }>({
    user: false,
    team: false,
  });

  return (
    <NotesContext.Provider
      value={{
        foldersWithNotes,
        setFoldersWithNotes,
        foldersWithNotesTEAM,
        setFoldersWithNotesTEAM,
        archiveMode,
        setArchiveMode,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const NotesConsumer = NotesContext.Consumer;
export const useNotesContainer = () => useContext(NotesContext);

export default NotesContext;
