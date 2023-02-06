import { renderWithTheme as render, screen } from 'utils/test';
import { ButtonsModifySingleStep } from './index';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('ButtonsModifySingleStep', () => {
  it('does not display confirmation prompt when submit', () => {
    const onSubmit = jest.fn();

    render(<ButtonsModifySingleStep onClose={jest.fn()} isValid onSubmit={onSubmit} />);

    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.queryByText(/Are you sure you want to submit/gi)).not.toBeInTheDocument();
  });
});
