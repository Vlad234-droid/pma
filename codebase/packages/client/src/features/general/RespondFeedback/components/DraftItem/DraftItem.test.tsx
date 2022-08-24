import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import DraftItem, { TEST_ID } from './DraftItem';
import { FeedbackStatus } from 'config/enum';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('ReviewDraftItems', () => {
  const props = {
    status: FeedbackStatus.COMPLETED,
    list: [],
    canEdit: false,
  };

  it('it should not render list of draft items', async () => {
    const { queryByTestId } = render(<DraftItem {...props} />);
    expect(queryByTestId(TEST_ID)).toBeNull();
  });
  it('it should not render accordion wrapper', async () => {
    const { queryByTestId } = render(<DraftItem {...props} />);
    expect(queryByTestId('tile-wrapper')).toBeInTheDocument();
  });
});
