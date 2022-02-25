import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'utils/test';
import PushTipModal,
  {
    PUSH_TIP_MODAL,
    CONFIRM_PUSH_BTN,
    CLOSE_PUSH_TIP_MODAL_BTN,
  } from './PushTipModal';

describe('Push tip modal', () => {
  const props = {
    card: {
      uuid: 'mocked_uuid',
      title: 'mocked_title',
      description: 'mocked_description',
      imageLink: 'mocked_image',
      createdTime: 'mocked_created_time',
      updatedTime: 'mocked_updated_time',
      published: false,
      targetOrganisation: {
        name: 'mocked_name'
      },
    },
  }

  const handleConfirm = jest.fn();
  const handleCloseModal = jest.fn();

  it('push tip confirmation', async () => {
    const { getByTestId } = renderWithTheme(
      <PushTipModal handleConfirm={handleConfirm} handleCloseModal={handleCloseModal} {...props} />
    );
    const pushTipModal = getByTestId(PUSH_TIP_MODAL);
    expect(pushTipModal).toBeInTheDocument();
    
    const confirmPushBtn = getByTestId(CONFIRM_PUSH_BTN);

    fireEvent.click(confirmPushBtn);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('should close push tip modal', async () => {
    const { getByTestId } = renderWithTheme(
      <PushTipModal handleConfirm={handleConfirm} handleCloseModal={handleCloseModal} {...props} />
    );
    const closePushTipModalBtn = getByTestId(CLOSE_PUSH_TIP_MODAL_BTN);

    fireEvent.click(closePushTipModalBtn);

    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
});
