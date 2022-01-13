import React, { FC, useEffect, useState } from 'react';
import { FilterOptions, MainFolders } from './components';
import AddNoteModal, { AddTeamNoteModal, InfoModal } from './components/Modals';
import { Modal, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import {
  ChosesButtonType,
  FoldersWithNotesTypes,
  FoldersWithNotesTypesTEAM,
  NoteData,
  NotesType,
  NotesTypeTEAM,
} from './type';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IconButton } from 'components/IconButton';
import { Icon, Icon as IconComponent } from 'components/Icon';
import { EditSelectedNote } from './components/Modals/EditSelectedNote';
import { schemaFolder, schemaNotes, schemaNoteToEdit, schemaTEAMNotes } from './components/Modals/schema/schema';
import { useDispatch, useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getFoldersSelector,
  getNotesSelector,
  NotesActions as NotesActionsToDispatch,
  notesFolderColleagueDataSelector,
  notesFolderTeamDataSelector,
  personalFolderUuidSelector,
  teamFolderUuidSelector,
} from '@pma/store';
import { AllNotesFolderId, AllNotesFolderIdTEAM, filterNotesHandler } from '../../utils/note';
import { PeopleTypes } from './components/TeamNotes/ModalsParts/type';
import { useNavigate } from 'react-router-dom';

export const NOTES_WRAPPER = 'note_wrapper';
export const PLUS_BUTTON = 'plus_button';
export const MODAL_BUTTONS = 'modal_buttons';
export const PLUS_PERSONAL_NOTE = 'plus_personal_note';

