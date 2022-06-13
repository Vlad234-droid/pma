// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import SortingModal from './SortingModal';
import { SortBy } from '../../config/types';

describe('<SortingModal />', () => {
  const props = {
    onSelect: jest.fn(),
    isOpen: true,
    value: SortBy.AZ,
    options: [
      {
        id: SortBy.AZ,
        label: SortBy.AZ,
        text: SortBy.AZ,
      },
      {
        id: SortBy.ZA,
        label: SortBy.ZA,
        text: SortBy.ZA,
      },
    ],
  };

  describe('#render', () => {
    it('should render provided options', () => {
      const { getByText } = render(<SortingModal {...props} />);

      expect(getByText('ZA')).toBeInTheDocument();
      expect(getByText('AZ')).toBeInTheDocument();
    });

    it('should render provided options', () => {
      const { getByTestId } = render(<SortingModal {...props} />);

      expect(getByTestId('AZ')).toBeChecked();
    });

    it('should render opened styles if isOpen', () => {
      const { getByTestId } = render(<SortingModal {...props} />);

      expect(getByTestId('sorting-modal')).toHaveStyle('transform: scaleY(1)');
    });

    it('should render closed styles if !isOpen', () => {
      const newProps = {
        ...props,
        isOpen: false,
      };

      const { getByTestId } = render(<SortingModal {...newProps} />);

      expect(getByTestId('sorting-modal')).toHaveStyle('transform: scaleY(0)');
    });
  });

  describe('#handlers', () => {
    it('should call onSelect with selected value', () => {
      const { getByTestId, getByText } = render(<SortingModal {...props} />);

      fireEvent.click(getByText('ZA'));

      expect(props.onSelect).toHaveBeenCalledWith('ZA');
      expect(getByTestId('AZ')).toBeChecked();
    });
  });
});
