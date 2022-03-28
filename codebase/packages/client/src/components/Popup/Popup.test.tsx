import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from '../../utils/test';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Popup, { TEST_ID } from './Popup';

describe('Popup', () => {
  const props = [
    {
      title: 'Test title',
      uuid: '123456789',
    },
  ];

  it('should NOT render Popup', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Popup items={[]} />
      </BrowserRouter>,
    );

    const body = queryByTestId(TEST_ID);
    expect(body).not.toBeInTheDocument();
  });

  it('should render Popup', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Popup items={[...props]} />
      </BrowserRouter>,
    );

    const body = queryByTestId(TEST_ID);
    expect(body).toBeInTheDocument();
  });
});
