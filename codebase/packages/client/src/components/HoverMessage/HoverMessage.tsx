import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { HoverMessage as Props } from './types';

export const MESSAGE_WRAPPER = 'message-wrapper';

const HoverMessage: FC<Props> = ({ text = '', customStyles = {} }) => {
  const { css } = useStyle();
  return (
    <div className={css(customStyles)} data-test-id={MESSAGE_WRAPPER}>
      {text}
    </div>
  );
};

export default HoverMessage;
