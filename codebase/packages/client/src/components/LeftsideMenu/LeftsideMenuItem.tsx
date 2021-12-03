import React from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

interface MenuItemInterface {
  name: string;
  imgUrl: string;
  notifyCount?: number;
}

const LeftsideMenuItem = (props: MenuItemInterface) => {
  const { css } = useStyle();
  console.log(props.imgUrl);

  return (
    <div className={css(menuItem)}>
      <div className={css(icon)}>
        <img alt={props.imgUrl} src={props.imgUrl} />
        {props.notifyCount && props.notifyCount > 0 ? <span className={css(redBadge)}>{props.notifyCount}</span> : null}
      </div>
      <div>{props.name}</div>
    </div>
  );
};

const redBadge = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
  minWidth: '16px',
  minHeight: '16px',
  boxSizing: 'border-box',
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '12px',
  borderRadius: '30px',
  top: '0',
  right: '0',
} as Rule;

const menuItem = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: '16px',
  color: '#FFFFFF',
  boxSizing: 'border-box',
  marginTop: '40px',
  cursor: 'pointer',
} as Rule;

const icon = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  marginBottom: '7px',
} as Rule;

export default LeftsideMenuItem;
