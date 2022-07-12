import React, { Suspense } from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import MenuDrawer from './MenuDrawer';

describe('<MenuDrawer />', () => {
  it('render MenuDrawer close event', async () => {
    const menuData = {
      data: {
        top: [{ key: 'notes' }],
        bottom: [{ key: 'notes' }],
      },
      meta: { loading: false, loaded: true },
    };
    const onClose = jest.fn();
    render(
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <MenuDrawer onClose={onClose} />
        </Suspense>
      </BrowserRouter>,
      { menuData },
    );

    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cancel'));
    expect(onClose).toBeCalled();
  });
});
