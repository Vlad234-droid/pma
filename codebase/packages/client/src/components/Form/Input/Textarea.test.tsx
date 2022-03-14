import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';

import { Textarea } from '../Input';

describe('', () => {
  let onChange;
  beforeEach(() => {
    onChange = jest.fn();
  });
  afterEach(() => {
    onChange.mockRestore();
  });
  it('render item with placeholder', async () => {
    render(<Textarea placeholder='this is a placeholder' onChange={onChange} />);

    const placeholder = screen.queryByPlaceholderText(/this is a placeholder/i);

    expect(placeholder).toBeInTheDocument();
  });

  it('render item without placeholder', async () => {
    render(<Textarea onChange={onChange} />);

    const placeholder = screen.queryByPlaceholderText(/[.+]/);

    expect(placeholder).not.toBeInTheDocument();
  });
});
