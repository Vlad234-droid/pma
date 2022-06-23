import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import { act, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  const props: any = {
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

  it('should call onSearch', async () => {
    const { getByTestId } = render(<SearchInput {...props} />);
    const input = getByTestId('test-name');

    await act(async () => {
      fireEvent.change(input, { target: { value: 't' } });
    });
    await waitFor(() => expect(props.onSearch).toBeCalledTimes(1));
  });
});
