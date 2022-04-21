import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import HistoryTable, { TEST_ID } from './HistoryTable';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('HistoryTable', () => {
  const props = {
    headers: ['Header 1', 'Header 2', 'Header 3'],
    items: [
      {
        id: 'id1',
        updatedTime: '',
        updatedBy: {
          firstName: 'Name',
          lastName: 'Surname',
        },
        action: 'DRAFT',
      },
    ],
    isVisible: true,
  };

  window.HTMLElement.prototype.scrollTo = function () {};

  it('#render', async () => {
    const { queryByTestId } = render(<HistoryTable {...props} />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });
});
