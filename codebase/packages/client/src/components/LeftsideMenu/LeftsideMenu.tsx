import React from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import LeftsideMenuItem from './LeftsideMenuItem';
import unionImg from '../../assets/img/pdp/Union.png';
import { Dashboard, Pma, Settings, Alerts, Help, Chat } from 'assets/img/objectives';

const LeftsideMenu = () => {
  const { css } = useStyle();
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
    <div className={css(main)}>
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

      <div className={css(union)}>
        <img className={css(imgUnion)} src={unionImg} />
      </div>
    </div>
  );
};

const union = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '52px',
  height: '52px',
  borderRadius: '30px',
  backgroundColor: '#CC3232',
  marginBottom: '24px',
} as Rule;

const imgUnion = {
  maxWidth: '26.18px',
} as Rule;

const main = {
  position: 'absolute',
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  width: '80px',
  minWidth: '80px',
  backgroundColor: '#00539F',
  marginRight: '40px',
  '@media(max-width: 600px)': {
    // marginRight: '15px',
    display: 'none',
  },
} as Rule;

export default LeftsideMenu;
