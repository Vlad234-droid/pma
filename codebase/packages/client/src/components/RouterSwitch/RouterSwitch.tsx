import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { colors, useStyle } from '@pma/dex-wrapper';

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
    <div
      className={css({
        background: colors.white,
        padding: '10px 0px 10px 0px',
        borderRadius: '50px',
        cursor: 'pointer',
      })}
    >
      {links.map(({ link, name }) => {
        return (
          <NavLink
            key={link}
            // @ts-ignore
            style={({ isActive }) =>
              isActive
                ? {
                    background: colors.tescoBlue,
                    color: colors.white,
                    borderRadius: '50px',
                    padding: '10px 20px',
                  }
                : {}
            }
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 700,
              padding: '10px 20px',
              color: colors.tescoBlue,
              textDecoration: 'none',
            })}
            to={link}
          >
            {name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default RouterSwitch;
