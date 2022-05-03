import { addNewFolderId, AllNotesFolderId, AllNotesFolderIdTEAM, filterNotesHandler } from 'utils/note';
import { NotesActions as NotesActionsToDispatch } from '@pma/store';
import { ModalStatuses } from '../NotesActions';
import { NotesStatus } from '../type';

export const prepareData = (folders, notesSelect, setFoldersWithNotes, notesFolderColleagueData) => {
  if (folders !== null && notesSelect !== null) {
    setFoldersWithNotes(() => notesFolderColleagueData);
  }
};

export const isActiveSearchBar = (
  searchValueFilterOption,
  archiveMode,
  setArchiveMode,
  setSelectedTEAMFolder,
  setSelectedFolder,
  foldersWithNotes,
  setFoldersWithNotes,
  foldersWithNotesTEAM,
  setFoldersWithNotesTEAM,
  notesSelect,
) => {
  if (searchValueFilterOption.length > 2) {
    if (archiveMode.user) setArchiveMode((prev) => ({ ...prev, user: false }));
    if (archiveMode.team) setArchiveMode((prev) => ({ ...prev, team: false }));
    const obj = filterNotesHandler(
      setSelectedTEAMFolder,
      setSelectedFolder,
      foldersWithNotes,
      setFoldersWithNotes,
      foldersWithNotesTEAM,
      setFoldersWithNotesTEAM,
      notesSelect,
      searchValueFilterOption,
    );

    setSelectedFolder(() => obj);
  }
};

export const baseSubmit = (dispatch, values, status, colleagueUuid, personalFolderUuid, folders) => {
  if (status === ModalStatuses.PERSONAL_FOLDER) {
    const { folderTitle } = values;
    dispatch(
      NotesActionsToDispatch.createFolderNotes({
        ownerColleagueUuid: colleagueUuid,
        title: folderTitle,
        parentFolderUuid: personalFolderUuid,
      }),
    );
    return;
  }

  if (!values.folder && values.noteTitle && values.noteText) {
    dispatch(
      NotesActionsToDispatch.createNote({
        ownerColleagueUuid: colleagueUuid,
        title: values.noteTitle,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
      }),
    );
    return;
  }

  if (
    values.folder !== addNewFolderId &&
    values.folder !== AllNotesFolderId &&
    folders.some((item) => item.id === values.folder)
  ) {
    const { ownerColleagueUuid, id } = folders.find((item) => item.id === values.folder);

    dispatch(
      NotesActionsToDispatch.createNote({
        ownerColleagueUuid: ownerColleagueUuid,
        title: values.noteTitle,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
        folderUuid: id,
      }),
    );
    return;
  }

  if (values.folder === AllNotesFolderId && values.noteTitle && values.noteText) {
    dispatch(
      NotesActionsToDispatch.createNote({
        ownerColleagueUuid: colleagueUuid,
        title: values.noteTitle,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
      }),
    );
    return;
  }

  if (values.folder === addNewFolderId && values.folderTitle) {
    const body = {
      folder: {
        ownerColleagueUuid: colleagueUuid,
        title: values.folderTitle,
        parentFolderUuid: personalFolderUuid,
      },
      note: {
        ownerColleagueUuid: colleagueUuid,
        title: values.noteTitle,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
      },
    };
    dispatch(NotesActionsToDispatch.createFolderAndNote(body));
  }
};

export const teamSubmit = <S extends string, C extends string, V extends Record<string, string>, T extends string>(
  dispatch,
  status: S,
  values: V,
  colleagueUuid: C,
  teamFolderUuid: T,
  selectedPerson,
  folders,
) => {
  if (status === ModalStatuses.TEAM_FOLDER) {
    const { folderTitle } = values;
    dispatch(
      NotesActionsToDispatch.createFolderNotes({
        ownerColleagueUuid: colleagueUuid,
        title: folderTitle,
        parentFolderUuid: teamFolderUuid,
      }),
    );
    return;
  }
  if (!values.folder && values.noteTitle && values.noteText) {
    dispatch(
      NotesActionsToDispatch.createNote({
        ownerColleagueUuid: colleagueUuid,
        referenceColleagueUuid: selectedPerson.colleagueUUID,
        title: values.noteTitle,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
      }),
    );
  }

  if (
    values.folder !== addNewFolderId &&
    values.folder !== AllNotesFolderIdTEAM &&
    folders.some((item) => item.id === values.folder)
  ) {
    const { ownerColleagueUuid, id } = folders[folders.findIndex((item) => item.id === values.folder)];

    dispatch(
      NotesActionsToDispatch.createNote({
        ownerColleagueUuid: ownerColleagueUuid,
        referenceColleagueUuid: selectedPerson.colleagueUUID,
        title: values.noteTitle,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
        folderUuid: id,
      }),
    );
  }

  if (values.folder === AllNotesFolderIdTEAM && values.noteTitle && values.noteText) {
    dispatch(
      NotesActionsToDispatch.createNote({
        ownerColleagueUuid: colleagueUuid,
        title: values.noteTitle,
        referenceColleagueUuid: selectedPerson.colleagueUUID,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
      }),
    );
  }

  if (values.folder === addNewFolderId && values.folderTitle) {
    const body = {
      folder: {
        ownerColleagueUuid: colleagueUuid,
        title: values.folderTitle,
        parentFolderUuid: teamFolderUuid,
      },
      note: {
        ownerColleagueUuid: colleagueUuid,
        referenceColleagueUuid: selectedPerson.colleagueUUID,
        title: values.noteTitle,
        content: values.noteText,
        status: NotesStatus.CREATED,
        updateTime: new Date(),
      },
    };
    dispatch(NotesActionsToDispatch.createFolderAndNote(body));
  }
};

export const submitSelectedNote = (dispatch, data, selectedNoteToEdit, setSelectedFolder) => {
  const { noteTitle, noteText, folder } = data;

  if (selectedNoteToEdit !== null) {
    const payload = {
      ...selectedNoteToEdit,
      title: noteTitle,
      content: noteText,
      ...(folder && {
        folderUuid: folder === AllNotesFolderId ? null : folder,
      }),
    };

    dispatch(NotesActionsToDispatch.updateNote(payload));
    setSelectedFolder(() => null);
  }
};

export const submitTeamSelectedNote = (dispatch, data, selectedTEAMNoteToEdit, setSelectedFolder) => {
  const { noteTitle, noteText, folder } = data;
  if (selectedTEAMNoteToEdit !== null) {
    const payload = {
      ...selectedTEAMNoteToEdit,
      title: noteTitle,
      content: noteText,
      ...(folder && {
        folderUuid: folder === AllNotesFolderIdTEAM ? null : folder,
      }),
    };

    dispatch(NotesActionsToDispatch.updateNote(payload));
    setSelectedFolder(() => null);
  }
};

export const getOptions = (isLineManager) => {
  if (!isLineManager)
    return [
      { value: 'PersonalNote', label: ModalStatuses.PERSONAL_NOTE },
      { value: 'PersonalFolder', label: ModalStatuses.PERSONAL_FOLDER },
    ];
  return [
    { value: 'PersonalNote', label: ModalStatuses.PERSONAL_NOTE },
    { value: 'PersonalFolder', label: ModalStatuses.PERSONAL_FOLDER },
    { value: 'TeamNote', label: ModalStatuses.TEAM_NOTE },
    { value: 'TeamFolder', label: ModalStatuses.TEAM_FOLDER },
  ];
};
