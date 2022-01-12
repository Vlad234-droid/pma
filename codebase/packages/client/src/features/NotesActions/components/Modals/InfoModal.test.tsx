import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MODAL_WRAPPER } from './InfoModal';
import NotesActions from '../../NotesActions';
import { INFO_ICON } from '../FilterOptions';

it('render info modal', async () => {
  const { getByTestId, queryByTestId, findByTestId } = renderWithTheme(<NotesActions />);
  const infoIcon = getByTestId(INFO_ICON);
  const modalWrapper = queryByTestId(MODAL_WRAPPER);

  expect(infoIcon).toBeInTheDocument();
  expect(modalWrapper).toBeNull();

  fireEvent.click(infoIcon);

  expect(await findByTestId(MODAL_WRAPPER)).toBeInTheDocument();
});
