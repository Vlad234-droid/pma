import React from 'react';
import { useForm } from 'react-hook-form';
import { fireEvent } from '@testing-library/react';
import { Input, Item } from 'components/Form';

import { renderWithTheme as render } from 'utils/test';

import { GenericItemField } from './GenericItemField';

describe('<GenericItemField />', () => {
  const baseProps = {
    name: 'mocked_name',
    label: 'mocked_label',
    value: 'mocked_value',
    Element: Input,
    Wrapper: Item,
    onChange: jest.fn(),
  };

  it('should render element and wrapper if passed', () => {
    const Component = () => {
      const methods = useForm({});
      const props = {
        ...baseProps,
        methods,
      };

      return <GenericItemField {...props} />;
    };

    const { getByTestId, getByText } = render(<Component />);

    expect(getByTestId('generic-item-wrapper')).toBeInTheDocument();
    expect(getByTestId('generic-item-element')).toBeInTheDocument();
    expect(getByText('mocked_label')).toBeInTheDocument();
  });

  it('should render element and wrapper if label passed', () => {
    const Component = () => {
      const methods = useForm({});
      const props = {
        ...baseProps,
        Wrapper: undefined,
        methods,
      };

      return <GenericItemField {...props} />;
    };

    const { getByTestId } = render(<Component />);

    expect(getByTestId('generic-item-element')).toBeInTheDocument();
    expect(getByTestId('generic-item-wrapper')).toBeInTheDocument();
  });

  it('should render value passed', () => {
    const Component = () => {
      const methods = useForm({});
      const props = {
        ...baseProps,
        methods,
      };

      return <GenericItemField {...props} />;
    };

    const { getByTestId } = render(<Component />);

    expect(getByTestId('input-mocked_name')).toBeInTheDocument();
    expect(getByTestId('input-mocked_name')).toHaveValue('mocked_value');
  });

  it('should render options, if passed', () => {
    const Component = () => {
      const methods = useForm({});
      const props = {
        ...baseProps,
        methods,
        options: [
          { value: 'mocked_option_1', label: 'mocked_option_1' },
          { value: 'mocked_option_2', label: 'mocked_option_2' },
        ],
      };

      return <GenericItemField {...props} />;
    };

    const { getByTestId } = render(<Component />);

    expect(getByTestId('mocked_option_1')).toBeInTheDocument();
    expect(getByTestId('mocked_option_2')).toBeInTheDocument();
  });

  it('should update value and call handler', () => {
    const Component = () => {
      const methods = useForm({});
      const props = {
        ...baseProps,
        methods,
      };

      return <GenericItemField {...props} />;
    };

    const { getByTestId } = render(<Component />);

    fireEvent.change(getByTestId('input-mocked_name'), { target: { value: 'new_mocked_value' } });

    expect(getByTestId('input-mocked_name')).toHaveValue('new_mocked_value');
    expect(baseProps.onChange).toHaveBeenCalledWith('new_mocked_value');
  });
});
