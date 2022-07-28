import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import PersonalNoteFolder, { MODAL_WRAPPER, ARROW_RIGHT } from './PersonalNoteFolder';
import { FORM_WRAPPER } from './components/PersonalNoteFolderForm/PersonalNoteFolderForm';
import { SUCCESS_MODAL_WRAPPER } from 'components/SuccessNotesModal/SuccessNotesModal';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('PersonalNote feature', () => {
  it('it should render personal note wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNoteFolder />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render back path icon', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNoteFolder />
      </BrowserRouter>,
    );
    const icon = getByTestId(ARROW_RIGHT);
    expect(icon).toBeInTheDocument();
  });
  it('it should render note form', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNoteFolder />
      </BrowserRouter>,
    );
    const form = getByTestId(FORM_WRAPPER);
    expect(form).toBeInTheDocument();
  });
  it('it should render Success modal', async () => {
    const notes = { meta: { created: true } };
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNoteFolder />
      </BrowserRouter>,
      { notes },
    );

    expect(getByTestId(SUCCESS_MODAL_WRAPPER)).toBeInTheDocument();
  });
});
