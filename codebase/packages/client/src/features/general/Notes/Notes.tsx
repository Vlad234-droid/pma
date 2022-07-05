import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';
import { role, usePermission } from 'features/general/Permission';
import { Trans, useTranslation } from 'components/Translation';
import { FilterOptions, MainFolders } from './components';
import { IconButton } from 'components/IconButton';
import { ConfirmModalWithSelectOptions } from 'features/general/Modal';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import { getOptions } from './utils';
import { useNotesContainer } from './contexts';

export const NOTES_WRAPPER = 'note-wrapper';
export const ADD_NEW = 'add-new';
export const CONFIRM_MODAL_ID = 'confirm-modal';
export const WRAPPER = 'wrapper';

enum ModalStatuses {
  ADD_NEW = 'ADD_NEW',
  VIEW = 'VIEW',
}

const NotesComposition: FC = () => {
  const isLineManager = usePermission([role.LINE_MANAGER]);
  const [status, setStatus] = useState(ModalStatuses.VIEW);
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();
  const { searchValue, setSearchValue } = useNotesContainer();

  const handleCloseModal = () => setStatus(() => ModalStatuses.VIEW);

  return (
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
          title={
            isLineManager
              ? t(
                  'my_notes_can_be_used_to_create_and_store_notes',
                  'My Notes can be used to create and store notes about Your Contribution throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager during your 1:1s. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.',
                )
              : t(
                  'my_notes_can_be_used_to_create_and_store_notes_about_your_contribution',
                  'My Notes can be used to create and store notes about Your Contribution and that of your direct reports throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager or direct reports during your 1:1s. Team notes can be used to help keep track of your direct reports work, achievements or conversations to refer back to at a later date. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.',
                )
          }
          onSearch={searchValue}
          setSearchValueFilterOption={setSearchValue}
          onClickInfo={() => {
            navigate(buildPath(Page.NOTES_INFO));
          }}
        />
      </div>
      {status === ModalStatuses.ADD_NEW && (
        <ConfirmModalWithSelectOptions
          options={getOptions(isLineManager)}
          description={t('choose_options', 'Please choose one of the options:')}
          onOverlayClick={handleCloseModal}
          title={t('add_new', 'Add new')}
          onSave={(checked) => {
            navigate(buildPath(paramsReplacer(Page[checked], { ':uuid': 'new' })));
          }}
          onCancel={handleCloseModal}
          testId={CONFIRM_MODAL_ID}
        />
      )}
      <div className={css({ paddingRight: '40px', position: 'relative' })}>
        <MainFolders isLineManager={isLineManager} />
      </div>
    </div>
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
