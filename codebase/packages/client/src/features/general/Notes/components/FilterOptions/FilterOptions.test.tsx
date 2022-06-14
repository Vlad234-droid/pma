import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import FilterOption, { FILTER_WRAPPER } from './FilterOptions';

it('render filter component', async () => {
  const testHandler = jest.fn();

  const { getByTestId } = renderWithTheme(
    <FilterOption onSearch={''} setSearchValueFilterOption={jest.fn} title={''} onClickInfo={testHandler} />,
  );

  const filterWrapper = getByTestId(FILTER_WRAPPER);
  expect(filterWrapper).toBeInTheDocument();
});
