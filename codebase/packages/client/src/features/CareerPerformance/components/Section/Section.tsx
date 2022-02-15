import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

type Props = {
  title: JSX.Element;
  children: JSX.Element;
};

const Section: FC<Props> = ({ title, children }) => {
  const { css } = useStyle();

  return (
    <section data-test-id='section' className={css(wrapperStyles)}>
      <div className={css(titleStyles)}>{title}</div>
      <div className={css(contentStyles)}>{children}</div>
    </section>
  );
};

export default Section;

const wrapperStyles: Rule = {
  marginTop: '32px',
};

const titleStyles: Rule = {
  margin: '12px 0',
  fontSize: '20px',
  lineHeight: '24px',
  fontWeight: 'bold',
};

const contentStyles: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
  height: '100%',
};
