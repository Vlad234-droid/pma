import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getFoldersSelector,
  getNotesSelector,
  notesFolderColleagueDataSelector,
  notesFolderTeamDataSelector,
} from '@pma/store';

import { role, usePermission } from 'features/Permission';
import Spinner from 'components/Spinner';
import { NotesComposition } from './components';

import { useNotesContainer } from './contexts';
import { prepareData, isActiveSearchBar } from './utils';
import { useUploadData } from './hooks/useUploadData';

export enum ModalStatuses {
  ADD_NEW = 'ADD_NEW',
  PENDING = 'PENDING',
  PERSONAL_NOTE = 'PERSONAL_NOTE',
  PERSONAL_FOLDER = 'PERSONAL_FOLDER',
  TEAM_NOTE = 'TEAM_NOTE',
  TEAM_FOLDER = 'TEAM_FOLDER',
  INFO = 'INFO',
}

const NotesActions: FC<{ loading: boolean }> = ({ loading }) => {
  const [status, setStatus] = useState(ModalStatuses.PENDING);

  const isLineManager = usePermission([role.LINE_MANAGER]);

  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useUploadData();

  const {
    setSelectedFolder,
    foldersWithNotes,
    setFoldersWithNotes,
    setSelectedTEAMFolder,
    foldersWithNotesTEAM,
    setFoldersWithNotesTEAM,
    searchValueFilterOption,
    archiveMode,
    setArchiveMode,
  } = useNotesContainer();

  const folders = useSelector(getFoldersSelector) || null;
  const notesSelect = useSelector(getNotesSelector) || null;
  const notesFolderColleagueData = useSelector(notesFolderColleagueDataSelector(colleagueUuid, archiveMode.user)) || [];
  const notesFolderTeamData = useSelector(notesFolderTeamDataSelector(colleagueUuid, archiveMode.team)) || [];

  useEffect(() => {
    prepareData(folders, notesSelect, setFoldersWithNotes, notesFolderColleagueData);
  }, [folders, notesSelect, archiveMode.user]);

  useEffect(() => {
    isActiveSearchBar(
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
    );
  }, [searchValueFilterOption]);

  useEffect(() => {
    if (isLineManager && folders !== null && notesSelect !== null) {
      setFoldersWithNotesTEAM(() => notesFolderTeamData);
    }
  }, [folders, notesSelect, archiveMode.team]);

  if (loading) {
    return <Spinner fullHeight />;
  }

  return <NotesComposition setStatus={setStatus} status={status} />;
};

export default NotesActions;
