import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { ADD_NOTE_MODAL_WRAPPER } from './AddNoteModal';
import NotesActions from '../../NotesActions';

import { PLUS_BUTTON, PLUS_PERSONAL_NOTE } from '../../NotesActions';

jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));

it('render add note modal', async () => {
  const { getByTestId, queryByTestId, findByTestId } = renderWithTheme(<NotesActions />);

  const plusBtn = getByTestId(PLUS_BUTTON);

  const addUserNoteModal = queryByTestId(ADD_NOTE_MODAL_WRAPPER);
  expect(addUserNoteModal).toBeNull();
  fireEvent.click(plusBtn);
  const btnPersonalNote = await findByTestId(PLUS_PERSONAL_NOTE);

  await waitFor(() => expect(btnPersonalNote).toBeInTheDocument());

  //fireEvent.click(btnPersonalNote);
  expect(addUserNoteModal).toBeNull();
});
