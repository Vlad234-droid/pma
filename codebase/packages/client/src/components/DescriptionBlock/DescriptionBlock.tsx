import React, { FC, CSSProperties, ReactNode } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';

export const TEST_ID = 'test-description-block';

type Props = {
  style?: Rule | CSSProperties | Styles | {};
  children: ReactNode;
};

const DescriptionBlock: FC<Props> = ({ style = {}, children }) => {
  const { css } = useStyle();

  return (
    <div data-test-id={TEST_ID} className={css(description, style)}>
      {children}
    </div>
  );
};

const description: Rule = ({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '24px',
    boxSizing: 'border-box',
    width: '100%',
  };
};

export default DescriptionBlock;
