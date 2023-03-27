import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import NoteDetail, { MODAL_WRAPPER, ARROW_LEFT } from './NoteDetail';
import { fireEvent } from '@testing-library/react';
import { CONFIRM_MODAL } from 'components/ConfirmModal/ConfirmModal';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('NoteDetail feature', () => {
  const onClose = jest.fn();
  const onEdit = jest.fn();
  const props = {
    note: {
      content: 'content',
      id: 'id',
      ownerColleagueUuid: 'ownerColleagueUuid',
      status: 'status',
      title: 'title',
      updateTime: 'updateTime',
    },
    onClose,
    onEdit,
  };
  it('it should render NoteDetail wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NoteDetail {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onClose prop on confirm modal', async () => {
    const { getByTestId, getAllByText } = render(
      <BrowserRouter>
        <NoteDetail {...props} />
      </BrowserRouter>,
    );
    const deleteBtn = getByTestId('delete');
    fireEvent.click(deleteBtn);
    const modal = getByTestId(CONFIRM_MODAL);
    expect(modal).toBeInTheDocument();
    const confirmBtn = getAllByText(/Delete/i)[3];
    fireEvent.click(confirmBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('it should call onClose prop arrow press', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NoteDetail {...props} />
      </BrowserRouter>,
    );
    const icon = getByTestId(ARROW_LEFT);
    fireEvent.click(icon);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
  it('it should call onEdit prop', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NoteDetail {...props} />
      </BrowserRouter>,
    );
    const edit = getByTestId('edit');
    fireEvent.click(edit);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
  it('it should not render note detail wrapper', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <NoteDetail {...props} note={undefined} />
      </BrowserRouter>,
    );
    const wrapper = queryByTestId(MODAL_WRAPPER);
    expect(wrapper).toBe(null);
  });
});
