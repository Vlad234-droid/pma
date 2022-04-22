import React, { FC, useEffect, useState } from 'react';
import { IconButton as BackButton, Rule, useStyle } from '@pma/dex-wrapper';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColleaguesActions,
  colleagueUUIDSelector,
  getFoldersSelector,
  getNotesSelector,
  NotesActions as NotesActionsToDispatch,
  notesFolderColleagueDataSelector,
  notesFolderTeamDataSelector,
  personalFolderUuidSelector,
  teamFolderUuidSelector,
} from '@pma/store';

import { role, usePermission } from 'features/Permission';
import Spinner from 'components/Spinner';
import { AddNoteModal, AddTeamNoteModal, FilterOptions, InfoModal, MainFolders } from './components';
import { IconButton } from 'components/IconButton';
import { EditSelectedNote } from './components/Modals/EditSelectedNote';
import { schemaFolder, schemaNotes, schemaNoteToEdit, schemaTEAMNotes } from './components/Modals/schema/schema';
import { Trans, useTranslation } from 'components/Translation';
import { ConfirmModalWithSelectOptions } from 'features/Modal';
import WrapperModal from 'features/Modal/components/WrapperModal';
import { ModalWrapper } from 'components/ModalWrapper';

import { FoldersWithNotesTypes, FoldersWithNotesTypesTEAM, NoteData, NotesType, NotesTypeTEAM } from './type';
import { addNewFolderId, AllNotesFolderId, AllNotesFolderIdTEAM, filterNotesHandler } from 'utils';
import { PeopleTypes } from './components/TeamNotes/ModalsParts/type';

export const NOTES_WRAPPER = 'note-wrapper';
export const ADD_NEW = 'add-new';
export const CONFIRM_MODAL_ID = 'confirm-modal';
export const WRAPPER = 'wrapper';

export enum ModalStatuses {
  ADD_NEW = 'ADD_NEW',
  PENDING = 'PENDING',
  PERSONAL_NOTE = 'PERSONAL_NOTE',
  PERSONAL_FOLDER = 'PERSONAL_FOLDER',
  TEAM_NOTE = 'TEAM_NOTE',
  TEAM_FOLDER = 'TEAM_FOLDER',
  INFO = 'INFO',
}

