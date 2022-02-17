import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import TipsAdministration, { TIPS_ADMINISTRATION } from './TipsAdministration';
import { NO_TIPS_TILE } from 'features/Tips/components/NoTips';

import '@testing-library/jest-dom';

describe('Tips page', () => {
  it('Should render Tips page', async () => {
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <TipsAdministration />
      </BrowserRouter>,
    );
    const timeline = getByTestId(TIPS_ADMINISTRATION);
    const noTips = getByTestId(NO_TIPS_TILE);

    expect(timeline).toBeInTheDocument();
    expect(noTips).toBeInTheDocument();
  });

  //TODO: add test for "Create new tip" button
});
