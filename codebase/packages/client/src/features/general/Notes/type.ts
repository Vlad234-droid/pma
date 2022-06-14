import { ReactElement, Dispatch, SetStateAction, MutableRefObject } from 'react';

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
  colleagueUuid: string;
  onComplete: () => void;
  onClose: () => void;
};

export type ChosesButtonType = {
  title: string;
  show: boolean;
  button: ReactElement;
  id: string;
};

export type MainFolderProps = {
  isLineManager: boolean;
};

export type SelectedFolderProps = {
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  setConfirmTEAMModal: Dispatch<SetStateAction<boolean>>;
  actionModal: MutableRefObject<null | string>;
  actionTEAMModal: MutableRefObject<null | string>;
  testId?: string;
  userActions: Record<string, string | null>;
  teamActions: Record<string, string | null>;
};

export type PersonalFoldersProps = {
  handleSelected: (itemID: string) => any;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  actionModal: MutableRefObject<null | string>;
  userActions: Record<string, string | null>;
};

export enum NotesStatus {
  CREATED = 'CREATED',
  ARCHIVED = 'ARCHIVED',
}
