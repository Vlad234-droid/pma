import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MODAL_WRAPPER } from './InfoModal';
import NotesActions from '../../../../NotesActions';
import { INFO_ICON } from '../../FilterOptions/FilterOptions';

it('render info modal', async () => {
  const { getByTestId, queryByTestId, findByTestId } = render(
    <BrowserRouter>
      <NotesActions />
    </BrowserRouter>,
  );
  const infoIcon = getByTestId(INFO_ICON);
  const modalWrapper = queryByTestId(MODAL_WRAPPER);

  expect(infoIcon).toBeInTheDocument();
  expect(modalWrapper).toBeNull();

  fireEvent.click(infoIcon);

  expect(await findByTestId(MODAL_WRAPPER)).toBeInTheDocument();
});
