import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Profile, { TEST_ID } from './Profile';
import { renderWithTheme as render, screen } from 'utils/test';
import { AuthProvider } from 'contexts/authContext';

it('Check Profile', async () => {
  render(
    <AuthProvider>
      <Profile />
    </AuthProvider>,
  );
  const pageID = screen.queryByTestId(TEST_ID);

  expect(pageID).not.toBeNull();
  expect(screen.getAllByText('Test fullName').length).toEqual(2);
});
