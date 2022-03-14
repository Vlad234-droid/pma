import React, { FC } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { useStyle, Rule } from '@dex-ddl/core';

type Props = {
  source: string;
  components?: Components;
};

const CustomPTag = ({ children }) => {
  const { css } = useStyle();
  return <p className={css(defaultTag)}>{children}</p>;
};
const defaultTag: Rule = ({ theme }) => ({
  margin: '0px',
  color: theme.colors.base,
  fontSize: '16px',
  lineHeight: '20px',
});

const defaultComponents = { p: CustomPTag };

const MarkdownRenderer: FC<Props> = ({ source, components = defaultComponents }) => {
  return <ReactMarkdown components={components}>{source}</ReactMarkdown>;
};

export default MarkdownRenderer;
