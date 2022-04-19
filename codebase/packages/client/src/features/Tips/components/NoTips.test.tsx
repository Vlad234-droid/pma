import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import NoTips, { NO_TIPS_TILE } from './NoTips';

describe('No-tips tile', () => {
  it('should render no-tips tile', async () => {
    const { getByTestId } = renderWithTheme(<NoTips />);
    const noTipsTile = getByTestId(NO_TIPS_TILE);

    expect(noTipsTile).toBeInTheDocument();
  });
});
