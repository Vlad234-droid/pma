import React, { FC } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { useStyle } from '@dex-ddl/core';

type Props = {
  source: string;
  components?: Components;
};

const CustomPTag = ({ children }) => {
  const { css } = useStyle();
  return <p className={css({ margin: '0px' })}>{children}</p>;
};

const defaultComponents = { p: CustomPTag };

const MarkdownRenderer: FC<Props> = ({ source, components = defaultComponents }) => {
  return <ReactMarkdown components={components}>{source}</ReactMarkdown>;
};

export default MarkdownRenderer;
