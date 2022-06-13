import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';

import Header, { TEST_ID, BACK_BTN_TEST_ID, MENU_BTN } from './Header';
import { MENU_DRAWER_WRAPPER } from 'features/general/MenuDrawer/MenuDrawer';

describe('Header', () => {
  const testHandler = jest.fn();
  const testTitle = 'test title';

  it('should render Header', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Header title={testTitle} />
      </BrowserRouter>,
    );

    const header = queryByTestId(TEST_ID);
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(testTitle);
  });

  it('while click on back btn', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Header title={testTitle} />
      </BrowserRouter>,
    );
    const backBtn = queryByTestId(BACK_BTN_TEST_ID);
    expect(backBtn).not.toBeInTheDocument();
  });

  it('while click on back btn with custom handler', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Header title={testTitle} onBack={testHandler} />
      </BrowserRouter>,
    );
    const backBtn = getByTestId(BACK_BTN_TEST_ID);
    fireEvent.click(backBtn);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });

  it('should open menu', async () => {
    const { queryByTestId, getByTestId, findByTestId } = render(
      <BrowserRouter>
        <Header title={testTitle} />
      </BrowserRouter>,
    );

    const header = queryByTestId(TEST_ID);
    expect(header).toBeInTheDocument();

    const menuBtn = getByTestId(MENU_BTN);
    expect(menuBtn).toBeInTheDocument();

    fireEvent.click(menuBtn);

    expect(await findByTestId(MENU_DRAWER_WRAPPER)).toBeInTheDocument();
  });
});