const NotesActions: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [userArchivedMode, setUserArchivedMode] = useState<boolean>(false);
  const [teamArchivedMode, setTeamArchivedMode] = useState<boolean>(false);

  const notesFolderColleagueData = useSelector(notesFolderColleagueDataSelector(colleagueUuid, userArchivedMode)) || [];
  const notesFolderTeamData = useSelector(notesFolderTeamDataSelector(colleagueUuid, teamArchivedMode)) || [];

  useEffect(() => {
    if (colleagueUuid) dispatch(NotesActionsToDispatch.getFoldersNotes({ ownerId: colleagueUuid }));
  }, [colleagueUuid]);
  const folders = useSelector(getFoldersSelector) || null;

  const notesSelect = useSelector(getNotesSelector) || null;
  const personalFolderUuid = useSelector(personalFolderUuidSelector) || null;
  const teamFolderUuid = useSelector(teamFolderUuidSelector) || null;

  const [selectedFolder, setSelectedFolder] = useState<NoteData | null>(null);

  const [choseAdd, setChoseAdd] = useState<boolean>(false);
  const [foldersWithNotes, setFoldersWithNotes] = useState<Array<FoldersWithNotesTypes> | []>([]);

  const [selectedNoteToEdit, setSelectedNoteToEdit] = useState<NotesType | null>(null);
  const [successSelectedNoteToEdit, setSuccessSelectedNoteToEdit] = useState(false);

  //
  const [TEAM, setTEAM] = useState(true);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [personalNoteModal, setPersonalNoteModal] = useState<boolean>(false);
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  //TEAM
  const [successTEAMModal, setSuccessTEAMModal] = useState<boolean>(false);
  const [selectedTEAMFolder, setSelectedTEAMFolder] = useState<NoteData | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const [teamNoteModal, setTeamNoteModal] = useState<boolean>(false);
  const [foldersWithNotesTEAM, setFoldersWithNotesTEAM] = useState<Array<FoldersWithNotesTypesTEAM> | []>([]);
  const [selectedTEAMNoteToEdit, setSelectedTEAMNoteToEdit] = useState<NotesTypeTEAM | null>(null);

  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);
  // filter
  const [focus, setFocus] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const navigate = useNavigate();

  //info

  const [infoModal, setInfoModal] = useState(false);

  useEffect(() => {
    if (folders !== null && notesSelect !== null) {
      setFoldersWithNotes(() => notesFolderColleagueData);
    }
  }, [folders, notesSelect, userArchivedMode]);

  useEffect(() => {
    if (searchValueFilterOption.length > 2) {
      if (userArchivedMode) setUserArchivedMode(() => false);

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
    if (TEAM && folders !== null && notesSelect !== null) {
      setFoldersWithNotesTEAM(() => notesFolderTeamData);
    }
  }, [folders, notesSelect, teamArchivedMode]);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(!createFolder ? schemaNotes : schemaFolder),
  });

  const teamMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schemaTEAMNotes),
  });

  const noteToEditMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schemaNoteToEdit),
  });

  const { reset: resetTeam, handleSubmit: handleTEAMSubmit } = teamMethods;
  const { handleSubmit: handleSubmitSelectedEditedNote, reset: resetNoteToEdit } = noteToEditMethods;
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values) => {
    if (createFolder) {
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

    if (values.folder === '' && values.noteTitle !== '' && values.noteText !== '') {
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
      values.folder !== 'id_001' &&
      values.folder !== AllNotesFolderId &&
      folders.some((item) => item.id === values.folder)
    ) {
      const { ownerColleagueUuid, id } = folders[folders.findIndex((item) => item.id === values.folder)];
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

    if (values.folder === AllNotesFolderId && values.noteTitle !== '' && values.noteText !== '') {
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

    if (values.folder === 'id_001' && values.folderTitle !== '') {
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

  const onTEAMSubmit = (values) => {
    if (values.folder === '' && values.noteTitle !== '' && values.noteText !== '') {
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
      values.folder !== 'id_001' &&
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

    if (values.folder === AllNotesFolderIdTEAM && values.noteTitle !== '' && values.noteText !== '') {
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

    if (values.folder === 'id_001' && values.folderTitle !== '') {
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
    setSelectedPerson(() => null);
  };

  const onSubmitSelectedEditedNote = ({ noteTitle, noteText }) => {
    if (selectedNoteToEdit !== null) {
      const payload = {
        ...selectedNoteToEdit,
        title: noteTitle,
        content: noteText,
        folderUuid: selectedNoteToEdit.folderUuid === AllNotesFolderId ? null : selectedNoteToEdit.folderUuid,
      };

      dispatch(NotesActionsToDispatch.updateNote(payload));
      setSelectedFolder(() => null);
    }
  };

  const cancelSelectedNoteModal = () => {
    if (selectedNoteToEdit !== null) setSelectedNoteToEdit(() => null);
    if (selectedTEAMNoteToEdit !== null) setSelectedTEAMNoteToEdit(() => null);
    if (successSelectedNoteToEdit) setSuccessSelectedNoteToEdit(() => false);
    resetNoteToEdit();
  };

  const onSubmitTEAMSelectedEditedNote = ({ noteTitle, noteText }) => {
    if (selectedTEAMNoteToEdit !== null) {
      const payload = {
        ...selectedTEAMNoteToEdit,
        title: noteTitle,
        content: noteText,
        folderUuid:
          selectedTEAMNoteToEdit.folderUuid === AllNotesFolderIdTEAM ? null : selectedTEAMNoteToEdit.folderUuid,
      };

      dispatch(NotesActionsToDispatch.updateNote(payload));
      setSelectedFolder(() => null);
    }
  };

  const cancelTEAMSelectedNoteModal = () => {
    setSelectedTEAMNoteToEdit(() => null);
    if (successSelectedNoteToEdit) setSuccessSelectedNoteToEdit(() => false);
  };

  const cancelTEAMModal = () => {
    if (successTEAMModal) setSuccessTEAMModal(() => false);
    setTeamNoteModal(() => false);
    resetTeam();
  };

  const cancelModal = () => {
    if (successModal) setSuccessModal(() => false);
    setPersonalNoteModal(false);
    if (createFolder) setCreateFolder(() => false);
    reset();
  };

  const clickHandler = (e) => {
    if (e.target.id === 'chose_options') setChoseAdd(() => false);
  };

  const chosesButton: Array<ChosesButtonType> = [
    {
      id: '1',
      title: 'Add a personal note',
      show: true,
      button: (
        <IconButton
          graphic='add'
          iconStyles={{ height: '34px', width: '34px' }}
          customVariantRules={{
            default: iconBtnStyleSmall,
          }}
          data-test-id={PLUS_PERSONAL_NOTE}
          onPress={() => {
            setSelectedFolder(() => null);
            setChoseAdd(() => false);
            setPersonalNoteModal(() => true);
          }}
        />
      ),
    },
    {
      id: '2',
      title: 'Add a note',
      show: TEAM,
      button: (
        <IconButton
          graphic='add'
          iconStyles={{ height: '34px', width: '34px' }}
          customVariantRules={{
            default: iconBtnStyleSmall,
          }}
          onPress={() => {
            setSelectedFolder(() => null);
            setChoseAdd(() => false);
            setTeamNoteModal(() => true);
          }}
        />
      ),
    },
    {
      id: '3',
      title: 'Add a personal folder',
      show: true,
      button: (
        <IconButton
          graphic='add'
          iconStyles={{ height: '34px', width: '34px' }}
          customVariantRules={{
            default: iconBtnStyleSmall,
          }}
          onPress={() => {
            setCreateFolder(() => true);
            setSelectedFolder(() => null);
            setChoseAdd(() => false);
            setPersonalNoteModal(() => true);
          }}
        />
      ),
    },
  ];

  return (
    <div data-test-id={NOTES_WRAPPER}>
      {infoModal && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setInfoModal(() => false);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: 'Notes',
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            setInfoModal(() => false);
          }}
        >
          <InfoModal setInfoModal={setInfoModal} TEAM={TEAM} />
        </Modal>
      )}
      {personalNoteModal && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              if (successModal) setSuccessModal(() => false);
              setPersonalNoteModal(false);
              if (createFolder) setCreateFolder(() => false);
              reset();
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: createFolder ? 'Add a folder' : 'Add a note',
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            if (successModal) setSuccessModal(() => false);
            if (createFolder) setCreateFolder(() => false);
            setPersonalNoteModal(false);
            reset();
          }}
        >
          <AddNoteModal
            methods={methods}
            cancelModal={cancelModal}
            submitForm={handleSubmit(onSubmit)}
            setPersonalNoteModal={setPersonalNoteModal}
            setSuccessModal={setSuccessModal}
            successModal={successModal}
            createFolder={createFolder}
            setCreateFolder={setCreateFolder}
            foldersWithNotes={foldersWithNotes}
          />
        </Modal>
      )}
      {selectedTEAMNoteToEdit && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setSelectedTEAMNoteToEdit(() => null);
              resetNoteToEdit();
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: 'My notes',
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            setSelectedTEAMNoteToEdit(() => null);
            resetNoteToEdit();
          }}
        >
          <EditSelectedNote
            successSelectedNoteToEdit={successSelectedNoteToEdit}
            setSuccessSelectedNoteToEdit={setSuccessSelectedNoteToEdit}
            methods={noteToEditMethods}
            cancelSelectedNoteModal={cancelTEAMSelectedNoteModal}
            // TODO: check the logic
            submitForm={onSubmitTEAMSelectedEditedNote}
            setSelectedNoteToEdit={setSelectedTEAMNoteToEdit}
            foldersWithNotes={foldersWithNotesTEAM}
            selectedNoteToEdit={selectedTEAMNoteToEdit}
            setSelectedFolder={setSelectedTEAMFolder}
            definePropperEditMode={selectedNoteToEdit}
            setSelectedFolderDynamic={setSelectedFolder}
          />
        </Modal>
      )}
      {teamNoteModal && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setSelectedPerson(() => null);
              if (successTEAMModal) setSuccessTEAMModal(() => false);
              setTeamNoteModal(() => false);
              resetTeam();
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: 'Add a team note',
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            setSelectedPerson(() => null);
            if (successTEAMModal) setSuccessTEAMModal(() => false);
            setTeamNoteModal(() => false);
            resetTeam();
          }}
        >
          <AddTeamNoteModal
            teamMethods={teamMethods}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setTeamNoteModal={setTeamNoteModal}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
            foldersWithNotesTEAM={foldersWithNotesTEAM}
            cancelTEAMModal={cancelTEAMModal}
            setSuccessTEAMModal={setSuccessTEAMModal}
            handleTEAMSubmit={handleTEAMSubmit(onTEAMSubmit)}
            successTEAMModal={successTEAMModal}
          />
        </Modal>
      )}
      {selectedNoteToEdit !== null && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setSelectedNoteToEdit(() => null);
              resetNoteToEdit();
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: 'Edit note',
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            setSelectedNoteToEdit(() => null);
            resetNoteToEdit();
          }}
        >
          <EditSelectedNote
            successSelectedNoteToEdit={successSelectedNoteToEdit}
            setSuccessSelectedNoteToEdit={setSuccessSelectedNoteToEdit}
            methods={noteToEditMethods}
            cancelSelectedNoteModal={cancelSelectedNoteModal}
            // TODO: check the logic
            submitForm={onSubmitSelectedEditedNote}
            setSelectedNoteToEdit={setSelectedNoteToEdit}
            foldersWithNotes={foldersWithNotes}
            selectedNoteToEdit={selectedNoteToEdit}
            setSelectedFolder={setSelectedFolder}
            definePropperEditMode={selectedNoteToEdit}
            setSelectedFolderDynamic={setSelectedFolder}
          />
        </Modal>
      )}
      <div className={css({ paddingRight: '40px', position: 'relative' })}>
        <FilterOptions
          TEAM={TEAM}
          focus={focus}
          setFocus={setFocus}
          searchValueFilterOption={searchValueFilterOption}
          setSearchValueFilterOption={setSearchValueFilterOption}
          setInfoModal={setInfoModal}
        />
        <MainFolders
          setSelectedFolder={setSelectedFolder}
          selectedFolder={selectedFolder}
          TEAM={TEAM}
          selectedTEAMFolder={selectedTEAMFolder}
          setSelectedTEAMFolder={setSelectedTEAMFolder}
          foldersWithNotes={foldersWithNotes}
          setFoldersWithNotes={setFoldersWithNotes}
          setSelectedNoteToEdit={setSelectedNoteToEdit}
          foldersWithNotesTEAM={foldersWithNotesTEAM}
          setFoldersWithNotesTEAM={setFoldersWithNotesTEAM}
          setSelectedTEAMNoteToEdit={setSelectedTEAMNoteToEdit}
          setUserArchivedMode={setUserArchivedMode}
          userArchivedMode={userArchivedMode}
          teamArchivedMode={teamArchivedMode}
          setTeamArchivedMode={setTeamArchivedMode}
        />

        {!choseAdd ? (
          <div className={css(buttonPosiitionStyle)}>
            <IconButton
              iconStyles={{ height: '74px', width: '74px' }}
              graphic='add'
              customVariantRules={{
                default: iconBtnStyle,
              }}
              data-test-id={PLUS_BUTTON}
              onPress={() => {
                setChoseAdd(() => true);
                if (foldersWithNotes.length) {
                  setFoldersWithNotes((prev) => {
                    const arr = [...prev];
                    arr.forEach((item) => (item.selectedDots = false));
                    return arr;
                  });
                }
                if (selectedFolder !== null && selectedFolder.notes.length) {
                  setSelectedFolder((prev) => {
                    const arr = { ...prev };
                    arr.notes.forEach((item) => (item.selected = false));
                    return arr;
                  });
                }
              }}
            />
          </div>
        ) : (
          <div
            className={css(choseOptionsStyle)}
            id='chose_options'
            onClick={clickHandler}
            data-test-id={MODAL_BUTTONS}
          >
            <div className={`${css(choseContainerStyle)}`} id='container_'>
              <div className={css({ width: '72%' })}>
                {chosesButton.map((item) => {
                  return (
                    item.show && (
                      <div key={item.id} className={css(chosedContainerStyle)}>
                        <>
                          <span className={css(titleStyle)}>{item.title}</span>
                          {item.button}
                        </>
                      </div>
                    )
                  );
                })}
              </div>
              <div>
                <IconButton
                  graphic='cancel'
                  customVariantRules={{
                    default: iconBtnStyleCancel,
                  }}
                  onPress={() => setChoseAdd(() => false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <span
        className={css(arrowLeftStyle)}
        onClick={() => {
          if (userArchivedMode || teamArchivedMode) {
            if (userArchivedMode) setUserArchivedMode(() => false);
            if (teamArchivedMode) setTeamArchivedMode(() => false);
            if (!selectedFolder) setSelectedFolder(() => null);
            if (selectedTEAMFolder) setSelectedTEAMFolder(() => null);
          } else {
            navigate(-1);
          }
        }}
      >
        <IconComponent graphic='arrowLeft' invertColors={false} />
      </span>
    </div>
  );
};

const arrowLeftStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const buttonPosiitionStyle: Rule = {
  position: 'fixed',
  bottom: '50px',
  right: '40px',
};

const iconBtnStyle: Rule = {
  padding: '0',
  height: '64px',
  width: '64px',
  outline: 0,
  cursor: 'pointer',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > svg': {
    width: '64px',
    height: '64px',
  },
} as Styles;

const iconBtnStyleCancel: Rule = {
  padding: '0',
  height: '64px',
  width: '64px',
  outline: 0,
  cursor: 'pointer',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #00539F',
  alignSelf: 'flex-end',
  '& > span': {
    '& > svg': {
      marginTop: '4px',
    },
  },
} as Styles;

const iconBtnStyleSmall: Rule = {
  padding: '0',
  height: '34px',
  width: '34px',
  outline: 0,
  cursor: 'pointer',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > svg': {
    width: '34px',
    height: '34px',
  },
} as Styles;

const choseOptionsStyle: Rule = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  right: '0px',
  height: '100%',
  background: 'rgba(24,76,148,0.7)',
} as Styles;

const choseContainerStyle: Rule = {
  width: '400px',
  position: 'fixed',
  bottom: '0px',
  right: '0px',
  background: 'rgba(255,255,255,1)',
  borderRadius: '16px',
  padding: '46px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const chosedContainerStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '28px',
  ':last-child': {
    marginBottom: '0px',
  },
} as Styles;
const titleStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
  whiteSpace: 'nowrap',
};

//

const containerRule: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0px 97px' }
      : { borderRadius: '32px', padding: `40px 0px 112px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: mobileScreen ? 0 : '30px',
    cursor: 'default',
    overflow: 'auto',
  };
};

const modalCloseOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const modalTitleOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    ...(mobileScreen
      ? {
          fontSize: '20px',
          lineHeight: '24px',
        }
      : {
          fontSize: '24px',
          lineHeight: '28px',
        }),
  };
};

export default NotesActions;
