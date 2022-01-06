import React, { ReactElement, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type NoteData = any;

export type NotesType = {
  content: string;
  folderUuid: string | null;
  id: string;
  ownerColleagueUuid: string;
  referenceColleagueUuid: null | string;
  status: string;
  title: string;
  updateTime: string;
  selected: boolean;
};
export type NotesTypeTEAM = {
  content: string;
  folderUuid: string | null;
  id: string;
  ownerColleagueUuid: string;
  referenceColleagueUuid: string;
  status: string;
  title: string;
  updateTime: string;
  selected: boolean;
};

export type FoldersWithNotesTypes = {
  id: string;
  notes: Array<NotesType>;
  ownerColleagueUuid: string;
  quantity: number;
  selected: boolean;
  title: string;
  selectedDots: boolean;
};

export type FoldersWithNotesTypesTEAM = {
  id: string;
  notes: Array<NotesTypeTEAM>;
  ownerColleagueUuid: string;
  quantity: number;
  selected: boolean;
  title: string;
  selectedDots: boolean;
  referenceColleagueUuid: string;
};

export type AddNoteModalProps = {
  foldersWithNotes: Array<FoldersWithNotesTypes>;
  methods: UseFormReturn;
  cancelModal: () => void;
  submitForm: any;
  setPersonalNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateFolder: React.Dispatch<React.SetStateAction<boolean>>;
  successModal: boolean;
  createFolder: boolean;
};

export type ChosesButtonType = {
  title: string;
  show: boolean;
  button: ReactElement;
  id: string;
};

export type MainFolderProps = {
  setSelectedFolder: Dispatch<SetStateAction<NoteData | null>>;
  setSelectedNoteToEdit: Dispatch<SetStateAction<NotesType | null>>;
  setSelectedTEAMNoteToEdit: Dispatch<SetStateAction<NotesTypeTEAM | null>>;
  selectedFolder: NoteData | null;
  foldersWithNotes: any;
  setFoldersWithNotes: Dispatch<SetStateAction<Array<FoldersWithNotesTypes>>>;
  TEAM: boolean;
  selectedTEAMFolder: NoteData | null;
  setSelectedTEAMFolder: Dispatch<SetStateAction<NoteData | null>>;
  setFoldersWithNotesTEAM: Dispatch<SetStateAction<Array<NoteData>>>;
  setUserArchivedMode: Dispatch<SetStateAction<boolean>>;
  setTeamArchivedMode: Dispatch<SetStateAction<boolean>>;
  foldersWithNotesTEAM: any;
  userArchivedMode: boolean;
  teamArchivedMode: boolean;
};

export type SelectedFolderProps = {
  selectedFolder: NoteData | null;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  setConfirmTEAMModal: Dispatch<SetStateAction<boolean>>;
  selectedNoteId: MutableRefObject<null | string>;
  selectedTEAMNoteId: MutableRefObject<null | string>;
  actionModal: MutableRefObject<null | string>;
  actionTEAMModal: MutableRefObject<null | string>;
  setSelectedFolder: Dispatch<SetStateAction<NoteData | null>>;
  foldersWithNotes: Array<FoldersWithNotesTypes> | [];
  setFoldersWithNotes: Dispatch<SetStateAction<Array<FoldersWithNotesTypes>>>;
  selectedFolderId: MutableRefObject<null | string>;
  noteFolderUuid: MutableRefObject<null | string>;
  noteTEAMFolderUuid: MutableRefObject<null | string>;
  setSelectedNoteToEdit: Dispatch<SetStateAction<NotesType | null>>;
  userArchivedMode?: boolean;
  setSelectedTEAMNoteToEdit: Dispatch<SetStateAction<NotesTypeTEAM | null>>;
};

export type PersonalFoldersProps = {
  selectedNoteId: MutableRefObject<null | string>;
  handleSelected: (itemID: string) => any;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  setSelectedTEAMFolder: Dispatch<SetStateAction<NoteData | null>>;
  selectedTEAMFolder: NoteData | null;
  setFoldersWithNotesTEAM: Dispatch<SetStateAction<Array<NoteData>>>;
  actionModal: MutableRefObject<null | string>;
  selectedFolderId: MutableRefObject<null | string>;
  foldersWithNotes: Array<FoldersWithNotesTypes> | [];
  setFoldersWithNotes: Dispatch<SetStateAction<Array<FoldersWithNotesTypes>>>;
  selectedFolder: NoteData | null;
  setSelectedFolder: Dispatch<SetStateAction<NoteData | null>>;
  setUserArchivedMode: Dispatch<SetStateAction<boolean>>;
  userArchivedMode: boolean;
};
