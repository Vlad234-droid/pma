import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Radio } from 'components/Form';
import { SearchOption } from 'config/enum';
import { Trans } from 'components/Translation';
import { Icon } from '../Icon';

export const WRAPPER_ID = 'wrapper-id';

const DrawerModal2: FC<{
  title: string;
  onSelect: (T) => void;
  active: SearchOption;
  onClose: () => void;
}> = ({ title = '', onSelect, active, onClose }) => {
  const { css } = useStyle();

  return (
    <div className={css(drawerContentStyle)} data-test-id={WRAPPER_ID}>
      <div className={css(headerStyle)}>
        {title && <p className={css(titleStyle)}>{title}</p>}
        <Icon graphic='cancel' invertColors={false} onClick={onClose} iconStyles={modalCloseOptionStyle} />
      </div>
      <div className={css(labelStyle)}>
        <label htmlFor='name' className={css(flexStyle)}>
          <Radio
            name='name'
            checked={active === SearchOption.NAME}
            id='name'
            onChange={() => onSelect(SearchOption.NAME)}
          />
          <span className={css(titleRadioStyle)}>
            <Trans i18nKey='name'>Name</Trans>
          </span>
        </label>
      </div>
      <div className={css(labelStyle, { marginTop: '22px' })}>
        <label htmlFor='email' className={css(flexStyle)}>
          <Radio
            name='email'
            checked={active === SearchOption.EMAIL}
            id='email'
            onChange={() => onSelect(SearchOption.EMAIL)}
          />
          <span className={css(titleRadioStyle)}>
            <Trans i18nKey='email'>Email</Trans>
          </span>
        </label>
      </div>
    </div>
  );
};

const drawerContentStyle: Rule = ({ theme }) => ({
  background: theme.colors.backgroundDark,
  height: '100%',
  padding: '26px 24px',
});

const titleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f20.fontSize,
  color: theme.colors.tescoBlue,
});
const titleRadioStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  color: theme.colors.base,
  marginLeft: '11px',
});

const headerStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const flexStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const labelStyle: Rule = {
  padding: '0px 10px 0px 0px',
  cursor: 'pointer',
};

const modalCloseOptionStyle: Rule = () => ({
  display: 'inline-block',
  height: '20px',
  paddingLeft: '0px',
  paddingRight: '0px',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
});

export default DrawerModal2;
