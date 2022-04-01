import React from 'react';
import { CreateRule, Rule, Theme, useStyle } from '@pma/dex-wrapper';
import LeftsideMenuItem from './LeftsideMenuItem';
import unionImg from '../../assets/img/pdp/Union.png';
import { Dashboard, Pma, Settings, Alerts, Help, Chat } from 'assets/img/objectives';

const LeftsideMenu = () => {
  const { css, theme } = useStyle();
  const notifyBadge = 3;
  const menuItems = [
    { id: 0, name: 'Dashboard', imgUrl: Dashboard },
    { id: 1, name: 'PMA', imgUrl: Pma },
    { id: 2, name: 'Chat', imgUrl: Chat },
    { id: 3, name: 'Alerts', imgUrl: Alerts },
    { id: 4, name: 'Settings', imgUrl: Settings },
    { id: 5, name: 'Help', imgUrl: Help },
  ];

  return (
    <div className={css(main({ theme }))}>
      <div>
        {menuItems.map((item) => {
          return (
            <LeftsideMenuItem
              notifyCount={item.name === 'Alerts' ? notifyBadge : 0}
              key={item.id}
              name={item.name}
              imgUrl={item.imgUrl}
            />
          );
        })}
      </div>

      <div className={css(union({ theme }))}>
        <img className={css(imgUnion)} src={unionImg} />
      </div>
    </div>
  );
};

const union: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '52px',
    height: '52px',
    borderRadius: '30px',
    backgroundColor: `${theme.colors.error}`,
    marginBottom: '24px',
  };
};

const imgUnion = {
  maxWidth: '26.18px',
} as Rule;

const main: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    position: 'absolute',
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '80px',
    minWidth: '80px',
    backgroundColor: `${theme.colors.tescoBlue}`,
    marginRight: '40px',
    '@media(max-width: 600px)': {
      display: 'none',
    },
  };
};

export default LeftsideMenu;
