import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';

import MainFolders, { FOLDER_WRAPPER } from './MainFolders';

describe('Main Folders', () => {
  const props = {
    isLineManager: true,
    searchValue: '',
  };

  it('it should render personal folder wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MainFolders {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(FOLDER_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
