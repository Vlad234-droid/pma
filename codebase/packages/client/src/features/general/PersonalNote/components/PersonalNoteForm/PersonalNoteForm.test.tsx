import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent, waitFor } from '@testing-library/react';
import PersonalNoteForm, { PERSONAL_FORM } from './PersonalNoteForm';
import { LEFT_SIDE_BUTTON, ARROW_RIGHT } from 'components/ButtonsWrapper/ButtonsWrapper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('PersonalNote feature', () => {
  const onSubmit = jest.fn();
  const onClose = jest.fn();
  const props = {
    onSubmit,
    onClose,
    defaultValues: {},
  };
  it('it should render personal note wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNoteForm {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(PERSONAL_FORM);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onClose prop', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNoteForm {...props} />
      </BrowserRouter>,
    );
    const cancel = getByTestId(LEFT_SIDE_BUTTON);
    fireEvent.click(cancel);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('it should submit form', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PersonalNoteForm {...props} />
      </BrowserRouter>,
    );
    const submit = getByTestId(ARROW_RIGHT);

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
