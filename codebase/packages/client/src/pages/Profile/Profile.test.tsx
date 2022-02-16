import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Profile, { TEST_ID } from './Profile';
import { renderWithTheme as render } from '../../utils/test';
import { AuthProvider } from '../../contexts/authContext';

it('Check Profile', async () => {
  const { queryByTestId } = render(
    <AuthProvider>
      <Profile />
    </AuthProvider>,
  );
  const pageID = queryByTestId(TEST_ID);

  expect(pageID).toBeNull();
});
