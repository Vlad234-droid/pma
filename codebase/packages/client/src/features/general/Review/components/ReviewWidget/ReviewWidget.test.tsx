import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme, screen } from 'utils/test';
import ReviewWidget, { TEST_ID } from './ReviewWidget';

//TODO: fix test in next PR
describe.skip('ReviewWidget', () => {
  it('should render ReviewWidget', async () => {
    renderWithTheme(
      <ReviewWidget
        onClick={jest.fn}
        title={'test'}
        graphic={<div />}
        disabled={false}
        iconColor={'tescoBlue'}
        shadow={false}
        content={'testContent'}
        background={'tescoBlue'}
        buttonText={'testButton'}
      />,
    );
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });

  it('ReviewWidget button not in document', async () => {
    renderWithTheme(
      <ReviewWidget
        onClick={jest.fn}
        title={'test'}
        graphic={<div />}
        disabled={true}
        iconColor={'tescoBlue'}
        shadow={false}
        content={'testContent'}
        background={'tescoBlue'}
        buttonText={'testButton'}
      />,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('ReviewWidget button in document', async () => {
    renderWithTheme(
      <ReviewWidget
        onClick={jest.fn}
        title={'test'}
        graphic={<div />}
        disabled={false}
        iconColor={'tescoBlue'}
        shadow={false}
        content={'testContent'}
        background={'tescoBlue'}
        buttonText={'testButton'}
      />,
    );
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });
});
