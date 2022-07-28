import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import Notes, { CONFIRM_MODAL_ID, NOTES_WRAPPER } from './Notes';
import { FOLDER_WRAPPER } from './components/Folders/MainFolders/MainFolders';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Notes feature', () => {
  it('it should render Notes wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Notes />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(NOTES_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render folders wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Notes />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(FOLDER_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render confirm modal', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Notes />
      </BrowserRouter>,
    );
    const button = getByTestId('add');
    fireEvent.click(button);
    const modal = getByTestId(CONFIRM_MODAL_ID);

    expect(button).toBeInTheDocument();
    expect(modal).toBeInTheDocument();
  });
});
