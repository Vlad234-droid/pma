import React from 'react';
import { CreateRule, Rule, Theme, useStyle } from '@dex-ddl/core';

interface MenuItemInterface {
  name: string;
  imgUrl: string;
  notifyCount?: number;
}

const LeftsideMenuItem = (props: MenuItemInterface) => {
  const { css, theme } = useStyle();

  return (
    <div className={css(menuItem({ theme }))}>
      <div className={css(icon)}>
        <img alt={props.imgUrl} src={props.imgUrl} />
        {props.notifyCount && props.notifyCount > 0 ? (
          <span data-test-id={'NOTIFY_COUNTER'} className={css(redBadge({ theme }))}>
            {props.notifyCount}
          </span>
        ) : null}
      </div>
      <div>{props.name}</div>
    </div>
  );
};

const redBadge: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    minWidth: '16px',
    minHeight: '16px',
    boxSizing: 'border-box',
    color: `${theme.colors.white}`,
    fontWeight: 'bold',
    fontSize: `${theme.font.fixed.f12}`,
    borderRadius: '30px',
    top: '0px',
    right: '0px',
  };
};

const menuItem: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '16px',
    color: `${theme.colors.white}`,
    boxSizing: 'border-box',
    marginTop: '40px',
    cursor: 'pointer',
  };
};

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
