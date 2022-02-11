import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { AllNotesFolderId, AllNotesFolderIdTEAM } from '../../../client/src/utils/note';

//@ts-ignore

export const notesSelector = (state: RootState) => state.notes;

export const getFoldersSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  return folders;
});

export const getNotesSelector = createSelector(notesSelector, (notes: any) => {
  const notesData = notes.notes.filter((item) => item.status === 'CREATED');
  return notesData;
});
export const archivedNotesSelector = createSelector(notesSelector, (notes: any) => {
  const notesData = notes.notes.filter((item) => item.status === 'ARCHIVED');
  return notesData;
});

export const personalFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.[folders.findIndex((item) => item.parentFolderUuid === null && item.title === 'PERSONAL_FOLDER')]?.id;
});

export const personalArchivedFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.find((item) => !item.parentFolderUuid && item.title === 'ARCHIVED_FOLDER')?.id;
});

export const teamArchivedFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.find((item) => !item.parentFolderUuid && item.title === 'TEAM_ARCHIVED_FOLDER')?.id;
});

export const teamFolderUuidSelector = createSelector(notesSelector, (notes: any) => {
  const { folders } = notes;
  if (!folders.length) return;
  return folders?.[folders.findIndex((item) => item.parentFolderUuid === null && item.title === 'TEAM_FOLDER')]?.id;
});

export const notesFolderColleagueDataSelector = (colleagueUuid, isUserArchived) =>
  createSelector(notesSelector, (notes: any) => {
    const { folders } = notes;

    const notesData = notes.notes.filter((item) =>
      !isUserArchived ? item.status === 'CREATED' : item.status === 'ARCHIVED',
    );

    const personalFolderUuid =
      folders?.[
        folders.findIndex((item) =>
          item.parentFolderUuid === null && !isUserArchived
            ? item.title === 'PERSONAL_FOLDER'
            : item.title === 'ARCHIVED_FOLDER',
        )
      ]?.id;

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
      function caller(this: any) {
        return this.notes.length;
      }
      const lengthNotes = caller.call(obj);
      obj.quantity = lengthNotes;
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

    const notesData = notes.notes.filter((item) =>
      !teamArchivedMode
        ? item.status === 'CREATED' && item.referenceColleagueUuid
        : item.status === 'ARCHIVED' && item.referenceColleagueUuid,
    );

    const teamFolderUuid =
      folders?.[
        folders.findIndex((item) =>
          item.parentFolderUuid === null && !teamArchivedMode
            ? item.title === 'TEAM_FOLDER'
            : item.title === 'TEAM_ARCHIVED_FOLDER',
        )
      ]?.id;

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
      function caller(this: any) {
        return this.notes.length;
      }
      const lengthNotes = caller.call(obj);
      obj.quantity = lengthNotes;
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
