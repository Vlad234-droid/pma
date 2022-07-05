export const prepareData = (folders, notesSelect, setFoldersWithNotes, notesFolderColleagueData) => {
  if (folders !== null && notesSelect !== null) {
    setFoldersWithNotes(() => notesFolderColleagueData);
  }
};

export const actionsInitialState = {
  folderId: null,
  noteId: null,
  folderUuid: null,
};

export const getOptions = (isLineManager: boolean) => {
  return [
    { value: 'PERSONAL_NOTE_CREATE', label: 'Personal note' },
    { value: 'PERSONAL_NOTE_FOLDER_CREATE', label: 'Personal folder' },
    { value: 'TEAM_NOTE_CREATE', label: 'Team note' },
    { value: 'TEAM_NOTE_FOLDER_CREATE', label: 'Team folder' },
  ].slice(0, isLineManager ? 4 : 2);
};
