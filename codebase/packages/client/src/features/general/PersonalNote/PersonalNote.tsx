import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  NotesActions,
  personalFolderUuidSelector,
  personalNoteByUUIDSelector,
  getNotesMetaSelector,
  getFoldersSelector,
} from '@pma/store';

import { PersonalNoteForm } from './components';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { NotesStatus } from 'features/general/Notes/configs/type';
import { AllNotesFolderId, NEW_FOLDER_ID } from 'utils';
import SuccessNotesModal from 'components/SuccessNotesModal';
import { useUploadData } from 'features/general/Notes/hooks/useUploadData';

export const MODAL_WRAPPER = 'modal-wrapper';
export const ARROW_LEFT = 'arrow-left';

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
  const folders = useSelector(getFoldersSelector) || [];
  const { created } = useSelector(getNotesMetaSelector);

  useUploadData();

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
      folderUuid: folder && folder !== AllNotesFolderId && folder !== NEW_FOLDER_ID ? folder : undefined,
      updateTime: new Date(),
      status: NotesStatus.CREATED,
      ...rest,
    };

    if (folderTitle) {
      const folder = {
        ownerColleagueUuid: colleagueUuid,
        title: folderTitle,
        parentFolderUuid: personalFolderUuid,
      };

      dispatch(
        NotesActions.createFolderAndNote({
          note,
          folder,
        }),
      );
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
      folderUuid: folder && folder !== AllNotesFolderId && folder !== NEW_FOLDER_ID ? folder : undefined,
    };

    if (folderTitle) {
      const folder = {
        ownerColleagueUuid: colleagueUuid,
        title: folderTitle,
        parentFolderUuid: personalFolderUuid,
      };
      dispatch(
        NotesActions.createFolderAndUpdateNotes({
          note,
          folder,
        }),
      );
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
      <WrapperModal onClose={handleClose} title={t('add_a_note', 'Add a note')}>
        <SuccessNotesModal folder={folder} onOk={handleClose} />
      </WrapperModal>
    );

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
            key={defaultValues}
            onSubmit={handleSubmit}
            onClose={handleClose}
            defaultValues={{
              ...defaultValues,
              folder: defaultValues?.folder ? defaultValues?.folder : defaultValues?.folderUuid,
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

export default PersonalNote;
