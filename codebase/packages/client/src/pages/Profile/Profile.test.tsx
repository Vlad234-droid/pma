import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Profile from './index';
import { renderWithTheme as render } from '../../utils/test';
import { AuthProvider } from '../../contexts/authContext';

it('Profile', async () => {
  const { getAllByText } = render(
    <AuthProvider>
      <Profile />
    </AuthProvider>,
  );
  const wrapper = getAllByText('Test fullName');

  expect(wrapper).toHaveLength(2);
});
