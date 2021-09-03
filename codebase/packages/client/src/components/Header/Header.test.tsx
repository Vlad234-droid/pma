import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from 'styles/test-theme-provider';
import Header, { TEST_ID, BACK_BTN_TEST_ID } from './Header';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    goBack: jest.fn(),
  }),
}));

describe('Header', () => {
  const testHandler = jest.fn();
  const testTitle = 'test title';

  it('should render Header', async () => {
    const { queryByTestId } = render(<Header title={testTitle} />);

    const header = queryByTestId(TEST_ID);
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(testTitle);
  });

  it('while click on back btn', async () => {
    const { queryByTestId } = render(<Header title={testTitle} />);
    const backBtn = queryByTestId(BACK_BTN_TEST_ID);
    fireEvent.click(backBtn);

    expect(testHandler).not.toHaveBeenCalledTimes(1);
  });

  it('while click on back btn with custom handler', async () => {
    const { queryByTestId } = render(<Header title={testTitle} onBack={testHandler} />);
    const backBtn = queryByTestId(BACK_BTN_TEST_ID);
    fireEvent.click(backBtn);

    expect(testHandler).toHaveBeenCalledTimes(1);
  });
});
