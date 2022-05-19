import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import SearchInput from './SearchInput';
import { act, fireEvent } from '@testing-library/react';

describe('SearchInput', () => {
  const props = {
    onSearch: jest.fn(),
    onChange: jest.fn(),
    renderOption: jest.fn(),
    options: ['Option 1', 'Option 2'],
    name: 'test-name',
  };

  it('should render SearchInput', async () => {
    const { getByTestId } = render(<SearchInput {...props} />);
    const option = getByTestId(props.name);
    expect(option).toBeInTheDocument();
  });

  it('should call onChange', async () => {
    const { getByTestId } = render(<SearchInput {...props} />);
    const input = getByTestId('test-name');

    await act(async () => {
      fireEvent.change(input, { target: { value: 't' } });
    });

    setTimeout((_) => expect(props.onChange).toBeCalledTimes(1), 500);
  });

  it('should call onSearch', async () => {
    const { getByTestId } = render(<SearchInput {...props} />);
    const input = getByTestId('test-name');

    await act(async () => {
      fireEvent.change(input, { target: { value: 't' } });
    });

    setTimeout((_) => expect(props.onSearch).toBeCalledTimes(1), 500);
  });
});
