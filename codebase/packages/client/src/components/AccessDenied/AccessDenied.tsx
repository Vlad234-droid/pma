import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import TescoLogo from 'assets/img/TescoLogo.svg';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { Trans } from 'components/Translation';

type Props = {
  message: string;
};

const P = ({ children, ...props }) => {
  const { css } = useStyle();
  return (
    <p className={css(text)} {...props}>
      <Trans>{children}</Trans>
    </p>
  );
};

const A = ({ children, ...props }) => {
  const { css } = useStyle();
  return (
    <a className={css(button)} {...props}>
      <Trans>{children}</Trans>
    </a>
  );
};

export const AccessDenied: FC<Props> = ({ message }) => {
  const { css } = useStyle();
  return (
    <div data-test-id='access-denied' className={css(wrapper)}>
      <p className={css(textBottom)}>
        <img className={css({ width: '300px' })} src={TescoLogo} alt='Tesco Logo' />
      </p>
      <MarkdownRenderer source={message} components={{ p: P, a: A }} />
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
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  letterSpacing: '0px',
  padding: '20px 48px',
  color: theme.colors.white,
  borderRadius: '3px',
  marginTop: '32px',
  display: 'block',

  ':hover': {
    color: theme.colors.white,
  },
});
