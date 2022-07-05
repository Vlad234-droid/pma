export const AllNotesFolderId = '10000000-0000-0000-0000-10000000000';
export const AllNotesFolderIdTEAM = '10000000-0000-0000-0000-20000000000';
export const NEW_FOLDER_ID = 'id_001';

export const defineNotesHandler = (notesLength) => {
  if (!notesLength) {
    return '';
  }
  if (notesLength === 1) {
    return `${notesLength} note`;
  }
  if (notesLength > 1) {
    return `${notesLength} notes`;
  }
};

export const definePropperFieldOptions = (foldersWithNotes, noteFolderUuid) => {
  if (noteFolderUuid !== null) {
    return [
      ...foldersWithNotes
        .filter((item) => item.id !== noteFolderUuid)
        .map((item) => ({ value: `${item.id}`, label: item.title })),
    ];
  }
  return [
    ...foldersWithNotes
      .filter((item) => item.id !== AllNotesFolderId && item.id !== AllNotesFolderIdTEAM)
      .filter((item) => item.id !== noteFolderUuid)
      .map((item) => ({ value: `${item.id}`, label: item.title })),
  ];
};
export const definePropperFieldTeamOptions = (foldersWithNotes, noteFolderUuid) => {
  if (noteFolderUuid !== null) {
    return [
      ...foldersWithNotes
        .filter((item) => item.id !== noteFolderUuid)
        .map((item) => ({ value: `${item.id}`, label: item.title })),
    ];
  }
  return [
    ...foldersWithNotes
      .filter((item) => item.id !== AllNotesFolderId && item.id !== AllNotesFolderIdTEAM)
      .filter((item) => item.id !== noteFolderUuid)
      .map((item) => ({ value: `${item.id}`, label: item.title })),
  ];
};

export const getPropperInfoData = (actionModal, actionItems, t) => {
  if (actionModal.current === 'delete') {
    const option = actionItems.notedId ? 'note' : 'folder';
    return {
      title: t('delete_folder_note', `Are you sure you want to delete this ${option}?`, { option }),
      description: t('this_is_permanent_and_cannot_be_undone', 'This is permanent and cannot be undone.'),
    };
  }
  if (actionModal.current === 'archive') {
    const option = !actionItems.folderId ? 'note' : 'folder';
    return {
      title: t('archive_folder_note', `Are you sure you want to archive this ${option} ?`, { option }),
      description: t('moved_to_archive_section', `The ${option} will be moved to “Archive” section`, { option }),
    };
  }
  if (actionModal.current === 'move') {
    return {
      title: t(
        'select_the_folder_where_you_want_to_move_the_note',
        'Select the folder where you want to move the note',
      ),
      description: t('the_note_will_be_moved_to_folder', 'The note will be moved to folder:'),
    };
  }
};

export const updateRef = (ref) => {
  ref.folderId = null;
  ref.noteId = null;
  ref.folderUuid = null;
};

export const confirmClearRefsHandler = (actionModal, actionItems, setConfirmModal) => {
  updateRef(actionItems.current);
  actionModal.current = null;
  setConfirmModal(() => false);
};

export const clearRefsMoveHandler = (actionModal, actionItems, setConfirmModal) => {
  updateRef(actionItems.current);
  actionModal.current = null;
  setConfirmModal(() => false);
};

export const confirmClearTEAMRefsHandler = (actionTEAMModal, actionItems, setConfirmTEAMModal) => {
  updateRef(actionItems.current);
  actionTEAMModal.current = null;
  setConfirmTEAMModal(() => false);
};

export const clearRefsTEAMMoveHandler = (actionTEAMModal, actionItems, setConfirmTEAMModal) => {
  updateRef(actionItems.current);
  actionTEAMModal.current = null;
  setConfirmTEAMModal(() => false);
};

export const filterNotesByTitle = (notes, value) => {
  return notes.filter(({ title }) => {
    return title.toLowerCase().includes(value.toLowerCase());
  });
};

export const defineBtnTitle = (actionTEAMModal, t) => {
  const obg = {
    delete: t('delete', 'Delete'),
    archive: t('archive', 'Archive'),
    move: t('save', 'Save'),
  };

  return obg[actionTEAMModal];
};

export const filterNotesHandler = (notesSelect, searchValue) => {
  const filteredNotes = filterNotesByTitle(notesSelect, searchValue);

  return {
    isInSearch: true,
    notes: filteredNotes,
    title: `${
      filteredNotes.length
        ? `Searching results for “${searchValue}” ${filteredNotes.length && `(${filteredNotes.length})`}`
        : `No results`
    }`,
  };
};

export const getNotesFolderTitle = (folderUuid: string, foldersList: Array<any>) =>
  foldersList.find((item) => item.id === folderUuid)
    ? foldersList.find((item) => item.id === folderUuid).title
    : 'All notes' ?? '';
