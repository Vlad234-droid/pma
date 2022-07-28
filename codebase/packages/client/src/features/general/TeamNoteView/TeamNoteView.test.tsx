import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import TeamNoteView from './TeamNoteView';
import { MODAL_WRAPPER } from 'components/NoteDetail/NoteDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const uuid = '15818570-cd6b-4957-8a82-3d34dcb0b077';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    uuid: uuid,
  }),
}));

describe('TeamNoteView feature', () => {
  it('it should render TeamNoteView note wrapper', async () => {
    const notes = {
      notes: [{ id: uuid }],
    };
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNoteView />
      </BrowserRouter>,
      { notes },
    );
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
