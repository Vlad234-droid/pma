import React, { FC, MutableRefObject, useRef, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useDispatch, useSelector } from 'react-redux';

import {
  colleagueUUIDSelector,
  getFoldersSelector,
  getNotesSelector,
  NotesActions,
  personalArchivedFolderUuidSelector,
  teamArchivedFolderUuidSelector,
} from '@pma/store';

import { ConfirmModal, ConfirmModalWithDropDown } from 'features/Modal';
import { useTranslation } from 'components/Translation';
import { PersonalFolders, PersonalsTeamFolders, SelectedFolder, SelectedTEAMFolder } from '../../index';
import { MainFolderProps } from '../../../type';
import { folderSchema } from '../../../components/Modals/schema/schema';

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

export const SELECTED_FOLDER = 'selected-folder';
export const FOLDER_WRAPPER = 'main-folder-wrapper';

const MainFolders: FC<MainFolderProps> = ({
  setSelectedFolder,
  selectedFolder,
  TEAM,
  selectedTEAMFolder,
  setSelectedTEAMFolder,
  foldersWithNotes,
  setFoldersWithNotes,
  setSelectedNoteToEdit,
  foldersWithNotesTEAM,
  setFoldersWithNotesTEAM,
  setSelectedTEAMNoteToEdit,
  setIsUserArchived,
  isUserArchived,
  setTeamArchivedMode,
  teamArchivedMode,
}) => {
  const { css, matchMedia } = useStyle();
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const notesSelect = useSelector(getNotesSelector) || null;
  const folders = useSelector(getFoldersSelector) || null;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const personalArchivedFolderUuid = useSelector(personalArchivedFolderUuidSelector) || null;
  const teamArchivedFolderUuid = useSelector(teamArchivedFolderUuidSelector) || null;

  const [confirmModal, setConfirmModal] = useState(false);
  const selectedFolderId: MutableRefObject<null | string> = useRef(null);
  const selectedNoteId: MutableRefObject<null | string> = useRef(null);
  const noteFolderUuid: MutableRefObject<null | string> = useRef(null);
  const actionModal: MutableRefObject<null | 'delete' | 'archive' | 'move'> = useRef(null);

  //TEAM
  const [confirmTEAMModal, setConfirmTEAMModal] = useState(false);
  const selectedTEAMFolderId: MutableRefObject<null | string> = useRef(null);
  const selectedTEAMNoteId: MutableRefObject<null | string> = useRef(null);
  const noteTEAMFolderUuid: MutableRefObject<null | string> = useRef(null);
  const actionTEAMModal: MutableRefObject<null | 'delete' | 'archive' | 'move'> = useRef(null);

  const handleSelected = (itemID: string): any => {
    setSelectedFolder(() => {
      const [first] = foldersWithNotes.filter((note) => note.id === itemID);
      first.notes.forEach((item) => {
        item.selected = false;
      });
      return first;
    });
    setFoldersWithNotes((prev) => {
      const arr = [...prev];
      arr.forEach((item) => (item.selected = false));
      return [...arr];
    });

    setFoldersWithNotes((prev) => {
      const arr = [...prev];
      arr[arr.findIndex((folder) => folder.id === itemID)].selected = true;
      return [...arr];
    });
  };
  const handleTEAMSelected = (itemID: string): any => {
    setSelectedTEAMFolder(() => {
      const [first] = foldersWithNotesTEAM.filter((note) => note.id === itemID);

      first.notes.length &&
        first.notes.forEach((item) => {
          item.selected = false;
        });
      return first;
    });
    setFoldersWithNotesTEAM((prev) => {
      const arr = [...prev];
      arr.forEach((item) => (item.selected = false));
      return [...arr];
    });

    setFoldersWithNotesTEAM((prev) => {
      const arr = [...prev];
      arr[arr.findIndex((folder) => folder.id === itemID)].selected = true;
      return [...arr];
    });
  };

  const handleDelete = () => {
    if (selectedNoteId.current && !selectedFolderId.current && actionModal.current !== 'move') {
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: selectedNoteId.current,
        }),
      );
      setSelectedFolder((prev) => {
        return {
          ...prev,
          notes: prev.notes.filter((item) => item.id !== selectedNoteId.current),
        };
      });
    }

    if (selectedFolderId.current && !selectedNoteId.current && actionModal.current !== 'move') {
      if (selectedFolder !== null) setSelectedFolder(() => null);
      dispatch(
        NotesActions.deleteFolder({
          ownerColleagueUuid: colleagueUuid,
          folderId: selectedFolderId.current,
        }),
      );
    }
  };

  const handleUpdateNote = () => {
    if (selectedFolderId.current && !selectedNoteId.current) {
      const findedFolder = folders?.find((item) => item.id === selectedFolderId.current);
      const findedNotes = notesSelect.filter((item) => item.folderUuid === findedFolder.id);
      const payload = {
        folder: {
          ...findedFolder,
          parentFolderUuid: personalArchivedFolderUuid,
        },
        notes: [
          ...findedNotes.map((note) => {
            const itemNote = {
              ...note,
              status: 'ARCHIVED',
            };
            return itemNote;
          }),
        ],
      };

      dispatch(NotesActions.updateFolder(payload));
      setSelectedFolder(() => null);
      return;
    }

    const payload = {
      ...notesSelect?.find((item) => item?.id === selectedNoteId?.current),
      status: 'ARCHIVED',
    };

    if (!payload.folderUuid) {
      setSelectedFolder((prev) => {
        const arr = { ...prev };
        return {
          ...arr,
          notes: arr.notes.filter((item) => item.id !== selectedNoteId.current),
        };
      });
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
          status: 'ARCHIVED',
          updateTime: new Date(),
        },
      };
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: selectedNoteId.current,
        }),
      );
      dispatch(NotesActions.createFolderAndNote(body));
      setSelectedFolder((prev) => {
        const arr = { ...prev };
        return {
          ...arr,
          notes: arr.notes.filter((item) => item.id !== selectedNoteId.current),
        };
      });
    }
  };

  const handleUpdateTEAMNote = () => {
    if (selectedTEAMFolderId.current && !selectedTEAMNoteId.current) {
      const findedFolder = folders?.find((item) => item.id === selectedTEAMFolderId.current);
      const findedNotes = notesSelect.filter((item) => item.folderUuid === findedFolder.id);
      const payload = {
        folder: {
          ...findedFolder,
          parentFolderUuid: teamArchivedFolderUuid,
        },
        notes: [
          ...findedNotes.map((note) => {
            const itemNote = {
              ...note,
              status: 'ARCHIVED',
            };
            return itemNote;
          }),
        ],
      };

      dispatch(NotesActions.updateFolder(payload));
      setSelectedTEAMFolder(() => null);
      setSelectedFolder(() => null);
      return;
    }

    const payload = {
      ...notesSelect.find((item) => item.id === selectedTEAMNoteId.current),
      status: 'ARCHIVED',
    };

    // TODO: Extract duplicate 19
    if (!payload.folderUuid) {
      if (selectedTEAMFolder)
        setSelectedTEAMFolder((prev) => {
          const arr = { ...prev };
          return {
            ...arr,
            notes: arr.notes.filter((item) => item.id !== selectedTEAMNoteId.current),
          };
        });
      if (selectedFolder)
        setSelectedFolder((prev) => {
          const arr = { ...prev };
          return {
            ...arr,
            notes: arr.notes.filter((item) => item.id !== selectedTEAMNoteId.current),
          };
        });
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
          status: 'ARCHIVED',
          updateTime: new Date(),
        },
      };
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: selectedTEAMNoteId.current,
        }),
      );
      dispatch(NotesActions.createFolderAndNote(body));
      // TODO: Extract duplicate 19
      if (selectedTEAMFolder)
        setSelectedTEAMFolder((prev) => {
          const arr = { ...prev };
          return {
            ...arr,
            notes: arr.notes.filter((item) => item.id !== selectedTEAMNoteId.current),
          };
        });
      if (selectedFolder)
        setSelectedFolder((prev) => {
          const arr = { ...prev };
          return {
            ...arr,
            notes: arr.notes.filter((item) => item.id !== selectedTEAMNoteId.current),
          };
        });
    }
  };

  const handleTEAMDelete = () => {
    if (selectedTEAMNoteId.current && !selectedTEAMFolderId.current && actionTEAMModal.current !== 'move') {
      dispatch(
        NotesActions.deleteNote({
          ownerColleagueUuid: colleagueUuid,
          noteId: selectedTEAMNoteId.current,
        }),
      );
      if (selectedTEAMFolder !== null) {
        setSelectedTEAMFolder((prev) => {
          return {
            ...prev,
            notes: prev.notes.filter((item) => item.id !== selectedTEAMNoteId.current),
          };
        });
      }

      if (selectedFolder !== null) {
        setSelectedFolder((prev) => {
          return {
            ...prev,
            notes: prev.notes.filter((item) => item.id !== selectedTEAMNoteId.current),
          };
        });
      }

      return;
    }

    if (selectedTEAMFolderId.current && !selectedTEAMNoteId.current && actionTEAMModal.current !== 'move') {
      if (selectedTEAMFolder !== null) setSelectedTEAMFolder(() => null);
      dispatch(
        NotesActions.deleteFolder({
          ownerColleagueUuid: colleagueUuid,
          folderId: selectedTEAMFolderId.current,
        }),
      );
    }
  };

  const submitMoveNoteToFolder = ({ selectedIdFolder }) => {
    const payload = {
      ...notesSelect.find((item) => item.id === selectedNoteId.current),
      folderUuid: selectedIdFolder === AllNotesFolderId ? null : selectedIdFolder,
    };
    dispatch(NotesActions.updateNote(payload));
    if (selectedTEAMFolder !== null) {
      setSelectedTEAMFolder((prev) => {
        const obj = {
          ...prev,
          notes: [
            ...prev.notes.map((item) => {
              const note = {
                ...item,
                selected: false,
              };
              return note;
            }),
          ],
        };
        return obj;
      });
    }

    if (selectedFolder && !foldersWithNotes.find((item) => item.id === AllNotesFolderId).selected) {
      setSelectedFolder((prev) => {
        return {
          ...prev,
          notes: prev.notes.filter((item) => item.id !== selectedNoteId.current),
        };
      });
    }
    setSelectedFolder((prev) => {
      const obj = {
        ...prev,
        notes: [
          ...prev.notes.map((item) => {
            const note = {
              ...item,
              selected: false,
            };
            return note;
          }),
        ],
      };
      return obj;
    });
  };
  const submitMoveNoteToTEAMFolder = ({ selectedIdFolder }) => {
    const payload = {
      ...notesSelect.find((item) => item.id === selectedTEAMNoteId.current),
      folderUuid: selectedIdFolder === AllNotesFolderIdTEAM ? null : selectedIdFolder,
    };
    dispatch(NotesActions.updateNote(payload));
    if (selectedFolder !== null) {
      setSelectedTEAMFolder((prev) => {
        const obj = {
          ...prev,
          notes: [
            ...prev.notes.map((item) => {
              const note = {
                ...item,
                selected: false,
              };
              return note;
            }),
          ],
        };
        return obj;
      });
    }

    if (selectedTEAMFolder && !foldersWithNotesTEAM.find((item) => item.id === AllNotesFolderIdTEAM).selected) {
      setSelectedTEAMFolder((prev) => {
        return {
          ...prev,
          notes: prev.notes.filter((item) => item.id !== selectedTEAMNoteId.current),
        };
      });
    }
    setSelectedTEAMFolder((prev) => {
      const obj = {
        ...prev,
        notes: [
          ...prev.notes.map((item) => {
            const note = {
              ...item,
              selected: false,
            };
            return note;
          }),
        ],
      };
      return obj;
    });
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
            setSelectedTEAMFolder={setSelectedTEAMFolder}
            selectedTEAMFolder={selectedTEAMFolder}
            setFoldersWithNotesTEAM={setFoldersWithNotesTEAM}
            actionModal={actionModal}
            selectedFolderId={selectedFolderId}
            foldersWithNotes={foldersWithNotes}
            setFoldersWithNotes={setFoldersWithNotes}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            selectedNoteId={selectedNoteId}
            setIsUserArchived={setIsUserArchived}
            isUserArchived={isUserArchived}
          />

          {mediumScreen && selectedFolder !== null && (
            <SelectedFolder
              selectedFolder={selectedFolder}
              setConfirmModal={setConfirmModal}
              selectedNoteId={selectedNoteId}
              actionModal={actionModal}
              setSelectedFolder={setSelectedFolder}
              foldersWithNotes={foldersWithNotes}
              setFoldersWithNotes={setFoldersWithNotes}
              selectedFolderId={selectedFolderId}
              noteFolderUuid={noteFolderUuid}
              setSelectedNoteToEdit={setSelectedNoteToEdit}
              setSelectedTEAMNoteToEdit={setSelectedTEAMNoteToEdit}
              selectedTEAMNoteId={selectedTEAMNoteId}
              actionTEAMModal={actionTEAMModal}
              setConfirmTEAMModal={setConfirmTEAMModal}
              noteTEAMFolderUuid={noteTEAMFolderUuid}
              testId={SELECTED_FOLDER}
            />
          )}

          {TEAM && (
            <PersonalsTeamFolders
              handleTEAMSelected={handleTEAMSelected}
              setConfirmTEAMModal={setConfirmTEAMModal}
              selectedTEAMFolderId={selectedTEAMFolderId}
              setSelectedFolder={setSelectedFolder}
              selectedFolder={selectedFolder}
              foldersWithNotesTEAM={foldersWithNotesTEAM}
              selectedTEAMNoteId={selectedTEAMNoteId}
              setFoldersWithNotesTEAM={setFoldersWithNotesTEAM}
              setFoldersWithNotes={setFoldersWithNotes}
              actionTEAMModal={actionTEAMModal}
              setTeamArchivedMode={setTeamArchivedMode}
              teamArchivedMode={teamArchivedMode}
              setSelectedTEAMFolder={setSelectedTEAMFolder}
            />
          )}
          {mediumScreen && selectedTEAMFolder !== null && (
            <SelectedTEAMFolder
              selectedTEAMFolder={selectedTEAMFolder}
              setConfirmTEAMModal={setConfirmTEAMModal}
              selectedTEAMNoteId={selectedTEAMNoteId}
              actionTEAMModal={actionTEAMModal}
              setSelectedTEAMFolder={setSelectedTEAMFolder}
              setSelectedTEAMNoteToEdit={setSelectedTEAMNoteToEdit}
              noteTEAMFolderUuid={noteTEAMFolderUuid}
              selectedTEAMFolderId={selectedTEAMFolderId}
              foldersWithNotesTEAM={foldersWithNotesTEAM}
              setFoldersWithNotesTEAM={setFoldersWithNotesTEAM}
              teamArchivedMode={teamArchivedMode}
            />
          )}
        </div>
        <div className={css(wrapperFolder, { height: '100%' })}>
          {!mediumScreen && selectedFolder !== null && (
            <SelectedFolder
              selectedFolder={selectedFolder}
              setConfirmModal={setConfirmModal}
              selectedNoteId={selectedNoteId}
              actionModal={actionModal}
              setSelectedFolder={setSelectedFolder}
              foldersWithNotes={foldersWithNotes}
              setFoldersWithNotes={setFoldersWithNotes}
              selectedFolderId={selectedFolderId}
              noteFolderUuid={noteFolderUuid}
              setSelectedNoteToEdit={setSelectedNoteToEdit}
              setSelectedTEAMNoteToEdit={setSelectedTEAMNoteToEdit}
              selectedTEAMNoteId={selectedTEAMNoteId}
              actionTEAMModal={actionTEAMModal}
              setConfirmTEAMModal={setConfirmTEAMModal}
              noteTEAMFolderUuid={noteTEAMFolderUuid}
              isUserArchived={isUserArchived}
              testId={SELECTED_FOLDER}
            />
          )}

          {!mediumScreen && selectedTEAMFolder !== null && (
            <SelectedTEAMFolder
              selectedTEAMFolder={selectedTEAMFolder}
              setConfirmTEAMModal={setConfirmTEAMModal}
              selectedTEAMNoteId={selectedTEAMNoteId}
              actionTEAMModal={actionTEAMModal}
              setSelectedTEAMFolder={setSelectedTEAMFolder}
              setSelectedTEAMNoteToEdit={setSelectedTEAMNoteToEdit}
              noteTEAMFolderUuid={noteTEAMFolderUuid}
              selectedTEAMFolderId={selectedTEAMFolderId}
              foldersWithNotesTEAM={foldersWithNotesTEAM}
              setFoldersWithNotesTEAM={setFoldersWithNotesTEAM}
              teamArchivedMode={teamArchivedMode}
            />
          )}
        </div>
      </div>
      {confirmModal &&
        (actionModal.current !== 'move' ? (
          <ConfirmModal
            submitBtnTitle={defineBtnTitle(actionModal.current, t)}
            title={getPropperInfoData(actionModal, selectedNoteId, selectedFolderId, t)!.title}
            description={getPropperInfoData(actionModal, selectedNoteId, selectedFolderId, t)!.description}
            onSave={() => {
              actionModal.current === 'delete' ? handleDelete() : handleUpdateNote();
              confirmClearRefsHandler(selectedNoteId, actionModal, selectedFolderId, setConfirmModal);
            }}
            onCancel={() => {
              confirmClearRefsHandler(selectedNoteId, actionModal, selectedFolderId, setConfirmModal);
            }}
            onOverlayClick={() => {
              confirmClearRefsHandler(selectedNoteId, actionModal, selectedFolderId, setConfirmModal);
            }}
          />
        ) : (
          <ConfirmModalWithDropDown
            submitBtnTitle={defineBtnTitle(actionModal.current, t)}
            title={getPropperInfoData(actionModal, selectedNoteId, selectedFolderId, t)!.title}
            description={getPropperInfoData(actionModal, selectedNoteId, selectedFolderId, t)!.description}
            onSave={(data) => {
              submitMoveNoteToFolder(data);
              clearRefsMoveHandler(noteFolderUuid, selectedNoteId, actionModal, selectedFolderId, setConfirmModal);
            }}
            onCancel={() => {
              clearRefsMoveHandler(noteFolderUuid, selectedNoteId, actionModal, selectedFolderId, setConfirmModal);
            }}
            onOverlayClick={() => {
              clearRefsMoveHandler(noteFolderUuid, selectedNoteId, actionModal, selectedFolderId, setConfirmModal);
            }}
            folderSchema={folderSchema}
            fieldName='folder'
            field_options={definePropperFieldOptions(foldersWithNotes, noteFolderUuid.current)}
            field_placeholder='Select a folder'
          />
        ))}
      {confirmTEAMModal &&
        (actionTEAMModal.current !== 'move' ? (
          <ConfirmModal
            submitBtnTitle={defineBtnTitle(actionTEAMModal.current, t)}
            title={getPropperInfoData(actionTEAMModal, selectedTEAMNoteId, selectedTEAMFolderId, t)!.title}
            description={getPropperInfoData(actionTEAMModal, selectedTEAMNoteId, selectedTEAMFolderId, t)!.description}
            onSave={() => {
              actionTEAMModal.current === 'delete' ? handleTEAMDelete() : handleUpdateTEAMNote();
              confirmClearTEAMRefsHandler(
                selectedTEAMNoteId,
                actionTEAMModal,
                selectedTEAMFolderId,
                setConfirmTEAMModal,
                noteTEAMFolderUuid,
              );
            }}
            onCancel={() => {
              confirmClearTEAMRefsHandler(
                selectedTEAMNoteId,
                actionTEAMModal,
                selectedTEAMFolderId,
                setConfirmTEAMModal,
                noteTEAMFolderUuid,
              );
            }}
            onOverlayClick={() => {
              confirmClearTEAMRefsHandler(
                selectedTEAMNoteId,
                actionTEAMModal,
                selectedTEAMFolderId,
                setConfirmTEAMModal,
                noteTEAMFolderUuid,
              );
            }}
          />
        ) : (
          <ConfirmModalWithDropDown
            submitBtnTitle={defineBtnTitle(actionTEAMModal.current, t)}
            title={getPropperInfoData(actionTEAMModal, selectedTEAMNoteId, selectedTEAMFolderId, t)!.title}
            description={getPropperInfoData(actionTEAMModal, selectedTEAMNoteId, selectedTEAMFolderId, t)!.description}
            onSave={(data) => {
              submitMoveNoteToTEAMFolder(data);
              clearRefsTEAMMoveHandler(
                noteTEAMFolderUuid,
                selectedTEAMNoteId,
                actionTEAMModal,
                selectedTEAMFolderId,
                setConfirmTEAMModal,
              );
            }}
            onCancel={() => {
              clearRefsTEAMMoveHandler(
                noteTEAMFolderUuid,
                selectedTEAMNoteId,
                actionTEAMModal,
                selectedTEAMFolderId,
                setConfirmTEAMModal,
              );
            }}
            onOverlayClick={() => {
              clearRefsTEAMMoveHandler(
                noteTEAMFolderUuid,
                selectedTEAMNoteId,
                actionTEAMModal,
                selectedTEAMFolderId,
                setConfirmTEAMModal,
              );
            }}
            folderSchema={folderSchema}
            fieldName='folder'
            field_options={definePropperFieldTeamOptions(foldersWithNotesTEAM, noteTEAMFolderUuid.current)}
            field_placeholder='Select a folder'
          />
        ))}
    </div>
  );
};

const wrapperFolder: Rule = () => {
  return {
    display: 'flex',
    justifyContent: 'space-beetween',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  };
};

export default MainFolders;
