import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import NotesActions, { NOTES_WRAPPER, PLUS_BUTTON, MODAL_BUTTONS } from './NotesActions';

it('Notes page', async () => {
  const { getByTestId, queryByTestId, findByTestId } = renderWithTheme(<NotesActions />);
  const wrapper = getByTestId(NOTES_WRAPPER);
  const plusButton = getByTestId(PLUS_BUTTON);
  const modalButtons = queryByTestId(MODAL_BUTTONS);

  expect(wrapper).toBeInTheDocument();
  expect(modalButtons).not.toBeInTheDocument();
  expect(modalButtons).toBeNull();

  fireEvent.click(plusButton);

  expect(await findByTestId(MODAL_BUTTONS)).toBeInTheDocument();
});
