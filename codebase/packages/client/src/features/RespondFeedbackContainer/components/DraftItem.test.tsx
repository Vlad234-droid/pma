import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import { screen } from '@testing-library/react';
import DraftItem from './DraftItem';

describe('ReviewDraftItems', () => {
  const testHandler = jest.fn();
  const props = {
    draftFeedback: testHandler,
    checkedRadio: {
      pending: false,
      completed: true,
    },
    searchValue: 'string',
    focus: true,
    setFocus: testHandler,
    filterModal: true,
    setFilterModal: testHandler,
    setFilterFeedbacks: testHandler,
    filterFeedbacks: {
      AZ: true,
      ZA: false,
      newToOld: false,
      oldToNew: false,
    },
  };

  it('should render DraftItems', async () => {
    const { getByTestId } = render(<DraftItem {...props} />);
    const draft = getByTestId('information');

    expect(draft).toBeInTheDocument();
  });
});
