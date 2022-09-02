import React, { FC, CSSProperties } from 'react';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';

export const MESSAGE_WRAPPER = 'message-wrapper';

export type Props = {
  text: string;
  customStyles?: Rule | Styles | CSSProperties | {};
};

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
