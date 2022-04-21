import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import MarkdownRenderer from './MarkdownRenderer';

describe('MarkdownRenderer', () => {
  const props = {
    source: 'Source',
  };

  it('#render', async () => {
    const { getByText } = render(<MarkdownRenderer {...props} />);
    expect(getByText(props.source)).toBeInTheDocument();
  });
});
