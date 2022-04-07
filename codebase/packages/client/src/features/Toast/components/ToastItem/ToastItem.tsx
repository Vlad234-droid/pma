import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Icon, Rule, Styles, useBreakpoints, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';

import { ToastPayload, Variant } from '../../config/types';

import tip from 'images/tip.png';
import error from 'images/error.png';
import info from 'images/info.png';

import { ToastActions } from '@pma/store';

type Props = ToastPayload;

export const TEST_ID = 'toast-item-test-id';

const ToastItem: FC<Props> = ({ id, title, description, timeout, onClose, variant, autoClose = true }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  const [destroyTime, setDestroyTime] = useState(timeout || Infinity);

  useEffect(() => {
    if (!autoClose) {
      return;
    }

    if (destroyTime <= 0) {
      handleClickClose();
    } else {
      setInterval(() => {
        setDestroyTime(destroyTime - 1000);
      }, 1000);
    }
  }, [destroyTime, autoClose]);

  const handleClickClose = () => {
    onClose && onClose();
    dispatch(ToastActions.removeToast(id));
  };

  const getImageOf = (variant: Variant) => {
    switch (variant) {
      case Variant.ERROR:
        return error;
      case Variant.INFO:
        return info;
      case Variant.SUCCESS:
      case Variant.WARNING:
        return tip;
    }
  };

  return (
    <TileWrapper customStyle={wrapperStyles}>
      <div className={css(notificationStyles)} data-test-id={TEST_ID}>
        <img className={css(imageStyles)} src={getImageOf(variant)}></img>
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
  border: `2px solid ${theme.colors.tescoBlue}`,
  boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.3)',
});

const imageStyles: Rule = {
  width: '40px',
  height: '40px',
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
