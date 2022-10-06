import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

type Props = {
  title: string;
  count: string;
};

export const PriorityElement: FC<Props> = ({ count, title }) => {
  const { css } = useStyle();

  return (
    <div className={css(containerStyles)}>
      <span className={css(countStyles)}>{count}</span>
      <span className={css(titleStyles)}>{title}</span>
    </div>
  );
};

const countStyles: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
};

const titleStyles: Rule = {
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 'lighter',
};

const containerStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '8px',
  alignItems: 'center',
};
