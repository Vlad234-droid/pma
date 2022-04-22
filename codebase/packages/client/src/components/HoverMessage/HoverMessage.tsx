import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { HoverMessage as Props } from './types';

export const MESSAGE_WRAPPER = 'message-wrapper';

const HoverMessage: FC<Props> = ({ text = '', customStyles = {} }) => {
  const { css } = useStyle();
  return (
    <div className={css(hoverMessage, customStyles)} data-test-id={MESSAGE_WRAPPER}>
      {text}
    </div>
  );
};

const hoverMessage: Rule = ({ theme }) => ({
  zIndex: '2',
  background: theme.colors.link,
  padding: theme.spacing.s4,
  width: '294px',
  maxWidth: '294px',
  color: theme.colors.white,
  borderRadius: theme.spacing.s2_5,
});

export default HoverMessage;
