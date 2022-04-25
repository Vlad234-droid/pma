import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

interface MenuItemInterface {
  name: string;
  imgUrl: string;
  notifyCount?: number;
}

const LeftsideMenuItem = (props: MenuItemInterface) => {
  const { css } = useStyle();

  return (
    <div className={css(menuItem)}>
      <div className={css(icon)}>
        <img alt={props.imgUrl} src={props.imgUrl} />
        {props.notifyCount && props.notifyCount > 0 ? (
          <span data-test-id={'NOTIFY_COUNTER'} className={css(redBadge)}>
            {props.notifyCount}
          </span>
        ) : null}
      </div>
      <div>{props.name}</div>
    </div>
  );
};

const redBadge: Rule = ({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.tescoRed,
  minWidth: '16px',
  minHeight: '16px',
  boxSizing: 'border-box',
  color: `${theme.colors.white}`,
  fontSize: theme.font.fixed.f12.fontSize,
  lineHeight: theme.font.fixed.f12.lineHeight,
  fontWeight: theme.font.weight.bold,
  borderRadius: '30px',
  top: '0px',
  right: '0px',
});

const menuItem: Rule = ({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: theme.font.fixed.f12.fontSize,
  lineHeight: theme.font.fixed.f12.lineHeight,
  fontWeight: 'normal',
  color: `${theme.colors.white}`,
  boxSizing: 'border-box',
  marginTop: '40px',
  cursor: 'pointer',
});

const icon: Rule = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  marginBottom: '7px',
};

export default LeftsideMenuItem;
