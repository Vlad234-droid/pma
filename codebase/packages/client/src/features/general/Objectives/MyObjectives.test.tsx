import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import * as pdfRenderer from '@pma/pdf-renderer';
import MyObjectives, { TEST_ID } from './MyObjectives';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

jest.mock('@pma/pdf-renderer', () => {
  return {
    __esModule: true,
    usePDF: () => {
      return ['mock', () => true];
    },
    canShowMyReview: false,
  };
});

describe.skip('MyObjectives', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });
  it('should render MyObjectives', async () => {
    renderWithTheme(<MyObjectives />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('should render ReviewWidget', async () => {
    renderWithTheme(<MyObjectives />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
