import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ADD_NOTE_MODAL_WRAPPER } from './AddNoteModal';

import NotesActions, { ADD_NEW, CONFIRM_MODAL_ID } from '../../../NotesActions';

jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));

it('render add note modal', async () => {
  const { getByTestId, queryByTestId, findByTestId } = render(
    <BrowserRouter>
      <NotesActions loaded={true}/>
    </BrowserRouter>,
  );

  const addNew = getByTestId(ADD_NEW);

  const addBtn = getByTestId(ADD_NEW);
  const addUserNoteModal = queryByTestId(ADD_NOTE_MODAL_WRAPPER);

  expect(addUserNoteModal).toBeNull();

  fireEvent.click(addBtn);

  const confimModal = await findByTestId(CONFIRM_MODAL_ID);

  await waitFor(() => expect(confimModal).toBeInTheDocument());
  fireEvent.click(addNew);

  expect(addUserNoteModal).toBeNull();
});
