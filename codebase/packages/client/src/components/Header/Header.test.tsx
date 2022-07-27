import React, { Suspense } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';

import Header, { TEST_ID, BACK_BTN_TEST_ID, MENU_BTN } from './Header';
import { MENU_DRAWER_WRAPPER } from 'features/general/MenuDrawer/MenuDrawer';

jest.mock('@pma/store', () => ({
  ...(jest.requireActual('@pma/store') as any),
  getTopMenuData: jest.fn(),
  getBottomMenuData: jest.fn(),
}));

const menuData = {
  data: {
    top: [{ key: 'notes' }],
    bottom: [{ key: 'notes' }],
  },
  meta: { loading: false, loaded: true },
};


describe('Header', () => {
  const testHandler = jest.fn();
  const testTitle = 'test title';

  it('should render Header', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>...Loading</div>}>
          <Header title={testTitle} />
        </Suspense>
      </BrowserRouter>,
      { menuData },
    );

    const header = queryByTestId(TEST_ID);
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(testTitle);
  });

  it('while click on back btn', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>...Loading</div>}>
          <Header title={testTitle} />
        </Suspense>
      </BrowserRouter>,
      { menuData },
    );
    const backBtn = queryByTestId(BACK_BTN_TEST_ID);
    expect(backBtn).not.toBeInTheDocument();
  });

  it.skip('while click on back btn with custom handler', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>...Loading</div>}>
          <Header title={testTitle} />
        </Suspense>
      </BrowserRouter>,
      { menuData },
    );
    const backBtn = getByTestId(BACK_BTN_TEST_ID);
    fireEvent.click(backBtn);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });

  it('should open menu', async () => {
    const { queryByTestId, getByTestId, findByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<div>...Loading</div>}>
          <Header title={testTitle} />
        </Suspense>
      </BrowserRouter>,
      { menuData },
    );

    const header = queryByTestId(TEST_ID);
    expect(header).toBeInTheDocument();

    const menuBtn = getByTestId(MENU_BTN);
    expect(menuBtn).toBeInTheDocument();

    fireEvent.click(menuBtn);

    expect(await findByTestId(MENU_DRAWER_WRAPPER)).toBeInTheDocument();
  });
});
