import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { Input } from '../Input';
import { fireEvent } from '@testing-library/react';

it('render item with placeholder', async () => {
  render(<Input onChange={jest.fn()} placeholder='this is a placeholder' />);

  const placeholder = screen.queryByPlaceholderText(/this is a placeholder/i);

  expect(placeholder).toBeInTheDocument();
});

it('render item without placeholder', async () => {
  render(<Input onChange={jest.fn()} />);

  const placeholder = screen.queryByPlaceholderText(/[.+]/);

  expect(placeholder).not.toBeInTheDocument();
});

it('check onChange event', async () => {
  const props = {
    onChange: jest.fn(),
    name: 'test-id',
  };
  const { getByTestId } = render(<Input {...props} />);

  const inputEl = getByTestId(`input-${props.name}`);

  fireEvent.change(inputEl, { target: { value: 'Some test data' } });

  expect(await props.onChange).toHaveBeenCalledTimes(1);
});
