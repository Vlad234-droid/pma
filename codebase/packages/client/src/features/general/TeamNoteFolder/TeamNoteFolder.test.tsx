import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import TeamNoteFolder, { MODAL_WRAPPER } from './TeamNoteFolder';
import { FORM_WRAPPER } from './components/TeamNoteFolderForm/TeamNoteFolderForm';
import { SUCCESS_MODAL_WRAPPER } from 'components/SuccessNotesModal/SuccessNotesModal';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TeamNoteFolder feature', () => {
  it('it should render TeamNoteFolder wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNoteFolder />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render note form', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNoteFolder />
      </BrowserRouter>,
    );
    const form = getByTestId(FORM_WRAPPER);
    expect(form).toBeInTheDocument();
  });
  it('it should render Success modal', async () => {
    const notes = { meta: { created: true } };
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNoteFolder />
      </BrowserRouter>,
      { notes },
    );

    expect(getByTestId(SUCCESS_MODAL_WRAPPER)).toBeInTheDocument();
  });
});
