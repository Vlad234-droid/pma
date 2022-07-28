import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import TeamNote, { MODAL_WRAPPER, ARROW_LEFT } from './TeamNote';
import { MODAL_WRAPPER as FORM_WRAPPER } from './components/TeamNoteForm/TeamNoteForm';
import { SUCCESS_MODAL_WRAPPER } from 'components/SuccessNotesModal/SuccessNotesModal';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TeamNote feature', () => {
  it('it should render team note wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNote />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render back path icon', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNote />
      </BrowserRouter>,
    );
    const icon = getByTestId(ARROW_LEFT);
    expect(icon).toBeInTheDocument();
  });
  it('it should render note form', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNote />
      </BrowserRouter>,
    );
    const form = getByTestId(FORM_WRAPPER);
    expect(form).toBeInTheDocument();
  });
  it('it should render success modal', async () => {
    const notes = { meta: { created: true } };
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNote />
      </BrowserRouter>,
      { notes },
    );
    const modal = getByTestId(SUCCESS_MODAL_WRAPPER);
    expect(modal).toBeInTheDocument();
  });
});
