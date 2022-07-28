import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import PersonalNote, { MODAL_WRAPPER, ARROW_LEFT } from './PersonalNote';
import { PERSONAL_FORM } from './components/PersonalNoteForm/PersonalNoteForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('PersonalNote feature', () => {
  it('it should render personal note wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNote />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render back path icon', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNote />
      </BrowserRouter>,
    );
    const icon = getByTestId(ARROW_LEFT);
    expect(icon).toBeInTheDocument();
  });
  it('it should render note form', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNote />
      </BrowserRouter>,
    );
    const form = getByTestId(PERSONAL_FORM);
    expect(form).toBeInTheDocument();
  });
});
