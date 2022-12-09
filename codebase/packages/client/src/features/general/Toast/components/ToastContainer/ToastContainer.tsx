import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import ToastItem from '../ToastItem';
import { ToastPayload } from '../../config/types';

export const TEST_ID = 'toast-test-id';

const DEFAULT_TIMEOUT = 3000;

export type Props = {
  items: ToastPayload[];
};

const ToastContainer: FC<Props> = ({ items }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyles)} data-test-id={TEST_ID}>
      {items.map(({ timeout = DEFAULT_TIMEOUT, ...rest }, idx) => (
        <ToastItem key={idx} {...{ timeout, ...rest }} />
      ))}
    </div>
  );
};

const wrapperStyles: Rule = ({ zIndex }) => ({
  position: 'fixed',
  top: '75px',
  right: '16px',
  zIndex: zIndex.i50,
  marginLeft: '16px',
  gap: '10px',
  display: 'flex',
  flexDirection: 'column',
});

export default ToastContainer;
