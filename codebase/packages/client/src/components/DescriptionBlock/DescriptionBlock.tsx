import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

export const TEST_ID = 'test-description-block';

const DescriptionBlock = (props) => {
  const { css } = useStyle();

  return (
    <div data-test-id={TEST_ID} className={css(description, props.style ? props.style : null)}>
      {props.children}
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
