import { Dispatch, SetStateAction, MutableRefObject } from 'react';

export type NoteData = {
  id?: string;
  notes: Array<NotesType>;
  ownerColleagueUuid?: string;
  quantity?: number;
  title: string;
  selectedDots?: boolean;
  isInSearch?: boolean;
};

export type NoteTeamData = Omit<NoteData, 'isInSearch'> & { referenceColleagueUuid: string };

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

export type AddNoteModalProps = {
  foldersWithNotes: Array<NoteData>;
  colleagueUuid: string;
  onComplete: () => void;
  onClose: () => void;
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
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  actionModal: MutableRefObject<null | string>;
  userActions: Record<string, string | null>;
};

export enum NotesStatus {
  CREATED = 'CREATED',
  ARCHIVED = 'ARCHIVED',
}
