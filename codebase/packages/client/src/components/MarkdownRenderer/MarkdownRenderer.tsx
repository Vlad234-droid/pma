import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  source: string;
};
const MarkdownRenderer: FC<Props> = ({ source }) => {
  return (
    <div>
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
