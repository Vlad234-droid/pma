import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import LeftsideMenu from './LeftsideMenu';

describe('<LeftsideMenu />', () => {
  it('render LeftsideMenu element exist', async () => {
    render(<LeftsideMenu />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/PMA/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/Alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Help/i)).toBeInTheDocument();
  });
});
