import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { AllNotesFolderId, AllNotesFolderIdTEAM } from '@pma/client/src/utils';
import { Folders, NoteStatus } from '../config/types';

//@ts-ignore

export const notesSelector = (state: RootState) => state.notes;

export const getNotesMetaSelector = createSelector(notesSelector, (notes: any) => {
  const { meta } = notes;
  return meta;
});

export const getFoldersSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  return folders;
});

export const getNotesSelector = createSelector(notesSelector, (notes: any) =>
  notes?.notes?.filter((item) => item?.status === NoteStatus.CREATED),
);

export const personalNoteByUUIDSelector = (uuid: string) =>
  //@ts-ignore
  createSelector(notesSelector, (notes) => notes?.notes?.find((note) => note?.id === uuid));

export const archivedNotesSelector = createSelector(notesSelector, (notes: any) =>
  notes?.notes?.filter((item) => item?.status === NoteStatus.ARCHIVED),
);
export const personalFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.find((item) => !item.parentFolderUuid && item.title === Folders.PERSONAL_FOLDER)?.id;
});

export const personalArchivedFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.find((item) => !item.parentFolderUuid && item.title === Folders.ARCHIVED_FOLDER)?.id;
});

export const teamArchivedFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.find((item) => !item.parentFolderUuid && item.title === Folders.TEAM_ARCHIVED_FOLDER)?.id;
});

export const teamFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.find((item) => !item.parentFolderUuid && item.title === Folders.TEAM_FOLDER)?.id;
});

export const notesFolderColleagueDataSelector = (colleagueUuid, isUserArchived) =>
  createSelector(notesSelector, (notes: any) => {
    const { folders } = notes;

    const notesData =
      notes?.notes?.filter((item) =>
        !isUserArchived ? item?.status === NoteStatus.CREATED : item?.status === NoteStatus.ARCHIVED,
      ) || [];

    const personalFolderUuid = folders?.find((item) =>
      !item.parentFolderUuid && !isUserArchived
        ? item.title === Folders.PERSONAL_FOLDER
        : item.title === Folders.ARCHIVED_FOLDER,
    )?.id;

    const filteredFolders = [...folders.filter((item) => item.parentFolderUuid === personalFolderUuid)];
    const filteredNotes = [...notesData.filter((item) => !item.referenceColleagueUuid)];
    const newArr = filteredFolders.map((item) => {
      const obj = {
        ...item,
        notes: [],
        selected: false,
        selectedDots: false,
      };
      filteredNotes.forEach((noteItem: any) => {
        if (noteItem.folderUuid === item.id) {
          obj.notes.push({
            ...noteItem,
            selected: false,
          });
        }
      });
      function helper(this: any) {
        return this.notes.length;
      }
      obj.quantity = helper.bind(obj);
      return obj;
    });

    const allNotesDefaultFolder = {
      id: AllNotesFolderId,
      ownerColleagueUuid: colleagueUuid,
      title: 'All notes',
      notes: [...filteredNotes],
      selected: false,
      quantity: filteredNotes.length,
      selectedDots: false,
    };
    return [allNotesDefaultFolder, ...newArr];
  });

export const notesFolderTeamDataSelector = (colleagueUuid, teamArchivedMode) =>
  createSelector(notesSelector, (notes: any) => {
    const { folders } = notes;

    const notesData =
      notes?.notes?.filter((item) =>
        !teamArchivedMode
          ? item?.status === NoteStatus.CREATED && item.referenceColleagueUuid
          : item?.status === NoteStatus.ARCHIVED && item.referenceColleagueUuid,
      ) || [];

    const teamFolderUuid = folders?.find((item) =>
      !item.parentFolderUuid && !teamArchivedMode
        ? item.title === Folders.TEAM_FOLDER
        : item.title === Folders.TEAM_ARCHIVED_FOLDER,
    )?.id;

    const filteredFolders = [...folders.filter((item) => item.parentFolderUuid === teamFolderUuid)];
    const filteredNotes = [...notesData];
    const newArr = filteredFolders.map((item) => {
      const obj = {
        ...item,
        notes: [],
        selected: false,
        selectedDots: false,
      };
      filteredNotes.forEach((noteItem: any) => {
        if (noteItem.folderUuid === item.id) {
          obj.notes.push({
            ...noteItem,
            selected: false,
          });
        }
      });
      function helper(this: any) {
        return this.notes.length;
      }
      obj.quantity = helper.bind(obj);
      return obj;
    });

    const allNotesDefaultFolder = {
      id: AllNotesFolderIdTEAM,
      ownerColleagueUuid: colleagueUuid,
      title: 'All notes',
      notes: [...filteredNotes],
      selected: false,
      quantity: filteredNotes.length,
      selectedDots: false,
    };
    return [allNotesDefaultFolder, ...newArr];
  });
