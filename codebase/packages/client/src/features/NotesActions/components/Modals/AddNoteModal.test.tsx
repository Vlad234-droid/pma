import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ADD_NOTE_MODAL_WRAPPER } from './AddNoteModal';

import NotesActions, { ADD_NEW, CONFIRM_MODAL_ID } from '../../NotesActions';

jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));

it('render add note modal', async () => {
  const { getByTestId, queryByTestId, findByTestId } = renderWithTheme(
    <BrowserRouter>
      <NotesActions />
    </BrowserRouter>
  );

  const addBtn = getByTestId(ADD_NEW);
  const addUserNoteModal = queryByTestId(ADD_NOTE_MODAL_WRAPPER);

  expect(addUserNoteModal).toBeNull();

  fireEvent.click(addBtn);
  
  const confimModal = await findByTestId(CONFIRM_MODAL_ID);

  await waitFor(() => expect(confimModal).toBeInTheDocument());
});
