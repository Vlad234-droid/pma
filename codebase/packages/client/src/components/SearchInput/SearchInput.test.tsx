import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithTheme as render } from 'utils/test';

import SearchInput from './SearchInput';

describe('<SearchInput />', () => {
  const props = {
    onSearch: jest.fn(),
    onChange: jest.fn(),
    onDelete: jest.fn(),
    onClear: jest.fn(),
    renderOption: (option) => <div>{option}</div>,
    value: 'mocked_value',
    name: 'mocked_name',
  };

  describe('#render', () => {
    it('should render input with passed value', () => {
      const { getByTestId } = render(<SearchInput {...props} />);

      expect(getByTestId('mocked_name')).toBeInTheDocument();
      expect(getByTestId('mocked_name')).toHaveValue('mocked_value');
    });

    it('should render options, if passed', () => {
      const newProps = {
        ...props,
        options: ['opt_1', 'opt_2'],
      };

      const { queryByText, getByText, getAllByText } = render(<SearchInput {...newProps} />);

      expect(getByText('opt_1')).toBeInTheDocument();
      expect(getAllByText('opt_1')).toHaveLength(1);
      expect(getByText('opt_2')).toBeInTheDocument();
      expect(queryByText('Clear all')).not.toBeInTheDocument();
    });

    it('should render selected items and clear button, if some selected', () => {
      const newProps = {
        ...props,
        options: ['opt_1', 'opt_2'],
        multiple: true,
        selected: [
          { label: 'opt_1', value: 'opt_1' }
        ],
      };

      const { getAllByText, getByText } = render(<SearchInput {...newProps} />);

      expect(getAllByText('opt_1')).toHaveLength(2);
      expect(getByText('Clear all')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call onChange on option click', () => {
      const newProps = {
        ...props,
        options: ['opt_1', 'opt_2'],
      };

      const { getByText, getByTestId } = render(<SearchInput {...newProps} />);

      fireEvent.click(getByText('opt_1'));

      expect(newProps.onChange).toHaveBeenCalledWith('opt_1');
      expect(getByTestId('mocked_name')).toHaveValue('mocked_value');
    });
  });

  it('should call onChange and update value to empty on option click, if multiple', () => {
    const newProps = {
      ...props,
      options: ['opt_1', 'opt_2'],
      multiple: true,
      selected: [
        { label: 'opt_1', value: 'opt_1' }
      ],
    };

    const { getByText, getByTestId } = render(<SearchInput {...newProps} />);

    fireEvent.click(getByText('opt_2'));

    expect(newProps.onChange).toHaveBeenCalledWith('opt_2');
    expect(getByTestId('mocked_name')).not.toHaveValue('mocked_value');
    expect(getByTestId('mocked_name')).toHaveValue('');
  });

  it('should call props.onDelete on remove selected item click', () => {
    const newProps = {
      ...props,
      options: ['opt_1', 'opt_2'],
      multiple: true,
      selected: [
        { label: 'opt_1', value: 'opt_1' }
      ],
    };

    const { getByTestId } = render(<SearchInput {...newProps} />);

    fireEvent.click(getByTestId('remove-selected-opt_1'));

    expect(newProps.onDelete).toHaveBeenCalledWith('opt_1');
  });

  it('should call props.onClear on clear button click', () => {
    const newProps = {
      ...props,
      options: ['opt_1', 'opt_2'],
      multiple: true,
      selected: [
        { label: 'opt_1', value: 'opt_1' }
      ],
    };

    const { getByTestId } = render(<SearchInput {...newProps} />);

    fireEvent.click(getByTestId('clear-button'));

    expect(newProps.onClear).toHaveBeenCalled();
  });

  it('should set new value and call props.onSearch on input change', () => {
    jest.useFakeTimers();

    const newProps = {
      ...props,
      options: ['opt_1', 'opt_2'],
      multiple: true,
      selected: [
        { label: 'opt_1', value: 'opt_1' }
      ],
    };

    const { getByTestId } = render(<SearchInput {...newProps} />);

    fireEvent.change(getByTestId('mocked_name'), { target: { value: 'new_mocked_value' } });

    expect(getByTestId('mocked_name')).toHaveValue('new_mocked_value');

    jest.advanceTimersByTime(300);

    expect(props.onSearch).toHaveBeenCalled();
  });
});

