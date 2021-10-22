import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Profile';
import { renderWithTheme as render } from 'utils/test';
import { AuthProvider } from 'contexts/authContext';

it('Profile', async () => {
  const { getAllByText } = render(
    <AuthProvider>
      <Settings />
    </AuthProvider>,
  );
  const wrapper = getAllByText('Test fullName');

  expect(wrapper).toHaveLength(2);
});
