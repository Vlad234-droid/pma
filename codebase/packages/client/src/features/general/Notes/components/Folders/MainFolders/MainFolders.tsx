import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useDispatch, useSelector } from 'react-redux';

import {
  colleagueUUIDSelector,
  getFoldersSelector,
  getNotesSelector,
  NotesActions,
  notesFolderColleagueDataSelector,
  notesFolderTeamDataSelector,
  personalArchivedFolderUuidSelector,
  teamArchivedFolderUuidSelector,
} from '@pma/store';

import { useUploadData } from 'features/general/Notes/hooks/useUploadData';
import { ConfirmModal } from 'components/ConfirmModal';
import { ConfirmModalWithDropDown } from 'features/general/Modal';
import { useTranslation } from 'components/Translation';
import { PersonalFolders, PersonalsTeamFolders, SelectedFolder, SelectedTEAMFolder } from '../../index';
import { MainFolderProps, NotesStatus, folderSchema } from '../../../configs';
import { useNotesContainer } from '../../../contexts';

import {
  AllNotesFolderId,
  AllNotesFolderIdTEAM,
  clearRefsMoveHandler,
  clearRefsTEAMMoveHandler,
  confirmClearRefsHandler,
  confirmClearTEAMRefsHandler,
  defineBtnTitle,
  definePropperFieldOptions,
  definePropperFieldTeamOptions,
  getPropperInfoData,
} from 'utils/note';
import { actionsInitialState, disableFolder, isActiveSearchBar, prepareData, updateFolder } from '../../../utils';

export const SELECTED_FOLDER = 'selected-folder';
export const FOLDER_WRAPPER = 'main-folder-wrapper';

