import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent, waitFor } from '@testing-library/react';
import TeamNoteForm, { MODAL_WRAPPER } from './TeamNoteForm';
import { LEFT_SIDE_BUTTON, ARROW_RIGHT } from 'components/ButtonsWrapper/ButtonsWrapper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TeamNoteForm feature', () => {
  const onSubmit = jest.fn();
  const onClose = jest.fn();
  const props = {
    onSubmit,
    onClose,
    defaultValues: {},
  };
  it('it should render team note wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNoteForm {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(MODAL_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onClose prop', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNoteForm {...props} />
      </BrowserRouter>,
    );
    const cancel = getByTestId(LEFT_SIDE_BUTTON);
    fireEvent.click(cancel);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('it should submit form', async () => {
    const colleagues = {
      list: [
        {
          colleague: {
            colleagueUUID: 'mocked_uuid',
            profile: {
              firstName: 'firstName',
            },
          },
        },
      ],
    };

    const props = {
      onSubmit,
      onClose,
      defaultValues: {},
    };

    const { getByTestId } = render(
      <BrowserRouter>
        <TeamNoteForm {...props} />
      </BrowserRouter>,
      { colleagues },
    );
    const submit = getByTestId(ARROW_RIGHT);

    const input = getByTestId('search_option');

    await waitFor(() => {
      fireEvent.change(input, { target: { value: 'firstName' } });
    });

    const colleague = getByTestId('option-0');

    await waitFor(() => {
      fireEvent.click(colleague);
    });

    const titleInput = getByTestId('input-title');
    const contentInput = getByTestId('textarea-content');

    await waitFor(() => {
      fireEvent.change(titleInput, { target: { value: 'mocked_value' } });
      fireEvent.change(contentInput, { target: { value: 'mocked_value' } });
    });

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
