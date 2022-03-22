import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import Info, { TEST_ID } from './Info';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('Info', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });
  it('should render Info', async () => {
    renderWithTheme(<Info description='Test info description' />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
