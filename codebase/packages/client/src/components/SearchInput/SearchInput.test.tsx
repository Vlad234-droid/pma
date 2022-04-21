import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  const props = {
    onSearch: jest.fn(),
    onChange: jest.fn(),
    renderOption: jest.fn(),
    options: ['Option 1', 'Option 2'],
    name: 'name',
  };

  it('should render SearchInput', async () => {
    const { getByTestId } = render(<SearchInput {...props} />);
    const option = getByTestId(props.name);
    expect(option).toBeInTheDocument();
  });
});
