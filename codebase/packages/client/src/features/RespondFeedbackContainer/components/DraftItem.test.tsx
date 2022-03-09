import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import DraftItem from './DraftItem';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('ReviewDraftItems', () => {
  const props = {
    checkedRadio: { pending: true, completed: false },
    filterFeedbacks: {
      sort: '',
      search: '',
    },
  };

  it('should render DraftItems', async () => {
    const { getByTestId } = render(<DraftItem {...props} />);
    const draft = getByTestId('information');

    expect(draft).toBeInTheDocument();
  });
});
