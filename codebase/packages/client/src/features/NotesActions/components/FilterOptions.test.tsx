import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import FilterOption, { FILTER_WRAPPER } from './FilterOptions';

it('render filter component', async () => {
  const testHandler = jest.fn();

  const { getByTestId, getByDisplayValue } = renderWithTheme(
    <FilterOption
      focus={false}
      setFocus={testHandler}
      searchValueFilterOption='note'
      setSearchValueFilterOption={testHandler}
      TEAM={false}
      setInfoModal={testHandler}
    />,
  );

  const filterWrapper = getByTestId(FILTER_WRAPPER);
  const input = getByDisplayValue('note');
  expect(input).not.toHaveFocus();
  input.focus();
  fireEvent.change(input, { target: { value: 'note' } });

  expect(input.value).toBe('note');
  expect(input.value).toHaveLength(4);

  expect(input).toHaveFocus();
  expect(filterWrapper).toBeInTheDocument();
});
