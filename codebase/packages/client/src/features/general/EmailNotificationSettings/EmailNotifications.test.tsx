import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import EmailNotificationSettings, { TEST_ID } from './EmailNotificationSettings';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('EmailNotifications', () => {
  it('should render', async () => {
    const { queryByTestId } = render(<EmailNotificationSettings />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });
});
