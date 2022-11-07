import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { ModalWrapper } from 'components/ModalWrapper';
import { CanPerform, role, Tenant, useTenant } from 'features/general/Permission';
import { useTranslation } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';

const NotesInfo: FC = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();
  const handleClose = () => navigate(buildPath(Page.NOTES));
  const tenant = useTenant();

  return (
    <ModalWrapper isOpen={true}>
      <WrapperModal title={t('notes', 'Notes')} onClose={handleClose}>
        <div className={css(wrapperInfo)}>
          <p className={css(preTitle)}>
            <CanPerform
              perform={[role.LINE_MANAGER]}
              yes={() =>
                t(
                  'my_notes_can_be_used_to_create_and_store_notes_about_your_contribution',
                  tenant === Tenant.GENERAL
                    ? 'My Notes can be used to create and store notes about Your Contribution and that of your direct reports throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager or direct reports during your 1:1s. Team notes can be used to help keep track of your direct reports work, achievements or conversations to refer back to at a later date. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.'
                    : 'My Notes can be used to create and store notes about Your Contribution and that of your direct reports throughout the year. Use this space to record outcomes and agreements from your quarterly check-in conversations, achievements or subjects to raise with your line manager or direct reports during your 1:1s.\n Team notes can be used to help keep track of your direct reports work, achievements or conversations to refer back to at a later date. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.',
                  { ns: tenant },
                )
              }
              no={() =>
                t(
                  'my_notes_can_be_used_to_create_and_store_notes',
                  tenant === Tenant.GENERAL
                    ? 'My Notes can be used to create and store notes about Your Contribution throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager during your 1:1s. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.'
                    : 'My Notes can be used to create and store notes about Your Contribution throughout the year. Use this space to record outcomes and agreements from your quarterly check-in conversations, achievements or subjects to raise with your line manager. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.',
                  { ns: tenant },
                )
              }
            />
          </p>
          <ArrowLeftIcon onClick={handleClose} testId={'go-back'} />
        </div>
      </WrapperModal>
    </ModalWrapper>
  );
};

export default NotesInfo;

const wrapperInfo: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};

const preTitle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  whiteSpace: 'pre-line',
};
