import React, { FC, Dispatch, SetStateAction } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColleaguesActions,
  colleagueUUIDSelector,
  getFoldersSelector,
  personalFolderUuidSelector,
  teamFolderUuidSelector,
} from '@pma/store';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { role, usePermission } from 'features/Permission';
import { Trans, useTranslation } from 'components/Translation';
import { InfoModal as InfoMessage } from '../../wrappers';
import { AddNoteModal, AddTeamNoteModal, FilterOptions, MainFolders } from '../../components';
import { IconButton } from 'components/IconButton';
import { ConfirmModalWithSelectOptions } from 'features/Modal';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';

import { useNotesContainer } from '../../contexts';
import { baseSubmit, getOptions, submitSelectedNote, submitTeamSelectedNote, teamSubmit } from '../../utils';
import { ModalStatuses } from '../../NotesActions';
import { schemaFolder, schemaNotes, schemaNoteToEdit, schemaTEAMNotes } from '../Modals/schema/schema';
import { Backward } from 'components/Backward';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import WrapperModal from '../../../Modal/components/WrapperModal';
import { EditSelectedNote } from '../Modals/EditSelectedNote';

export const NOTES_WRAPPER = 'note-wrapper';
export const ADD_NEW = 'add-new';
export const CONFIRM_MODAL_ID = 'confirm-modal';
export const WRAPPER = 'wrapper';

const NotesComposition: FC<{
  setStatus: Dispatch<SetStateAction<ModalStatuses>>;
  status: ModalStatuses;
}> = ({ setStatus, status }) => {
  const isLineManager = usePermission([role.LINE_MANAGER]);
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const dispatch = useDispatch();

  const personalFolderUuid = useSelector(personalFolderUuidSelector) || null;
  const teamFolderUuid = useSelector(teamFolderUuidSelector) || null;
  const folders = useSelector(getFoldersSelector) || null;

  const {
    selectedFolder,
    setSelectedFolder,
    foldersWithNotes,
    selectedNoteToEdit,
    selectedTEAMFolder,
    setSelectedTEAMFolder,
    selectedTEAMNoteToEdit,
    searchValueFilterOption,
    setSearchValueFilterOption,
    archiveMode,
    setArchiveMode,
    setSelectedTEAMNoteToEdit,
    selectedPerson,
    setSelectedPerson,
    setSelectedNoteToEdit,
    searchValue,
    setSearchValue,
    foldersWithNotesTEAM,
  } = useNotesContainer();

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(status !== ModalStatuses.PERSONAL_FOLDER ? schemaNotes : schemaFolder),
  });

  const teamMethods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(status !== ModalStatuses.TEAM_FOLDER ? schemaTEAMNotes : schemaFolder),
  });

  const noteToEditMethods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schemaNoteToEdit),
  });

  const { reset: resetTeam, handleSubmit: handleTEAMSubmit } = teamMethods;
  const { handleSubmit: handleSubmitSelectedEditedNote, reset: resetNoteToEdit } = noteToEditMethods;
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values) => {
    baseSubmit(dispatch, values, status, colleagueUuid, personalFolderUuid, folders);
  };

  const onTEAMSubmit = async (values) => {
    teamSubmit(dispatch, status, values, colleagueUuid, teamFolderUuid, selectedPerson, folders);
  };

  const onSubmitSelectedEditedNote = async (data) => {
    submitSelectedNote(dispatch, data, selectedNoteToEdit, setSelectedFolder);
  };

  const onSubmitTEAMSelectedEditedNote = async (data) => {
    submitTeamSelectedNote(dispatch, data, selectedTEAMNoteToEdit, setSelectedFolder);
  };

  const cancelTEAMSelectedNoteModal = () => {
    setSelectedTEAMNoteToEdit(() => null);
    setSelectedFolder(() => null);
  };

  const cancelSelectedNoteModal = () => {
    if (selectedNoteToEdit !== null) setSelectedNoteToEdit(() => null);
    if (selectedTEAMNoteToEdit !== null) setSelectedTEAMNoteToEdit(() => null);
    resetNoteToEdit();
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

  const handleClose = () => {
    if (archiveMode.user || archiveMode.team) {
      if (archiveMode.user) setArchiveMode((prev) => ({ ...prev, user: false }));
      if (archiveMode.team) setArchiveMode((prev) => ({ ...prev, team: false }));
      if (!selectedFolder) setSelectedFolder(() => null);
      if (selectedTEAMFolder) setSelectedTEAMFolder(() => null);
    } else {
      navigate(buildPath(Page.CONTRIBUTION));
    }
  };

  const modalByStatus = {
    [ModalStatuses.INFO]: <InfoMessage status={status} isLineManager={isLineManager} setStatus={setStatus} />,
    [ModalStatuses.PERSONAL_NOTE]: (
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
    ),
    [ModalStatuses.PERSONAL_FOLDER]: (
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
    ),
    [ModalStatuses.TEAM_NOTE]: (
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
    ),
    [ModalStatuses.TEAM_FOLDER]: (
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
    ),
  };

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

  const currentModal = modalByStatus[status];
  return (
    <>
      {currentModal ? (
        currentModal
      ) : (
        <div data-test-id={NOTES_WRAPPER}>
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
          {status === ModalStatuses.ADD_NEW && (
            <ConfirmModalWithSelectOptions
              options={getOptions(isLineManager)}
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
            <MainFolders isLineManager={isLineManager} />
          </div>
          <Backward onPress={handleClose} />
        </div>
      )}
    </>
  );
};

export default NotesComposition;

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
