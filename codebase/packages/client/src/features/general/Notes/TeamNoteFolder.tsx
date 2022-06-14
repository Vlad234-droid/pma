import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, NotesActions, teamFolderUuidSelector, getNotesMetaSelector } from '@pma/store';

import TeamNoteFolderForm from './components/TeamNoteFolderForm';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import SuccessModal from './components/SuccessModal';
import { Page } from 'pages';

export const MODAL_WRAPPER = 'modal-wrapper';

const PersonalNote: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const teamFolderUuid = useSelector(teamFolderUuidSelector) || null;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { created } = useSelector(getNotesMetaSelector);

  const dispatch = useDispatch();

  const handleCreate = (data) => {
    dispatch(
      NotesActions.createFolderNotes({
        ownerColleagueUuid: colleagueUuid,
        parentFolderUuid: teamFolderUuid,
        ...data,
      }),
    );
  };

  const handleClose = () => {
    dispatch(NotesActions.changeCreatedMeta(false));
    navigate(buildPath(Page.NOTES));
  };

  if (created) return <SuccessModal onOk={handleClose} />;

  return (
    <WrapperModal onClose={handleClose} title={t('add_team_folder', 'Add team folder')}>
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
          <TeamNoteFolderForm onSubmit={handleCreate} onClose={handleClose} colleagueUuid={colleagueUuid} />
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
