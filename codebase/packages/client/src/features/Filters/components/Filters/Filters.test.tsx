import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithTheme as render } from 'utils/test';

import Filters from './Filters';
import { SortBy } from '../../config/types';

describe('<Filters />', () => {
  const props = {
    sortValue: SortBy.AZ,
    onSort: jest.fn(),
    onSearch: jest.fn(),
    searchValue: 'mocked_value',
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
      const { getByTestId } = render(
        <Filters {...props} />,
      );

      expect(getByTestId('search-wrapper')).toBeInTheDocument();
      expect(getByTestId('sorting-wrapper')).toBeInTheDocument();
    });
  });

  describe('#handleSortOpen', () => {
    it('should open sorting and close search on sort icon click', () => {
      const { getByTestId } = render(
        <Filters {...props} />,
      );

      fireEvent.focus(getByTestId('search-input')); // open search
      fireEvent.click(getByTestId('settings')); // open sort

      // check search is closed
      expect(getByTestId('search-wrapper')).toHaveStyle('width: 38px');
      // check sort is open
      expect(getByTestId('sorting-modal')).toHaveStyle('transform: scaleY(1)');
    });
  });

  describe('#handleSearchOpen', () => {
    it('should open search and close sorting', () => {
      const { getByTestId } = render(
        <Filters {...props} />,
      );

      fireEvent.click(getByTestId('settings')); // open sort
      fireEvent.focus(getByTestId('search-input')); // open search

      // check sort is closed
      expect(getByTestId('sorting-modal')).toHaveStyle('transform: scaleY(0)');

      // check search is open
      expect(getByTestId('search-wrapper')).toHaveStyle('width: 240px');
    });
  });

  describe('#handleSearch', () => {
    it('should call props.onSearch with searched value', () => {
      const { getByTestId } = render(
        <Filters {...props} />,
      );

      fireEvent.focus(getByTestId('search-input'));
      fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'new_mocked_value' } });

      expect(props.onSearch).toHaveBeenCalledWith('new_mocked_value');
    });
  });

  describe('#handleSort', () => {
    it('should call onSort with selected value and close sorting', () => {
      const { getByTestId, getByText } = render(
        <Filters {...props} />,
      );

      fireEvent.click(getByTestId('settings')); // open sort
      fireEvent.click(getByText('ZA')); // select another sorting

      expect(props.onSort).toHaveBeenCalledWith('ZA');
      // check sort is closed
      expect(getByTestId('sorting-modal')).toHaveStyle('transform: scaleY(0)');
    });
  });
});
