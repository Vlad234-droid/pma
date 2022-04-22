import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import TipsAdministration, { TIPS_ADMINISTRATION } from './TipsAdministration';

describe('Tips page', () => {
  it('Should render Tips page', async () => {
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <TipsAdministration />
      </BrowserRouter>,
    );
    const tipsAdministration = getByTestId(TIPS_ADMINISTRATION);

    expect(tipsAdministration).toBeInTheDocument();
  });
});
