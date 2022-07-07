import React, { FC, MouseEvent, useRef } from 'react';
import { Rule, useStyle, CreateRule } from '@pma/dex-wrapper';
import { Radio } from 'components/Form';
import { SearchOption } from 'config/enum';
import { Trans } from 'components/Translation';
import { Icon } from '../Icon';

const DrawerModal: FC<{ setOpen: (T) => void; title: string; onSelect: (T) => void; active: SearchOption }> = ({
  setOpen,
  title = '',
  onSelect,
  active,
}) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const ref = useRef<HTMLDivElement | null>(null);

  const closeHandler = () => setOpen(false);

  const underlayClick = (e: MouseEvent<HTMLDivElement>) => e.target === ref.current && closeHandler();

  return (
    <div className={css(drawerWrapperStyle)} ref={ref} onClick={underlayClick}>
      <div className={css(drawerContentStyle({ mobileScreen }))}>
        <div className={css(headerStyle)}>
          {title && <p className={css(titleStyle)}>{title}</p>}
          <Icon graphic='cancel' invertColors={false} onClick={closeHandler} iconStyles={modalCloseOptionStyle} />
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
    </div>
  );
};

const drawerWrapperStyle: Rule = ({ colors, zIndex }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: colors.link30,
  zIndex: zIndex.i50,
});

const drawerContentStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'absolute',
    right: 0,
    top: 0,
    minWidth: !mobileScreen ? '488px' : '100%',
    background: theme.colors.backgroundDark,
    minHeight: '100vh',
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

export default DrawerModal;
