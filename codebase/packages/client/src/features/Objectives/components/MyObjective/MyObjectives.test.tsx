import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import MyObjectives, { TEST_ID } from './MyObjectives';

jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));

describe('MyObjectives', () => {
  it('should render MyObjectives', async () => {
    renderWithTheme(<MyObjectives />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
