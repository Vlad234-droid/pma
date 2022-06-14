import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme, screen } from 'utils/test';
import { ReviewType, Status } from 'config/enum';
import ReviewWidget, { TEST_ID } from './ReviewWidget';

describe('ReviewWidget', () => {
  it('should render ReviewWidget', async () => {
    renderWithTheme(<ReviewWidget reviewType={ReviewType.MYR} title={'test'} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('ReviewWidget button not in document', async () => {
    renderWithTheme(<ReviewWidget reviewType={ReviewType.MYR} title={'test'} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('ReviewWidget button in document', async () => {
    renderWithTheme(<ReviewWidget reviewType={ReviewType.MYR} title={'test'} status={Status.STARTED} />);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });
});
