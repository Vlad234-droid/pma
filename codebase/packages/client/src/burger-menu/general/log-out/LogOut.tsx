import React, { MouseEvent, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation';
import { ConfirmModal } from 'components/ConfirmModal';
import { LINKS } from 'config/constants';

const List = () => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleSignOutConfirm = () => {
    window.location.href = LINKS.signOut;
    setIsOpen(false);
  };

  return (
    <>
      <a href={LINKS.signOut} className={css(itemSettingsStyle, itemSettingsBorderStyle)} onClick={handleSignOut}>
        <Icon graphic={'signOut'} />
        <span className={css(itemSettingsTextStyle)}>{t('sign_out', 'Sign out')}</span>
      </a>

      {isOpen && (
        <ConfirmModal
          title={''}
          description={t('are_you_sure_you_want_to_log_out', 'Are you sure you want to log out?')}
          submitBtnTitle={<Trans i18nKey='confirm'>Confirm</Trans>}
          onSave={handleSignOutConfirm}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default List;

const itemSettingsTextStyle: Rule = ({ theme }) => {
  return {
    paddingLeft: '16px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const itemSettingsStyle: Rule = ({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0 12px 20px',
  ':hover': {
    // @ts-ignore
    background: theme.colors.lightBlue,
    opacity: 0.9,
  },
});

const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  position: 'relative',
  marginTop: '2px',
  ':before': {
    position: 'absolute',
    width: '100%',
    content: "''",
    left: 20,
    top: '-2px',
    height: '2px',
    // @ts-ignore
    backgroundColor: theme.colors.lightGray,
  },
});
