import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import EditTip from './EditTip';
import { TIPS_FORM } from 'features/Tips/components/TipsForm';

describe('Create/Edit Tip page', () => {
  const props = {
    configEntries: {
      data: [],
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      success: true,
    },
    tips: {
      tipsList: [],
      viewHistory: [],
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      currentTip: {},
    },
  };
  it('Should render Create/Edit Tip page', async () => {
    const { getByTestId } = renderWithTheme(
      <BrowserRouter>
        <EditTip />
      </BrowserRouter>,
      { ...props },
    );
    const tipsForm = getByTestId(TIPS_FORM);

    expect(tipsForm).toBeInTheDocument();
  });
});
