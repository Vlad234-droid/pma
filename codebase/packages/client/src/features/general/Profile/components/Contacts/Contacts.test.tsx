import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import Contacts from './Contacts';

describe('Contacts component', () => {
  const user = {
    email: 'mocked_email',
  };

  it('it should render Contacts content', async () => {
    const { getByText } = render(<Contacts user={user} />);
    const email = getByText(user.email);
    const title = getByText(/contacts/i);
    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
