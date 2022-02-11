import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import TescoLogo from 'assets/img/TescoLogo.svg';

export const AccessDenied: FC = () => {
  const { css } = useStyle();
  return (
    <div className={css(wrapper)}>
      <img className={css({ width: '300px' })} src={TescoLogo} alt='TescoLogo' />
      <div className={css(textBottom)}>You do not have access to this system.</div>
      <a href='https://ourtesco.com' className={css(button)}>
        Go to ourtesco.com
      </a>
    </div>
  );
};

const wrapper: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '200px auto 0 auto',
};

const textBottom: Rule = {
  fontSize: '20px',
  margin: '32px 0',
};

const button: Rule = ({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.colors.tescoBlue,
  fontSize: '18px',
  padding: '20px 48px',
  color: theme.colors.white,
  borderRadius: '3px',
  ':hover': {
    color: theme.colors.white,
  },
});
