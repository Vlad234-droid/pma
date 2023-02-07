import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { CONFIRM_MODAL } from 'components/ConfirmModal/ConfirmModal';
import ReviewButtons from './ReviewButtons';

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
    render(<ReviewButtons {...props} />);
    const wrapper = screen.getByRole('button');

    expect(wrapper).toBeInTheDocument();
  });
  it('it should render Close button', async () => {
    render(<ReviewButtons {...props} />);
    const button = screen.getByText(/close/i);

    expect(button).toBeInTheDocument();
  });

  it('it should render submit buttons', async () => {
    props.readonly = false;
    render(<ReviewButtons {...props} />);
    const draft = screen.getByText(/Save as draft/i);
    const submit = screen.getByText(/submit/i);

    expect(draft).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('it should not render confirmation modal', async () => {
    props.readonly = false;
    render(<ReviewButtons {...props} />);

    const submit = screen.getByText(/submit/i);
    fireEvent.click(submit);
    expect(screen.queryByTestId(CONFIRM_MODAL)).not.toBeInTheDocument();
  });
});
