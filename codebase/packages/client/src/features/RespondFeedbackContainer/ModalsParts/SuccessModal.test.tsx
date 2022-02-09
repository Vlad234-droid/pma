import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import SuccessModal, { OK_BUTTON_TEST_ID, TEST_ID } from './SuccessModal';

describe('PDP Form', () => {
  const props = {
    setModalSuccess: jest.fn(),
    setIsOpen: jest.fn(),
    setSelectedPerson: jest.fn(),
    selectedPerson: {},
    setFeedbackItems: jest.fn(),
  };

  it('should render SuccessModal', async () => {
    const { queryByTestId } = render(<SuccessModal {...props} />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('check call empty form onSubmit', async () => {
    const { queryByTestId } = render(<SuccessModal {...props} />);

    const okBtn = queryByTestId(OK_BUTTON_TEST_ID);
    fireEvent.click(okBtn);
    expect(props.setModalSuccess).toHaveBeenCalled();
  });
});
