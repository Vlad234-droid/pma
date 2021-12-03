import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

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

const wrapperStyles: Rule = {
  display: 'none', // after demo remove this
  position: 'fixed',
  top: '24px',
  right: '16px',
  zIndex: 999,
  marginLeft: '16px',
};

export default ToastContainer;
