export const AllNotesFolderId = '10000000-0000-0000-0000-10000000000';
export const AllNotesFolderIdTEAM = '10000000-0000-0000-0000-20000000000';

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
      .filter((item) => item.id !== AllNotesFolderId || item.id !== AllNotesFolderIdTEAM)
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
      .filter((item) => item.id !== AllNotesFolderId || item.id !== AllNotesFolderIdTEAM)
      .filter((item) => item.id !== noteFolderUuid)
      .map((item) => ({ value: `${item.id}`, label: item.title })),
  ];
};

export const getPropperInfoData = (actionModal, selectedNoteId, selectedFolder) => {
  if (actionModal.current === 'delete') {
    return {
      title: `Are you sure you want to delete this ${selectedNoteId.current ? 'note' : 'folder'}?`,
      description: `This is permanent and cannot be undone.`,
    };
  }
  if (actionModal.current === 'archive') {
    return {
      title: `Are you sure you want to archive this ${!selectedFolder.current ? 'note' : 'folder'}?`,
      description: `The ${!selectedFolder.current ? 'note' : 'folder'} will be moved to “Archive” section`,
    };
  }
  if (actionModal.current === 'move') {
    return {
      title: 'Select the folder where you want to move the note',
      description: 'The note will be moved to folder:',
    };
  }
};

export const getPropperTEAMInfoData = (actionTEAMModal, selectedTEAMNoteId, selectedTEAMFolderId) => {
  if (actionTEAMModal.current === 'delete') {
    return {
      title: `Are you sure you want to delete this ${selectedTEAMNoteId.current ? 'note' : 'folder'}?`,
      description: `This is permanent and cannot be undone.`,
    };
  }
  if (actionTEAMModal.current === 'archive') {
    return {
      title: `Are you sure you want to archive this ${!selectedTEAMFolderId.current ? 'note' : 'folder'}?`,
      description: `The ${!selectedTEAMFolderId.current ? 'note' : 'folder'} will be moved to “Archive” section`,
    };
  }
  if (actionTEAMModal.current === 'move') {
    return {
      title: 'Select the folder where you want to move the note',
      description: 'The note will be moved to folder:',
    };
  }
};

export const confirmClearRefsHandler = (selectedNoteId, actionModal, selectedFolderId, setConfirmModal) => {
  selectedNoteId.current = null;
  actionModal.current = null;
  selectedFolderId.current = null;
  setConfirmModal(() => false);
};

export const clearRefsMoveHandler = (
  noteFolderUuid,
  selectedNoteId,
  actionModal,
  selectedFolderId,
  setConfirmModal,
) => {
  noteFolderUuid.current = null;
  selectedNoteId.current = null;
  actionModal.current = null;
  selectedFolderId.current = null;
  setConfirmModal(() => false);
};

export const confirmClearTEAMRefsHandler = (
  selectedTEAMNoteId,
  actionTEAMModal,
  selectedTEAMFolderId,
  setConfirmTEAMModal,
  noteTEAMFolderUuid,
) => {
  selectedTEAMNoteId.current = null;
  actionTEAMModal.current = null;
  selectedTEAMFolderId.current = null;
  noteTEAMFolderUuid.current = null;
  setConfirmTEAMModal(() => false);
};

export const clearRefsTEAMMoveHandler = (
  noteTEAMFolderUuid,
  selectedTEAMNoteId,
  actionTEAMModal,
  selectedTEAMFolderId,
  setConfirmTEAMModal,
) => {
  noteTEAMFolderUuid.current = null;
  selectedTEAMNoteId.current = null;
  actionTEAMModal.current = null;
  selectedTEAMFolderId.current = null;
  setConfirmTEAMModal(() => false);
};

export const filterNotesByTitle = (notes, value) => {
  return notes.filter(({ title }) => {
    return title.toLowerCase().includes(value.toLowerCase());
  });
};

export const defineBtnTitle = (actionTEAMModal) => {
  const obg = {
    delete: 'Delete',
    archive: 'Save',
    move: 'Save',
  };

  return obg[actionTEAMModal];
};

export const filterNotesHandler = (
  setSelectedTEAMFolder,
  setSelectedFolder,
  foldersWithNotes,
  setFoldersWithNotes,
  foldersWithNotesTEAM,
  setFoldersWithNotesTEAM,
  notesSelect,
  searchValueFilterOption,
) => {
  setSelectedTEAMFolder(() => null);
  setSelectedFolder(() => null);
  if (foldersWithNotes !== null) {
    setFoldersWithNotes((prev) => {
      const arr = [...prev];
      arr.forEach((item) => {
        item.selected = false;
        item.selectedDots = false;
      });
      return arr;
    });
  }
  if (foldersWithNotesTEAM !== null) {
    setFoldersWithNotesTEAM((prev) => {
      const arr = [...prev];
      arr.forEach((item) => {
        item.selected = false;
        item.selectedDots = false;
      });
      return arr;
    });
  }
  const filteredNotes = filterNotesByTitle(notesSelect, searchValueFilterOption);

  const obj = {
    notes: filteredNotes,

    title: `${
      filteredNotes.length
        ? `Searching results for “${searchValueFilterOption}” ${filteredNotes.length && `(${filteredNotes.length})`}`
        : `No results`
    }`,
  };
  return obj;
};
