import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../utils/test';
import { screen } from '@testing-library/react';
import DraftItem, { TEST_ID } from './DraftItem';

describe('ReviewDraftItems', () => {
  const testHandler = jest.fn();

  it('should render ReviewDraftItems', async () => {
    const draftItem = {
      id: 1,
      img: 'string',
      f_name: 'string',
      l_name: 'string',
      title: 'string',
    };
    renderWithTheme(<DraftItem draftFeedback={testHandler} item={draftItem} />);
    const draft = screen.getByTestId(TEST_ID);

    expect(draft).toBeInTheDocument();
  });
});
