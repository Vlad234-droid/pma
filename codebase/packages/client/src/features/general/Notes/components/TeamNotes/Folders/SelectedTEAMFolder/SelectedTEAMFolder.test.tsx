import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import SelectedTEAMFolder, { TEAM_WRAPPER, BUTTONS_DOTS } from './SelectedTEAMFolder';
import { NotesContext } from 'features/general/Notes/contexts/notesContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SelectedTEAMFolder folder', () => {
  const setFoldersWithNotesTEAM = jest.fn();
  const setConfirmTEAMModal = jest.fn();

  const archiveMode = { user: false, team: false };
  const note = {
    content: 'test',
    id: 'b72fdbb8-0fe3-443c-9c7c-9f3a67a2a027',
    ownerColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
    status: 'CREATED',
    title: 'test',
    updateTime: '2022-07-25T09:22:55.891Z',
    referenceColleagueUuid: false,
  };
  const foldersWithNotesTEAM = [
    {
      id: '10000000-0000-0000-0000-10000000000',
      notes: [note],
      ownerColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
      quantity: 0,
      selectedDots: false,
      title: 'All notes',
    },
    {
      id: '01570ca9-bb1f-4147-94d8-4072ef6b7f03',
      notes: [note],
      ownerColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
      parentFolderUuid: 'c46fba58-178a-4240-be52-7b97a19c539e',
      quantity: 1,
      selectedDots: false,
      title: 'test folder',
    },
  ];

  const value = {
    archiveMode,
    foldersWithNotesTEAM,
    setFoldersWithNotesTEAM,
  };

  const props = {
    setConfirmTEAMModal,
    actionTEAMModal: { current: null },
    teamActions: { folderId: null, noteId: null, folderUuid: null },
  };

  const initialState = {
    notes: {
      folders: [
        {
          id: '01570ca9-bb1f-4147-94d8-4072ef6b7f03',
          ownerColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
          parentFolderUuid: '3d667c3d-6aa2-44a1-aa3c-ebaaf8e5964c',
          title: 'test folder',
        },
      ],
    },
  };
  const location = {
    ...window.location,
    search: '?folder=01570ca9-bb1f-4147-94d8-4072ef6b7f03',
  };
  Object.defineProperty(window, 'location', {
    value: location,
    writable: true,
  });
  it('render selected folder wrapper', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider value={value as any}>
        <BrowserRouter>
          <SelectedTEAMFolder {...props} />
        </BrowserRouter>
      </NotesContext.Provider>,
      initialState,
    );

    expect(getByTestId(TEAM_WRAPPER)).toBeInTheDocument();
  });
  it('it should render folder title', async () => {
    const { getByText } = render(
      <NotesContext.Provider value={value as any}>
        <BrowserRouter>
          <SelectedTEAMFolder {...props} />
        </BrowserRouter>
      </NotesContext.Provider>,
      initialState,
    );
    const title = getByText(/test folder/i);
    expect(title).toBeInTheDocument();
  });
  it('it should render dots modal', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider value={value as any}>
        <BrowserRouter>
          <SelectedTEAMFolder {...props} />
        </BrowserRouter>
      </NotesContext.Provider>,
      initialState,
    );
    const dots = getByTestId('dots');
    fireEvent.click(dots);
    const modal = getByTestId(BUTTONS_DOTS);
    expect(modal).toBeInTheDocument();
  });
  it('it should call setConfirmModal prop', async () => {
    const { getByTestId } = render(
      <NotesContext.Provider value={value as any}>
        <BrowserRouter>
          <SelectedTEAMFolder {...props} />
        </BrowserRouter>
      </NotesContext.Provider>,
      initialState,
    );

    const dots = getByTestId('dots');
    fireEvent.click(dots);
    expect(getByTestId(BUTTONS_DOTS)).toBeInTheDocument();

    fireEvent.click(getByTestId('backdrop-delete'));
    fireEvent.click(getByTestId('backdrop-delete-icon'));
    expect(setConfirmTEAMModal).toHaveBeenCalled();
  });
  it('it should call setConfirmTEAMModal prop', async () => {
    note.referenceColleagueUuid = true;
    const { getByTestId } = render(
      <NotesContext.Provider
        value={
          {
            ...value,
          } as any
        }
      >
        <BrowserRouter>
          <SelectedTEAMFolder {...props} />
        </BrowserRouter>
      </NotesContext.Provider>,
      initialState,
    );

    const dots = getByTestId('dots');
    fireEvent.click(dots);
    expect(getByTestId(BUTTONS_DOTS)).toBeInTheDocument();

    fireEvent.click(getByTestId('backdrop-folder'));
    fireEvent.click(getByTestId('backdrop-folder-icon'));
    expect(setConfirmTEAMModal).toHaveBeenCalled();
  });
});
