import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import { MenuItem, TEST_ID } from './MenuItem';
import { BrowserRouter } from 'react-router-dom';

describe('MenuItem', () => {
  it('#render', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <MenuItem iconGraphic={'home'} title={'Test title'} />
      </BrowserRouter>,
    );
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });
});
