import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import TescoLogo from 'assets/img/TescoLogo.svg';
import MarkdownRenderer from 'components/MarkdownRenderer';

type Props = {
  massage?: string;
};

const defaultMassage = `
 You are seeing this message because your market is not yet using the Your Contribution System at the moment.
 
 If you believe you should have access please raise a ticket via Colleague Help or via your People Team if you do not have Colleague Help.
`;

const CustomPTag = ({ children }) => {
  const { css } = useStyle();
  return <p className={css(text)}>{children}</p>;
};

export const AccessDenied: FC<Props> = ({ massage = defaultMassage }) => {
  const { css } = useStyle();
  return (
    <div className={css(wrapper)}>
      <p className={css(textBottom)}>
        <img className={css({ width: '300px' })} src={TescoLogo} alt='Tesco Logo' />
      </p>
      <p className={css(text)}>You do not have access to this system.</p>
      <MarkdownRenderer source={massage} components={{ p: CustomPTag }} />
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

  ':hover': {
    color: theme.colors.white,
  },
});
