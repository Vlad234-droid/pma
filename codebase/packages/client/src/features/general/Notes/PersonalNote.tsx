import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  NotesActions,
  personalFolderUuidSelector,
  personalNoteByUUIDSelector,
  notesFolderColleagueDataSelector,
  getNotesMetaSelector,
} from '@pma/store';

import PersonalNoteForm from './components/PersonalNoteForm';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { NotesStatus } from 'features/general/Notes/type';
import { AllNotesFolderId } from 'utils';
import SuccessModal from './components/SuccessModal';

export const MODAL_WRAPPER = 'modal-wrapper';

const PersonalNote: FC = () => {
  const [folder, setFolder] = useState('');
  const { uuid } = useParams<{ uuid: string }>();
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const personalFolderUuid = useSelector(personalFolderUuidSelector) || null;
  const defaultValues = useSelector(personalNoteByUUIDSelector(uuid as string));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const folders = useSelector(notesFolderColleagueDataSelector(colleagueUuid, false)) || [];
  const { created } = useSelector(getNotesMetaSelector);

  const setFolderName = (folder) => {
    if (folder === AllNotesFolderId || !folder) {
      setFolder('All notes');
    } else {
      setFolder(folders?.find((item) => item?.id === folder)?.title ?? '');
    }
  };

  const handleCreate = (data) => {
    const { folderTitle, folder, ...rest } = data;

    const note = {
      ownerColleagueUuid: colleagueUuid,
      folder: folderTitle && folder !== AllNotesFolderId ? folder : undefined,
      ...rest,
    };

    if (folderTitle) {
      const folder = {
        ownerColleagueUuid: colleagueUuid,
        title: folderTitle,
        parentFolderUuid: personalFolderUuid,
      };
      if (uuid === 'new') {
        dispatch(
          NotesActions.createFolderAndNote({
            note: { ...note, status: NotesStatus.CREATED },
            folder,
          }),
        );
      } else {
        dispatch(
          NotesActions.updateNote({
            note: { ...note, updateTime: new Date() },
            folder,
          }),
        );
      }
    } else {
      if (uuid === 'new') {
        dispatch(NotesActions.createNote({ ...note, status: NotesStatus.CREATED }));
      } else {
        dispatch(
          NotesActions.updateNote({
            updateTime: new Date(),
            parentFolderUuid: personalFolderUuid,
            ...rest,
          }),
        );
      }
    }
    folderTitle ? setFolder(folderTitle) : setFolderName(folder);
  };

  const handleClose = () => {
    dispatch(NotesActions.changeCreatedMeta(false));
    navigate(buildPath(Page.NOTES));
  };

  if (created) return <SuccessModal folder={folder} onOk={handleClose} />;

  return (
    <WrapperModal onClose={handleClose} title={t('add_a_note', 'Add a note')}>
      <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
        <div>
          <Notification
            graphic='information'
            iconColor='link'
            text={t(
              'private_folder_note',
              `Remember these note are private, but in limited circumstances, they may need to be shared with others so should be kept professional.`,
              { option: 'folder' },
            )}
            closable={false}
            customStyle={{
              background: '#F3F9FC',
              marginBottom: '20px',
            }}
          />
          <PersonalNoteForm
            onSubmit={handleCreate}
            onClose={handleClose}
            defaultValues={defaultValues}
            folders={folders}
          />
          <ArrowLeftIcon onClick={handleClose} data-test-id='arrowRight' />
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

export default PersonalNote;
