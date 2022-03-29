import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import NotesActions, { NOTES_WRAPPER, ADD_NEW, CONFIRM_MODAL_ID } from './NotesActions';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('Note page', () => {
  it('render confirm modal', async () => {
    const { getByTestId, queryByTestId, findByTestId } = renderWithTheme(<NotesActions />);

    const addButton = getByTestId(ADD_NEW);
    const confirmModal = queryByTestId(CONFIRM_MODAL_ID);

    expect(confirmModal).toBeNull();

    fireEvent.click(addButton);

    expect(await findByTestId(CONFIRM_MODAL_ID)).toBeInTheDocument();
  });
  it('it should render notes wrapper', async () => {
    const { getByTestId } = renderWithTheme(<NotesActions />);

    const wrapper = getByTestId(NOTES_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
