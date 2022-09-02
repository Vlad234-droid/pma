import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { CONFIRM_MODAL } from 'components/ConfirmModal/ConfirmModal';
import ReviewButtons, { TEST_WRAPPER_ID } from './ReviewButtons';

describe('ReviewsButtons', () => {
  const onClose = jest.fn();
  const onSaveDraft = jest.fn();
  const onSave = jest.fn();

  const props = {
    readonly: true,
    isValid: true,
    onClose,
    onSaveDraft,
    onSave,
  };
  it('render ReviewsButtons wrapper', async () => {
    const { getByTestId } = render(<ReviewButtons {...props} />);
    const wrapper = getByTestId(TEST_WRAPPER_ID);

    expect(wrapper).toBeInTheDocument();
  });
  it('it should render Close button', async () => {
    const { getByText } = render(<ReviewButtons {...props} />);
    const button = getByText(/close/i);

    expect(button).toBeInTheDocument();
  });

  it('it should render submit buttons', async () => {
    props.readonly = false;
    const { getByText } = render(<ReviewButtons {...props} />);
    const draft = getByText(/Save as draft/i);
    const submit = getByText(/submit/i);

    expect(draft).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('it should render confirmation modal', async () => {
    props.readonly = false;
    const { getByText, getByTestId } = render(<ReviewButtons {...props} />);

    const submit = getByText(/submit/i);
    fireEvent.click(submit);
    expect(getByTestId(CONFIRM_MODAL)).toBeInTheDocument();
  });
});
