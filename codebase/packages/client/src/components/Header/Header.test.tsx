import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';

import Header, { TEST_ID, BACK_BTN_TEST_ID } from './Header';

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
    const { queryByTestId } = render(
      <BrowserRouter>
        <Header title={testTitle} onBack={testHandler} />
      </BrowserRouter>,
    );
    const backBtn = queryByTestId(BACK_BTN_TEST_ID);
    fireEvent.click(backBtn);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
