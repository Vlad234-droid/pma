import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import TescoLogo from 'assets/img/TescoLogo.svg';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { Trans } from 'components/Translation';

type Props = {
  massage: string;
};

const P = ({ children }) => {
  const { css } = useStyle();
  return (
    <p className={css(text)}>
      <Trans>{children}</Trans>
    </p>
  );
};

const A = ({ children }) => {
  const { css } = useStyle();
  return (
    <a className={css(button)}>
      <Trans>{children}</Trans>
    </a>
  );
};

export const AccessDenied: FC<Props> = ({ massage }) => {
  const { css } = useStyle();
  return (
    <div className={css(wrapper)}>
      <p className={css(textBottom)}>
        <img className={css({ width: '300px' })} src={TescoLogo} alt='Tesco Logo' />
      </p>
      <MarkdownRenderer source={massage} components={{ p: P, a: A }} />
    </div>
  );
};

const wrapper: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '200px 32px 0 32px',
};

const text: Rule = ({ theme }) => ({
  ...theme.font.fixed.f20,
  textAlign: 'center',
  margin: '0 0 7px',
});

const textBottom: Rule = {
  margin: '0 0 32px',
};

const button: Rule = ({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.colors.tescoBlue,
  fontSize: '18px',
  padding: '20px 48px',
  color: theme.colors.white,
  borderRadius: '3px',
  marginTop: '32px',
  display: 'block',

  ':hover': {
    color: theme.colors.white,
  },
});