import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { Select } from '../Select';

it('render item with placeholder', async () => {
  render(<Select placeholder='this is a placeholder' options={[]} />);

  const placeholder = screen.queryByPlaceholderText(/this is a placeholder/i);

  expect(placeholder).toBeInTheDocument();
});

it('render item without placeholder', async () => {
  render(<Select options={[]} />);

  const placeholder = screen.queryByPlaceholderText(/[.+]/);

  expect(placeholder).not.toBeInTheDocument();
});

it('render item and choose option', async () => {
  const { container } = render(
    <Select
      placeholder='this is a placeholder'
      options={[
        { value: '1', label: 'test 1' },
        { value: '2', label: 'test 2' },
      ]}
    />,
  );

  expect(container.querySelector('input').value).toEqual('');
  expect(screen.queryByText('test 1')).not.toBeInTheDocument();
  fireEvent.click(container.querySelector('input'));
  expect(screen.getByText('test 1')).toBeInTheDocument();
  expect(screen.getByText('test 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('test 1'));
  expect(container.querySelector('input').value).toEqual('test 1');
});
