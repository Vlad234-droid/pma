import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';

export const TEST_ID = 'objectives-pave';

export type RouterSwitchProps = {
  links: {
    link: string;
    name: string;
  }[];
};

const RouterSwitch: FC<RouterSwitchProps> = ({ links }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      {links.map(({ link, name }) => {
        return (
          <NavLink key={link} className={({ isActive }) => css(linkStyle({ isActive }))} to={link}>
            {name}
          </NavLink>
        );
      })}
    </div>
  );
};

const wrapperStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  display: 'flex',
  borderRadius: '50px',
  cursor: 'pointer',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const linkStyle: CreateRule<{ isActive: boolean }> =
  ({ isActive }) =>
  ({ theme }) => ({
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    fontWeight: theme.font.weight.bold,
    letterSpacing: '0px',
    padding: '10px 20px',
    ...(isActive
      ? {
          background: theme.colors.tescoBlue,
          color: theme.colors.white,
          borderRadius: '50px',
          ':hover': {
            color: theme.colors.white,
          },
        }
      : {
          padding: '10px 20px',
          color: theme.colors.tescoBlue,
          textDecoration: 'none',
          ':hover': {
            color: theme.colors.tescoBlue,
          },
        }),
  });
export default RouterSwitch;
