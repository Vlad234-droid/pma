import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import { MenuDrawer } from './MenuDrawer';

describe('<MenuDrawer />', () => {
  it('render MenuDrawer close event', async () => {
    const onClose = jest.fn();
    render(
      <BrowserRouter>
        <MenuDrawer onClose={onClose} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cancel'));
    expect(onClose).toBeCalled();
    // cancel
  });
});
