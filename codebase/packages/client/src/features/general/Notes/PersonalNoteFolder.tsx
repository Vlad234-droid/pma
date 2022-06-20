import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, getNotesMetaSelector, NotesActions, personalFolderUuidSelector } from '@pma/store';

import SuccessModal from './components/SuccessModal';
import PersonalNoteFolderForm from './components/PersonalNoteFolderForm';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

export const MODAL_WRAPPER = 'modal-wrapper';

const PersonalNoteFolder: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const personalFolderUuid = useSelector(personalFolderUuidSelector) || null;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { created } = useSelector(getNotesMetaSelector);

  const handleCreate = (data) => {
    dispatch(
      NotesActions.createFolderNotes({
        ownerColleagueUuid: colleagueUuid,
        parentFolderUuid: personalFolderUuid,
        ...data,
      }),
    );
  };

  const handleClose = () => {
    dispatch(NotesActions.changeCreatedMeta(false));
    navigate(buildPath(Page.NOTES));
  };

  if (created)
    return (
      <WrapperModal onClose={handleClose} title={t('add_a_folder', 'Add a folder')}>
        <SuccessModal onOk={handleClose} />
      </WrapperModal>
    );

  return (
    <WrapperModal onClose={handleClose} title={t('add_a_folder', 'Add a folder')}>
      <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
        <div>
          <Notification
            graphic='information'
            iconColor='link'
            text={t(
              'private_folder_note',
              `Remember these folder are private, but in limited circumstances, they may need to be shared with others so should be kept professional.`,
              { option: 'folder' },
            )}
            closable={false}
            customStyle={{
              background: '#F3F9FC',
              marginBottom: '20px',
            }}
          />
          <PersonalNoteFolderForm onSubmit={handleCreate} onClose={handleClose} />
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

export default PersonalNoteFolder;
