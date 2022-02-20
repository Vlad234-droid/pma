// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import Dropdown from './Dropdown';

describe('<Dropdown />', () => {
  const options = [
    {
      value: 'mocked_value_1',
      label: 'mocked_label_1',
    },
    {
      value: 'mocked_value_2',
      label: 'mocked_label_2',
    },
  ];

  const props = {
    name: 'mocked_name',
    options: options,
    placeholder: 'mocked_placeholder',
    onChange: jest.fn(),
  };

  describe('#render', () => {
    it('should render dropdown and wrapper', () => {
      const { getByTestId } = render(<Dropdown {...props} />);

      expect(getByTestId('mocked_name-wrapper')).toBeInTheDocument();
      expect(getByTestId('mocked_name')).toBeInTheDocument();
    });

    it('should render placeholder, if no value passed', () => {
      const { getByText } = render(<Dropdown {...props} />);

      expect(getByText('- mocked_placeholder -')).toBeInTheDocument();
    });

    it('should not render placeholder and render value, if value passed', () => {
      const newProps = {
        ...props,
        value: 'mocked_value_2',
      };

      const { queryByText, getByText } = render(<Dropdown {...newProps} />);

      expect(queryByText('- mocked_placeholder -')).not.toBeInTheDocument();
      expect(getByText('mocked_label_2')).toBeInTheDocument();
    });

    it('should render down arrow by default', () => {
      const { getByTestId } = render(<Dropdown {...props} />);

      expect(getByTestId('arrowdown')).toBeInTheDocument();
    });

    it('should not render list by default', () => {
      const { queryByTestId } = render(<Dropdown {...props} />);

      expect(queryByTestId('mocked_name-list')).not.toBeInTheDocument();
    });

    describe('#handlres', () => {
      it('should display a list on select click', () => {
        const { getByTestId, getByText } = render(<Dropdown {...props} />);

        fireEvent.click(getByTestId('mocked_name'));

        expect(getByTestId('mocked_name-list')).toBeInTheDocument();
        expect(getByText('mocked_label_1')).toBeInTheDocument();
        expect(getByText('mocked_label_2')).toBeInTheDocument();
      });

      it('should call props.onChange on option click', () => {
        const { getByTestId, getByText, queryByTestId, queryByText } = render(<Dropdown {...props} />);

        fireEvent.click(getByTestId('mocked_name'));
        fireEvent.click(getByText('mocked_label_2'));

        expect(props.onChange).toHaveBeenCalledWith('mocked_value_2');
        expect(queryByTestId('mocked_name-list')).not.toBeInTheDocument();
        expect(queryByText('- mocked_placeholder -')).not.toBeInTheDocument();
        expect(getByText('mocked_label_2')).toBeInTheDocument();
      });
    });
  });
});
