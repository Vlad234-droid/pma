import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithTheme as render } from 'utils/test';

import Sorting from './Sorting';
import { SortBy } from '../../config/types';

describe('<Sorting />', () => {
  const props = {
    isOpen: true,
    onClick: jest.fn(),
    value: SortBy.AZ,
    onSort: jest.fn(),
    sortingOptions: [
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
    it('should render correctly', () => {
      const { getByRole, getByTestId } = render(
        <Sorting {...props} />,
      );

      expect(getByRole('button')).toBeInTheDocument();
      expect(getByTestId('sorting-modal')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClick on icon click', () => {
      const { getByTestId } = render(
        <Sorting {...props} />,
      );

      fireEvent.click(getByTestId('settings'));
      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
