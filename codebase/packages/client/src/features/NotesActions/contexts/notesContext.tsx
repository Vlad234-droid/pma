import React, { createContext, FC, useContext, useState } from 'react';
import { FoldersWithNotesTypes, FoldersWithNotesTypesTEAM, NoteData, NotesType, NotesTypeTEAM } from '../type';
import { PeopleTypes } from '../components/TeamNotes/ModalsParts/type';

const defaultData = {
  selectedFolder: null,
  setSelectedFolder: () => null,
  foldersWithNotes: [],
  setFoldersWithNotes: () => null,
  selectedNoteToEdit: null,
  setSelectedNoteToEdit: () => null,
  selectedTEAMFolder: null,
  setSelectedTEAMFolder: () => [],
  searchValue: '',
  setSearchValue: () => '',
  foldersWithNotesTEAM: [],
  setFoldersWithNotesTEAM: () => [],
  selectedTEAMNoteToEdit: null,
  setSelectedTEAMNoteToEdit: () => null,
  selectedPerson: null,
  setSelectedPerson: () => null,
  searchValueFilterOption: '',
  setSearchValueFilterOption: () => '',
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
  searchValue: string;
  setSearchValue: (T) => void;
  foldersWithNotesTEAM: Array<FoldersWithNotesTypesTEAM> | [];
  setFoldersWithNotesTEAM: (T) => void;
  selectedTEAMNoteToEdit: null | NotesTypeTEAM;
  setSelectedTEAMNoteToEdit: (T) => void;
  selectedPerson: PeopleTypes | null;
  setSelectedPerson: (T) => void;
  searchValueFilterOption: string;
  setSearchValueFilterOption: (T) => void;
  archiveMode: { user: boolean; team: boolean };
  setArchiveMode: (T) => void;
};

export const NotesContext = createContext<Data>(defaultData);

export const NotesProvider: FC = ({ children }) => {
  const [selectedFolder, setSelectedFolder] = useState<NoteData | null>(null);
  const [foldersWithNotes, setFoldersWithNotes] = useState<Array<FoldersWithNotesTypes> | []>([]);
  const [selectedNoteToEdit, setSelectedNoteToEdit] = useState<NotesType | null>(null);
  const [selectedTEAMFolder, setSelectedTEAMFolder] = useState<NoteData | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [foldersWithNotesTEAM, setFoldersWithNotesTEAM] = useState<Array<FoldersWithNotesTypesTEAM> | []>([]);
  const [selectedTEAMNoteToEdit, setSelectedTEAMNoteToEdit] = useState<NotesTypeTEAM | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState<string>('');
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
        searchValue,
        setSearchValue,
        foldersWithNotesTEAM,
        setFoldersWithNotesTEAM,
        selectedTEAMNoteToEdit,
        setSelectedTEAMNoteToEdit,
        selectedPerson,
        setSelectedPerson,
        searchValueFilterOption,
        setSearchValueFilterOption,
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
