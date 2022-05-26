import React, { FC } from 'react';
import { Rule, useStyle, IconButton } from '@pma/dex-wrapper';

export const Backward: FC<{ onPress: () => void }> = ({ onPress }) => {
  const { css } = useStyle();
  return (
    <div className={css(arrowLeftStyle)}>
      <IconButton onPress={onPress} graphic='backwardLink' />
    </div>
  );
};

const arrowLeftStyle: Rule = () => {
  return {
    position: 'fixed',
    top: '34px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    left: '16px',
  };
};
