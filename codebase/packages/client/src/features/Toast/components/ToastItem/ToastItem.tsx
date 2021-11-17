import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Rule, useStyle, Icon, Styles, useBreakpoints } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';

import { ToastPayload } from '../../config/types';

import { ToastActions } from '@pma/store';

type Props = ToastPayload;

export const TEST_ID = 'toast-item-test-id';

const ToastItem: FC<Props> = ({ id, title, description, timeout }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  const [destroyTime, setDestroyTime] = useState(timeout || Infinity);

  useEffect(() => {
    if (destroyTime <= 0) {
      dispatch(ToastActions.removeToast(id));
    } else {
      setInterval(() => {
        setDestroyTime(destroyTime - 1000);
      }, 1000);
    }
  }, [destroyTime]);

  const handleClickClose = () => {
    dispatch(ToastActions.removeToast(id));
  };

  return (
    <TileWrapper customStyle={wrapperStyles}>
      <div className={css(notificationStyles)} data-test-id={TEST_ID}>
        <div className={css(imageStyles)}></div>
        <div className={css(contentStyles)}>
          <div className={css(titleStyles)}>{title}</div>
          <div className={css(descriptionStyles)}>{description}</div>
        </div>
        <div className={css(closeStyles)} onClick={handleClickClose}>
          <Icon graphic='close' />
        </div>
      </div>
    </TileWrapper>
  );
};

const wrapperStyles: Rule = ({ theme }) => ({
  position: 'relative',
  marginBottom: '10px',
  border: `1px solid ${theme.colors.tescoBlue}`,
  boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.3)',
});

const imageStyles: Rule = {
  width: '40px',
  height: '40px',
  background:
    'no-repeat url("data:image/png;base64,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") center',
};

const notificationStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    padding: '16px 34px 16px 16px',
    maxWidth: mobileScreen ? '290px' : '375px',
  };
};

const contentStyles: Rule = {
  marginLeft: '16px',
  flex: 1,
};

const titleStyles: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  marginBottom: '5px',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 700,
});

const descriptionStyles: Rule = {
  fontSize: '14px',
  lineHeight: '18px',
};

const closeStyles = ({ theme }) =>
  ({
    cursor: 'pointer',
    position: 'absolute',
    top: '16px',
    right: '16px',
    '& svg': {
      width: `14px`,
      height: `14px`,
      color: 'inherit',
      fontStyle: 'normal',
      lineHeight: 0,
      textAlign: 'center',
      textTransform: 'none',
      '& path': {
        stroke: theme.colors.tescoBlue,
      },
    },
  } as Styles);

export default ToastItem;
