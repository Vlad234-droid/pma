import React, { FC, ReactNode } from 'react';

import { Rule, useStyle } from '@dex-ddl/core';

type NodeOptions = {
  content: ReactNode;
  styles?: Rule;
};

export type SectionProps = {
  title?: NodeOptions;
  left: NodeOptions;
  right?: NodeOptions;
};

const Section: FC<SectionProps> = ({
  children,
  title: { content: title, styles: titleStyles = {} } = {},
  right: { content: rightContent, styles: rightStyles = {} } = {},
  left: { content: leftContent, styles: leftStyles = {} } = {},
}) => {
  const { css } = useStyle();

  return (
    <section className={css(sectionStyles)}>
      {title && <div className={css(titleStyles, baseTitleStyles)}>{title}</div>}
      <div className={css(headerStyles)}>
        {leftContent && <div className={css(leftStyles, baseLeftStyles)}>{leftContent}</div>}
        {rightContent && <div className={css(rightStyles, baseRightStyles)}>{rightContent}</div>}
      </div>
      <div className={css(bodyStyles, descriptionStyles)}>{children}</div>
    </section>
  );
};

const sectionStyles: Rule = {
  display: 'flex',
  flex: 1,
  marginTop: '20px',
  flexDirection: 'column',
};

const headerStyles: Rule = {
  flexWrap: 'wrap',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
};

const baseRightStyles: Rule = ({ theme }) => ({
  marginTop: theme.breakpoints.small || theme.breakpoints.xSmall ? '10px' : 0,
});

const baseTitleStyles: Rule = ({ theme }) => ({
  fontSize: '18px',
  lineHeight: '22px',
  fontWeight: 700,
  color: theme.colors.base,
});

const baseLeftStyles: Rule = ({ theme }) => ({
  fontSize: '18px',
  lineHeight: '22px',
  fontWeight: 700,
  color: theme.colors.base,
});

const descriptionStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.base,
});

const bodyStyles: Rule = {};

export default Section;
