import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { useStyle } from '@dex-ddl/core';

type Props = {
  source: string;
};

const CustomPTag = ({ children }) => {
  const { css } = useStyle();
  return <p className={css({ margin: '0px' })}>{children}</p>;
};
const MarkdownRenderer: FC<Props> = ({ source }) => {
  return <ReactMarkdown components={{ p: CustomPTag }}>{source}</ReactMarkdown>;
};

export default MarkdownRenderer;