const NotesActions: FC<{ loaded: boolean }> = ({ loaded }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const [status, setStatus] = useState(ModalStatuses.PENDING);
  const { t } = useTranslation();

  const isLineManager = usePermission([role.LINE_MANAGER]);

  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [isUserArchived, setIsUserArchived] = useState<boolean>(false);
  const [teamArchivedMode, setTeamArchivedMode] = useState<boolean>(false);

  const notesFolderColleagueData = useSelector(notesFolderColleagueDataSelector(colleagueUuid, isUserArchived)) || [];
  const notesFolderTeamData = useSelector(notesFolderTeamDataSelector(colleagueUuid, teamArchivedMode)) || [];

  useEffect(() => {
    if (colleagueUuid) dispatch(NotesActionsToDispatch.getFoldersNotes({ ownerId: colleagueUuid }));
  }, [colleagueUuid]);

  useEffect(() => {
    return () => {
      dispatch(ColleaguesActions.clearColleagueList());
    };
  }, []);

  const folders = useSelector(getFoldersSelector) || null;
  const notesSelect = useSelector(getNotesSelector) || null;
  const personalFolderUuid = useSelector(personalFolderUuidSelector) || null;
  const teamFolderUuid = useSelector(teamFolderUuidSelector) || null;

  const [selectedFolder, setSelectedFolder] = useState<NoteData | null>(null);

  const [foldersWithNotes, setFoldersWithNotes] = useState<Array<FoldersWithNotesTypes> | []>([]);

  const [selectedNoteToEdit, setSelectedNoteToEdit] = useState<NotesType | null>(null);

  const [selectedTEAMFolder, setSelectedTEAMFolder] = useState<NoteData | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const [foldersWithNotesTEAM, setFoldersWithNotesTEAM] = useState<Array<FoldersWithNotesTypesTEAM> | []>([]);
  const [selectedTEAMNoteToEdit, setSelectedTEAMNoteToEdit] = useState<NotesTypeTEAM | null>(null);

  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);

  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');

  useEffect(() => {
    if (folders !== null && notesSelect !== null) {
      setFoldersWithNotes(() => notesFolderColleagueData);
    }
  }, [folders, notesSelect, isUserArchived]);

  useEffect(() => {
    if (searchValueFilterOption.length > 2) {
      if (isUserArchived) setIsUserArchived(() => false);
      if (teamArchivedMode) setTeamArchivedMode(() => false);
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
  }, [searchValueFilterOption]);

  useEffect(() => {
    if (isLineManager && folders !== null && notesSelect !== null) {
      setFoldersWithNotesTEAM(() => notesFolderTeamData);
    }
  }, [folders, notesSelect, teamArchivedMode]);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(status !== ModalStatuses.PERSONAL_FOLDER ? schemaNotes : schemaFolder),
  });

  const teamMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(status !== ModalStatuses.TEAM_FOLDER ? schemaTEAMNotes : schemaFolder),
  });

  const noteToEditMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schemaNoteToEdit),
  });

  const { reset: resetTeam, handleSubmit: handleTEAMSubmit } = teamMethods;
  const { handleSubmit: handleSubmitSelectedEditedNote, reset: resetNoteToEdit } = noteToEditMethods;
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values) => {
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
          status: 'CREATED',
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
          status: 'CREATED',
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
          status: 'CREATED',
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
          status: 'CREATED',
          updateTime: new Date(),
        },
      };
      dispatch(NotesActionsToDispatch.createFolderAndNote(body));
    }
  };

  const onTEAMSubmit = async (values) => {
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
          status: 'CREATED',
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
          status: 'CREATED',
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
          status: 'CREATED',
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
          status: 'CREATED',
          updateTime: new Date(),
        },
      };
      dispatch(NotesActionsToDispatch.createFolderAndNote(body));
    }
  };

  const onSubmitSelectedEditedNote = async (data) => {
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

  const cancelSelectedNoteModal = () => {
    if (selectedNoteToEdit !== null) setSelectedNoteToEdit(() => null);
    if (selectedTEAMNoteToEdit !== null) setSelectedTEAMNoteToEdit(() => null);
    resetNoteToEdit();
    setSelectedFolder(() => null);
  };

  const onSubmitTEAMSelectedEditedNote = async (data) => {
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

  const cancelTEAMSelectedNoteModal = () => {
    setSelectedTEAMNoteToEdit(() => null);
    setSelectedFolder(() => null);
  };

  const cancelTEAMModal = () => {
    setSelectedPerson(() => null);
    dispatch(ColleaguesActions.clearColleagueList());
    setStatus(() => ModalStatuses.PENDING);
    resetTeam();
  };

  const cancelModal = () => {
    setStatus(() => ModalStatuses.PENDING);
    reset();
  };

  if (!loaded) {
    return <Spinner fullHeight />;
  }

  if (status === ModalStatuses.INFO) {
    return (
      <ModalWrapper isOpen={status === ModalStatuses.INFO}>
        <WrapperModal title={t('notes', 'Notes')} onClose={() => setStatus(() => ModalStatuses.PENDING)}>
          <InfoModal
            closeInfoModal={() => {
              setStatus(() => ModalStatuses.PENDING);
            }}
            TEAM={isLineManager}
          />
        </WrapperModal>
      </ModalWrapper>
    );
  }

  if (status === ModalStatuses.PERSONAL_NOTE || status === ModalStatuses.PERSONAL_FOLDER) {
    return (
      <WrapperModal
        onClose={cancelModal}
        title={
          status === ModalStatuses.PERSONAL_FOLDER ? t('add_a_folder', 'Add a folder') : t('add_a_note', 'Add a note')
        }
      >
        <AddNoteModal
          methods={methods}
          cancelModal={cancelModal}
          submitForm={handleSubmit(onSubmit)}
          createFolder={status === ModalStatuses.PERSONAL_FOLDER}
          foldersWithNotes={foldersWithNotes}
        />
      </WrapperModal>
    );
  }
  if (status === ModalStatuses.TEAM_NOTE || status === ModalStatuses.TEAM_FOLDER) {
    return (
      <WrapperModal
        onClose={cancelTEAMModal}
        title={
          status === ModalStatuses.TEAM_FOLDER
            ? t('add_team_folder', 'Add team folder')
            : t('add_a_team_note', 'Add a team note')
        }
      >
        <AddTeamNoteModal
          teamMethods={teamMethods}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          foldersWithNotesTEAM={foldersWithNotesTEAM}
          cancelTEAMModal={cancelTEAMModal}
          handleTEAMSubmit={handleTEAMSubmit(onTEAMSubmit)}
          createFolder={status === ModalStatuses.TEAM_FOLDER}
        />
      </WrapperModal>
    );
  }

  if (selectedTEAMNoteToEdit) {
    return (
      <WrapperModal title={t('my_notes', 'My notes')} onClose={cancelSelectedNoteModal}>
        <EditSelectedNote
          methods={noteToEditMethods}
          cancelSelectedNoteModal={cancelTEAMSelectedNoteModal}
          submitForm={handleSubmitSelectedEditedNote(onSubmitTEAMSelectedEditedNote)}
          setSelectedNoteToEdit={setSelectedTEAMNoteToEdit}
          foldersWithNotes={foldersWithNotesTEAM}
          selectedNoteToEdit={selectedTEAMNoteToEdit}
          setSelectedFolder={setSelectedTEAMFolder}
          definePropperEditMode={selectedNoteToEdit}
          setSelectedFolderDynamic={setSelectedFolder}
        />
      </WrapperModal>
    );
  }

  if (selectedNoteToEdit) {
    return (
      <WrapperModal title={t('edit_note', 'Edit note')} onClose={cancelSelectedNoteModal}>
        <EditSelectedNote
          methods={noteToEditMethods}
          cancelSelectedNoteModal={cancelSelectedNoteModal}
          submitForm={handleSubmitSelectedEditedNote(onSubmitSelectedEditedNote)}
          setSelectedNoteToEdit={setSelectedNoteToEdit}
          foldersWithNotes={foldersWithNotes}
          selectedNoteToEdit={selectedNoteToEdit}
          setSelectedFolder={setSelectedFolder}
          definePropperEditMode={selectedNoteToEdit}
          setSelectedFolderDynamic={setSelectedFolder}
        />
      </WrapperModal>
    );
  }

  const confirmSelectOptionsHandler = () => {
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

  return (
    <div data-test-id={NOTES_WRAPPER}>
      {status === ModalStatuses.ADD_NEW && (
        <ConfirmModalWithSelectOptions
          options={confirmSelectOptionsHandler()}
          description={t('choose_options', 'Please choose one of the options:')}
          onOverlayClick={() => setStatus(() => ModalStatuses.PENDING)}
          title={t('add_new', 'Add new')}
          onSave={([checkedItem]) => {
            setSelectedFolder(() => null);
            setStatus(() => ModalStatuses[checkedItem]);
          }}
          onCancel={() => setStatus(() => ModalStatuses.PENDING)}
          testId={CONFIRM_MODAL_ID}
        />
      )}

      <div className={css({ paddingRight: '40px', position: 'relative' })}>
        <div className={css(wrapperHeaderStyle)}>
          <IconButton
            customVariantRules={{ default: iconBtnAddStyle }}
            onPress={() => setStatus(() => ModalStatuses.ADD_NEW)}
            graphic='add'
            iconProps={{ invertColors: true }}
            iconStyles={iconAddStyle}
            data-test-id={ADD_NEW}
          >
            <Trans i18nKey='add'>Add</Trans>
          </IconButton>
          <FilterOptions
            TEAM={isLineManager}
            searchValueFilterOption={searchValueFilterOption}
            setSearchValueFilterOption={setSearchValueFilterOption}
            openInfoModal={() => {
              setStatus(() => ModalStatuses.INFO);
            }}
          />
        </div>

        <MainFolders
          setSelectedFolder={setSelectedFolder}
          selectedFolder={selectedFolder}
          TEAM={isLineManager}
          selectedTEAMFolder={selectedTEAMFolder}
          setSelectedTEAMFolder={setSelectedTEAMFolder}
          foldersWithNotes={foldersWithNotes}
          setFoldersWithNotes={setFoldersWithNotes}
          setSelectedNoteToEdit={setSelectedNoteToEdit}
          foldersWithNotesTEAM={foldersWithNotesTEAM}
          setFoldersWithNotesTEAM={setFoldersWithNotesTEAM}
          setSelectedTEAMNoteToEdit={setSelectedTEAMNoteToEdit}
          setIsUserArchived={setIsUserArchived}
          isUserArchived={isUserArchived}
          teamArchivedMode={teamArchivedMode}
          setTeamArchivedMode={setTeamArchivedMode}
        />
      </div>
      <div className={css(arrowLeftStyle)}>
        <BackButton
          onPress={() => {
            if (isUserArchived || teamArchivedMode) {
              if (isUserArchived) setIsUserArchived(() => false);
              if (teamArchivedMode) setTeamArchivedMode(() => false);
              if (!selectedFolder) setSelectedFolder(() => null);
              if (selectedTEAMFolder) setSelectedTEAMFolder(() => null);
            } else {
              navigate(-1);
            }
          }}
          graphic='backwardLink'
        />
      </div>
    </div>
  );
};

const wrapperHeaderStyle: Rule = {
  marginLeft: '40px',
  marginTop: '17px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const iconBtnAddStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  padding: `${theme.spacing.s1_5} ${theme.spacing.s6}`,
  borderRadius: theme.spacing.s8,
  fontWeight: theme.font.weight.bold,
});

const iconAddStyle: Rule = {
  marginRight: '10px',
  marginTop: '2px',
};

const arrowLeftStyle: Rule = () => {
  return {
    position: 'fixed',
    top: '34px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    left: '16px',
  };
};

export default NotesActions;
