import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Settings';
import { renderWithTheme as render, screen } from 'utils/test';

jest.mock('features/general/EmailNotifications', () => {
  return {
    __esModule: true,
    EmailNotifications: () => {
      return <div>mocked_EmailNotifications</div>;
    },
  };
});

describe('<Settings />', () => {
  it('Settings render', async () => {
    render(<Settings />);
    expect(screen.getByText('mocked_EmailNotifications')).toBeInTheDocument();
  });
});
