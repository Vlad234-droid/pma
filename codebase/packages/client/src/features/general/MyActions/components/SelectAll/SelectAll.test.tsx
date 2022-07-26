import React from 'react';
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import { SelectAll } from './SelectAll';

describe('<SelectAll />', () => {
  describe('#render', () => {
    it('should render selectAll ', () => {
      const props = {
        onChange: jest.fn(),
        checked: false,
        indeterminate: false,
        disabled: false,
      };
      render(<SelectAll {...props} />);
      expect(screen.getByTestId('selectAll')).toBeInTheDocument();
      expect(screen.getByTestId('selectAll')).not.toBeDisabled();
      fireEvent.click(screen.getByTestId('selectAll'));

      expect(props.onChange).toBeCalled();
    });

    it('should render selectAll disabled', () => {
      const props = {
        onChange: jest.fn(),
        checked: false,
        indeterminate: false,
        disabled: true,
      };
      render(<SelectAll {...props} />);
      expect(screen.getByTestId('selectAll')).toBeInTheDocument();
      expect(screen.getByTestId('selectAll')).toBeDisabled();
      fireEvent.click(screen.getByTestId('selectAll'));

      expect(props.onChange).toBeCalled();
    });
  });
});