const MainFolders: FC<MainFolderProps> = ({ isLineManager, searchValue }) => {
  const { css, matchMedia } = useStyle();
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useUploadData();

  const {
    selectedFolder,
    setSelectedFolder,
    selectedTEAMFolder,
    setSelectedTEAMFolder,
    foldersWithNotes,
    setFoldersWithNotes,
    foldersWithNotesTEAM,
    setFoldersWithNotesTEAM,
    archiveMode,
    setArchiveMode,
  } = useNotesContainer();

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const folders = useSelector(getFoldersSelector) || null;
  const notesSelect = useSelector(getNotesSelector) || null;
  const notesFolderColleagueData = useSelector(notesFolderColleagueDataSelector(colleagueUuid, archiveMode.user)) || [];
  const notesFolderTeamData = useSelector(notesFolderTeamDataSelector(colleagueUuid, archiveMode.team)) || [];

  useEffect(() => {
    if (isLineManager && folders !== null && notesSelect !== null) {
      setFoldersWithNotesTEAM(() => notesFolderTeamData);
    }
  }, [folders, notesSelect, archiveMode.team]);

  useEffect(() => {
    prepareData(folders, notesSelect, setFoldersWithNotes, notesFolderColleagueData);
  }, [folders, notesSelect, archiveMode.user]);

  useEffect(() => {
    isActiveSearchBar(
      searchValue,
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
  }, [searchValue]);

  const personalArchivedFolderUuid = useSelector(personalArchivedFolderUuidSelector) || null;
  const teamArchivedFolderUuid = useSelector(teamArchivedFolderUuidSelector) || null;

  const [confirmModal, setConfirmModal] = useState(false);
  const actionModal: MutableRefObject<null | 'delete' | 'archive' | 'move'> = useRef(null);

  const userActions = useRef(actionsInitialState);

  const [confirmTEAMModal, setConfirmTEAMModal] = useState(false);
  const actionTEAMModal: MutableRefObject<null | 'delete' | 'archive' | 'move'> = useRef(null);

  const teamActions = useRef(actionsInitialState);

  const handleSelected = (itemID: string): void => {
    setFoldersWithNotesTEAM((prev) => {
      const arr = [...prev];
      arr.forEach((item) => (item.selected = false));
      return [...arr];
    });
    setSelectedFolder(() => foldersWithNotes.filter((note) => note.id === itemID)[0]);
    setFoldersWithNotes((prev) => {
      const arr = [...prev];
      arr.forEach((item) => (item.selected = false));
      return [...arr];
    });
    setFoldersWithNotes((prev) => {
      const arr = [...prev];
      arr.find((folder) => folder.id === itemID).selected = true;
      return [...arr];
    });
  };
  const handleTEAMSelected = (itemID: string): void => {
    setFoldersWithNotes((prev) => {
      const arr = [...prev];
      arr.forEach((item) => (item.selected = false));
      return [...arr];
    });
    setSelectedTEAMFolder(() => foldersWithNotesTEAM.filter((note) => note.id === itemID)[0]);
    setFoldersWithNotesTEAM((prev) => {
      const arr = [...prev];
      arr.forEach((item) => (item.selected = false));
      return [...arr];
    });
    setFoldersWithNotesTEAM((prev) => {
      const arr = [...prev];
      arr.find((folder) => folder.id === itemID).selected = true;
      return [...arr];
    });
  };

  const handleDelete = () => {
    if (userActions.current.noteId && !userActions.current.folderId && actionModal.current !== 'move') {
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: userActions.current.noteId,
        }),
      );
      setSelectedFolder((prev) => updateFolder(prev, userActions.current.noteId));
    }

    if (userActions.current.folderId && !userActions.current.noteId && actionModal.current !== 'move') {
      if (selectedFolder !== null) setSelectedFolder(() => null);
      dispatch(
        NotesActions.deleteFolder({
          ownerColleagueUuid: colleagueUuid,
          folderId: userActions.current.folderId,
        }),
      );
    }
  };

  const handleUpdateNote = () => {
    if (userActions.current.folderId && !userActions.current.noteId) {
      const findedFolder = folders?.find((item) => item.id === userActions.current.folderId);
      const findedNotes = notesSelect.filter((item) => item.folderUuid === findedFolder.id);
      const payload = {
        folder: {
          ...findedFolder,
          parentFolderUuid: personalArchivedFolderUuid,
        },
        notes: [
          ...findedNotes.map((note) => {
            return {
              ...note,
              status: NotesStatus.ARCHIVED,
            };
          }),
        ],
      };

      dispatch(NotesActions.updateFolder(payload));
      setSelectedFolder(() => null);
      return;
    }

    const payload = {
      ...notesSelect?.find((item) => item?.id === userActions.current.noteId),
      status: NotesStatus.ARCHIVED,
    };

    if (!payload.folderUuid) {
      setSelectedFolder((prev) => updateFolder(prev, userActions.current.noteId));
      dispatch(NotesActions.updateNote(payload));
    }
    if (payload.folderUuid) {
      const { title: folderTitle } = folders?.find((item) => item.id === payload.folderUuid);
      const body = {
        folder: {
          ownerColleagueUuid: colleagueUuid,
          title: folderTitle,
          parentFolderUuid: !payload.referenceColleagueUuid ? personalArchivedFolderUuid : teamArchivedFolderUuid,
        },
        note: {
          ...(payload.referenceColleagueUuid && {
            referenceColleagueUuid: payload.referenceColleagueUuid,
          }),
          ownerColleagueUuid: colleagueUuid,
          title: payload.title,
          content: payload.content,
          status: NotesStatus.ARCHIVED,
          updateTime: new Date(),
        },
      };
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: userActions.current.noteId,
        }),
      );
      dispatch(NotesActions.createFolderAndNote(body));
      setSelectedFolder((prev) => updateFolder(prev, userActions.current.noteId));
    }
  };

  const handleUpdateTEAMNote = () => {
    if (teamActions.current.folderId && !teamActions.current.noteId) {
      const findedFolder = folders?.find((item) => item.id === teamActions.current.folderId);
      const findedNotes = notesSelect.filter((item) => item.folderUuid === findedFolder.id);
      const payload = {
        folder: {
          ...findedFolder,
          parentFolderUuid: teamArchivedFolderUuid,
        },
        notes: [
          ...findedNotes.map((note) => {
            return {
              ...note,
              status: NotesStatus.ARCHIVED,
            };
          }),
        ],
      };

      dispatch(NotesActions.updateFolder(payload));
      setSelectedTEAMFolder(() => null);
      setSelectedFolder(() => null);
      return;
    }

    const payload = {
      ...notesSelect.find((item) => item.id === teamActions.current.noteId),
      status: NotesStatus.ARCHIVED,
    };

    if (!payload.folderUuid) {
      if (selectedTEAMFolder) setSelectedTEAMFolder((prev) => updateFolder(prev, teamActions.current.noteId));
      if (selectedFolder) setSelectedFolder((prev) => updateFolder(prev, teamActions.current.noteId));
      dispatch(NotesActions.updateNote(payload));
    }
    if (payload.folderUuid) {
      const { title } = folders?.find((item) => item.id === payload.folderUuid);
      const body = {
        folder: {
          ownerColleagueUuid: colleagueUuid,
          title,
          parentFolderUuid: teamArchivedFolderUuid,
        },
        note: {
          referenceColleagueUuid: payload.referenceColleagueUuid,
          ownerColleagueUuid: colleagueUuid,
          title: payload.title,
          content: payload.content,
          status: NotesStatus.ARCHIVED,
          updateTime: new Date(),
        },
      };
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: teamActions.current.noteId,
        }),
      );
      dispatch(NotesActions.createFolderAndNote(body));
      if (selectedTEAMFolder) setSelectedTEAMFolder((prev) => updateFolder(prev, teamActions.current.noteId));
      if (selectedFolder) setSelectedFolder((prev) => updateFolder(prev, teamActions.current.noteId));
    }
  };

  const handleTEAMDelete = () => {
    if (teamActions.current.noteId && !teamActions.current.folderId && actionTEAMModal.current !== 'move') {
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: teamActions.current.noteId,
        }),
      );
      if (selectedTEAMFolder !== null) {
        setSelectedTEAMFolder((prev) => updateFolder(prev, teamActions.current.noteId));
      }

      if (selectedFolder !== null) {
        setSelectedFolder((prev) => updateFolder(prev, teamActions.current.noteId));
      }

      return;
    }

    if (teamActions.current.folderId && !teamActions.current.noteId && actionTEAMModal.current !== 'move') {
      if (selectedTEAMFolder !== null) setSelectedTEAMFolder(() => null);
      dispatch(
        NotesActions.deleteFolder({
          ownerColleagueUuid: colleagueUuid,
          folderId: teamActions.current.folderId,
        }),
      );
    }
  };

  const submitMoveNoteToFolder = ({ selectedIdFolder }) => {
    const payload = {
      ...notesSelect.find((item) => item.id === userActions.current.noteId),
      folderUuid: selectedIdFolder === AllNotesFolderId ? null : selectedIdFolder,
    };

    dispatch(NotesActions.updateNote(payload));
    if (selectedTEAMFolder !== null) {
      setSelectedTEAMFolder((prev) => disableFolder(prev));
    }

    if (selectedFolder && !foldersWithNotes.find((item) => item?.id === AllNotesFolderId)?.selected) {
      setSelectedFolder((prev) => updateFolder(prev, userActions.current.noteId));
    }
    setSelectedFolder((prev) => disableFolder(prev));
  };
  const submitMoveNoteToTEAMFolder = ({ selectedIdFolder }) => {
    const payload = {
      ...notesSelect.find((item) => item.id === teamActions.current.noteId),
      folderUuid: selectedIdFolder === AllNotesFolderIdTEAM ? null : selectedIdFolder,
    };
    dispatch(NotesActions.updateNote(payload));

    if (selectedFolder !== null) {
      setSelectedTEAMFolder((prev) => disableFolder(prev));
      setSelectedFolder((prev) => disableFolder(prev));
    }

    if (selectedTEAMFolder && !foldersWithNotesTEAM?.find((item) => item?.id === AllNotesFolderIdTEAM)?.selected) {
      setSelectedTEAMFolder((prev) => updateFolder(prev, teamActions.current.noteId));
    }

    setSelectedTEAMFolder((prev) => disableFolder(prev));
  };

  return (
    <div
      className={css({ marginTop: '24px', marginLeft: '40px', marginBottom: '140px' })}
      data-test-id={FOLDER_WRAPPER}
    >
      <div
        className={css({
          ...(!mediumScreen && {
            display: 'flex',
            gap: '8px',
          }),
        })}
      >
        <div className={css(wrapperFolder, { height: '100%' })}>
          <PersonalFolders
            handleSelected={handleSelected}
            setConfirmModal={setConfirmModal}
            actionModal={actionModal}
            userActions={userActions.current}
          />
          {mediumScreen && selectedFolder && (
            <SelectedFolder
              setConfirmModal={setConfirmModal}
              actionModal={actionModal}
              actionTEAMModal={actionTEAMModal}
              setConfirmTEAMModal={setConfirmTEAMModal}
              testId={SELECTED_FOLDER}
              userActions={userActions.current}
              teamActions={teamActions.current}
            />
          )}
          {isLineManager && (
            <PersonalsTeamFolders
              handleTEAMSelected={handleTEAMSelected}
              setConfirmTEAMModal={setConfirmTEAMModal}
              actionTEAMModal={actionTEAMModal}
              teamsActions={teamActions.current}
            />
          )}
          {mediumScreen && selectedTEAMFolder && (
            <SelectedTEAMFolder
              setConfirmTEAMModal={setConfirmTEAMModal}
              actionTEAMModal={actionTEAMModal}
              teamActions={teamActions.current}
            />
          )}
        </div>
        <div className={css(wrapperFolder, { height: '100%' })}>
          {!mediumScreen && selectedFolder && (
            <SelectedFolder
              setConfirmModal={setConfirmModal}
              actionModal={actionModal}
              actionTEAMModal={actionTEAMModal}
              setConfirmTEAMModal={setConfirmTEAMModal}
              testId={SELECTED_FOLDER}
              userActions={userActions.current}
              teamActions={teamActions.current}
            />
          )}

          {!mediumScreen && selectedTEAMFolder && (
            <SelectedTEAMFolder
              setConfirmTEAMModal={setConfirmTEAMModal}
              actionTEAMModal={actionTEAMModal}
              teamActions={teamActions.current}
            />
          )}
        </div>
      </div>
      {confirmModal &&
        (actionModal.current !== 'move' ? (
          <ConfirmModal
            submitBtnTitle={defineBtnTitle(actionModal.current, t)}
            title={getPropperInfoData(actionModal, userActions.current, t)!.title}
            description={getPropperInfoData(actionModal, userActions.current, t)!.description}
            onSave={() => {
              actionModal.current === 'delete' ? handleDelete() : handleUpdateNote();
              confirmClearRefsHandler(actionModal, userActions, setConfirmModal);
            }}
            onCancel={() => {
              confirmClearRefsHandler(actionModal, userActions, setConfirmModal);
            }}
            onOverlayClick={() => {
              confirmClearRefsHandler(actionModal, userActions, setConfirmModal);
            }}
          />
        ) : (
          <ConfirmModalWithDropDown
            submitBtnTitle={defineBtnTitle(actionModal.current, t)}
            title={getPropperInfoData(actionModal, userActions.current, t)!.title}
            description={getPropperInfoData(actionModal, userActions.current, t)!.description}
            onSave={(data) => {
              submitMoveNoteToFolder(data);
              clearRefsMoveHandler(actionModal, userActions, setConfirmModal);
            }}
            onCancel={() => {
              clearRefsMoveHandler(actionModal, userActions, setConfirmModal);
            }}
            onOverlayClick={() => {
              clearRefsMoveHandler(actionModal, userActions, setConfirmModal);
            }}
            folderSchema={folderSchema}
            fieldName='folder'
            field_options={definePropperFieldOptions(foldersWithNotes, userActions.current.folderUuid)}
            field_placeholder='Select a folder'
          />
        ))}
      {confirmTEAMModal &&
        (actionTEAMModal.current !== 'move' ? (
          <ConfirmModal
            submitBtnTitle={defineBtnTitle(actionTEAMModal.current, t)}
            title={getPropperInfoData(actionTEAMModal, teamActions.current, t)!.title}
            description={getPropperInfoData(actionTEAMModal, teamActions.current, t)!.description}
            onSave={() => {
              actionTEAMModal.current === 'delete' ? handleTEAMDelete() : handleUpdateTEAMNote();
              confirmClearTEAMRefsHandler(actionTEAMModal, teamActions, setConfirmTEAMModal);
            }}
            onCancel={() => {
              confirmClearTEAMRefsHandler(actionTEAMModal, teamActions, setConfirmTEAMModal);
            }}
            onOverlayClick={() => {
              confirmClearTEAMRefsHandler(actionTEAMModal, teamActions, setConfirmTEAMModal);
            }}
          />
        ) : (
          <ConfirmModalWithDropDown
            submitBtnTitle={defineBtnTitle(actionTEAMModal.current, t)}
            title={getPropperInfoData(actionTEAMModal, teamActions.current, t)!.title}
            description={getPropperInfoData(actionTEAMModal, teamActions.current, t)!.description}
            onSave={(data) => {
              submitMoveNoteToTEAMFolder(data);
              clearRefsTEAMMoveHandler(actionTEAMModal, teamActions, setConfirmTEAMModal);
            }}
            onCancel={() => {
              clearRefsTEAMMoveHandler(actionTEAMModal, teamActions, setConfirmTEAMModal);
            }}
            onOverlayClick={() => {
              clearRefsTEAMMoveHandler(actionTEAMModal, teamActions, setConfirmTEAMModal);
            }}
            folderSchema={folderSchema}
            fieldName='folder'
            field_options={definePropperFieldTeamOptions(foldersWithNotesTEAM, teamActions.current.folderUuid)}
            field_placeholder='Select a folder'
          />
        ))}
    </div>
  );
};

const wrapperFolder: Rule = () => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  };
};

export default MainFolders;
