import React, { FC, useCallback, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  teamFolderUuidSelector,
  NotesActions,
  personalNoteByUUIDSelector,
  getNotesMetaSelector,
  getFoldersSelector,
} from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import SuccessNotesModal from 'components/SuccessNotesModal';
import { TeamNoteForm } from './components/TeamNoteForm';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { AllNotesFolderIdTEAM, NEW_FOLDER_ID } from 'utils';
import { NotesStatus } from 'features/general/Notes/configs';
import { useUploadData } from 'features/general/Notes/hooks/useUploadData';

export const MODAL_WRAPPER = 'modal-team-wrapper';
export const ARROW_LEFT = 'arrow-left';

const TeamNote: FC = () => {
  const [folder, setFolder] = useState('');
  const { uuid } = useParams<{ uuid: string }>();
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teamFolderUuid = useSelector(teamFolderUuidSelector) || null;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const folders = useSelector(getFoldersSelector) || [];
  const defaultValues = useSelector(personalNoteByUUIDSelector(uuid as string));

  const { created } = useSelector(getNotesMetaSelector);

  useUploadData();

  const setFolderName = (folder) => {
    if (folder === AllNotesFolderIdTEAM || !folder) {
      setFolder('All notes');
    } else {
      setFolder(folders?.find((item) => item?.id === folder)?.title ?? '');
    }
  };

  const handleCreate = (data) => {
    const { folderTitle, folder, ...rest } = data;
    const note = {
      ownerColleagueUuid: colleagueUuid,
      folderUuid: folder && folder !== AllNotesFolderIdTEAM && folder !== NEW_FOLDER_ID ? folder : undefined,
      updateTime: new Date(),
      status: NotesStatus.CREATED,
      ...rest,
    };

    if (folderTitle) {
      const folder = {
        ownerColleagueUuid: colleagueUuid,
        title: folderTitle,
        parentFolderUuid: teamFolderUuid,
      };

      dispatch(NotesActions.createFolderAndNote({ note, folder }));
    } else {
      dispatch(NotesActions.createNote({ ...note }));
    }
    folderTitle ? setFolder(folderTitle) : setFolderName(folder);
  };

  const handleUpdate = (data) => {
    const { folderTitle, folder, ...rest } = data;
    const note = {
      ownerColleagueUuid: colleagueUuid,
      ...rest,
      folderUuid: folder && folder !== AllNotesFolderIdTEAM && folder !== NEW_FOLDER_ID ? folder : undefined,
    };

    if (folderTitle) {
      const folder = {
        ownerColleagueUuid: colleagueUuid,
        title: folderTitle,
        parentFolderUuid: teamFolderUuid,
      };

      dispatch(NotesActions.createFolderAndUpdateNotes({ note, folder }));
    } else {
      dispatch(NotesActions.updateNote(note));
    }
    folderTitle ? setFolder(folderTitle) : setFolderName(folder);
  };

  const handleSubmit = useCallback(uuid === 'new' ? handleCreate : handleUpdate, [uuid]);

  const handleClose = () => {
    dispatch(NotesActions.changeCreatedMeta(false));
    navigate(buildPath(Page.NOTES));
  };

  if (created)
    return (
      <WrapperModal onClose={handleClose} title={t('add_a_team_note', 'Add a team note')}>
        <SuccessNotesModal folder={folder} onOk={handleClose} />
      </WrapperModal>
    );

  return (
    <WrapperModal onClose={handleClose} title={t('add_a_team_note', 'Add a team note')}>
      <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
        <div>
          <Notification
            graphic='information'
            iconColor='link'
            text={t(
              'notes_description',
              'My Notes can be used to create and store notes about Your Contribution or that of your direct reports. Use this space to record achievements, thoughts on objectives or subjects to raise during your 1:1s. Although these notes are private, if you write something about anyone else they can request to see it so please remain professional.',
            )}
            closable={false}
            customStyle={{
              background: '#F3F9FC',
              marginBottom: '20px',
            }}
          />

          <TeamNoteForm
            key={defaultValues}
            onSubmit={handleSubmit}
            onClose={handleClose}
            defaultValues={{
              ...defaultValues,
              ...(uuid !== 'new' && {
                folder: defaultValues?.folder ? defaultValues?.folder : defaultValues?.folderUuid,
              }),
            }}
          />

          <ArrowLeftIcon onClick={handleClose} testId={ARROW_LEFT} />
        </div>
      </div>
    </WrapperModal>
  );
};

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

export default TeamNote;
