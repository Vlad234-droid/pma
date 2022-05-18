import React from 'react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { MenuDropdown, DROPDOWN_ITEMS_WRAPPER, DROPDOWN_BTN } from './MenuDropdown';

describe('<MenuDropdown />', () => {
  it('should render dropdown', async () => {
    const { getByTestId, queryByTestId, findByTestId } = render(
      <BrowserRouter>
        <MenuDropdown />
      </BrowserRouter>,
    );

    const dropdownBtn = getByTestId(DROPDOWN_BTN);
    expect(dropdownBtn).toBeInTheDocument();
    expect(queryByTestId(DROPDOWN_ITEMS_WRAPPER)).toBeNull();

    fireEvent.click(dropdownBtn);

    expect(await findByTestId(DROPDOWN_ITEMS_WRAPPER)).toBeInTheDocument();
  });
});
