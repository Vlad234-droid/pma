import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'utils/test';
import ViewHistoryModal, { VIEW_HISTORY_MODAL, CLOSE_VIEW_HISTORY_MODAL_BTN } from './ViewHistoryModal';

describe('View history modal', () => {
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

  const handleCloseModal = jest.fn();

  it('should close view history modal', async () => {
    const { getByTestId } = renderWithTheme(
      <ViewHistoryModal handleCloseModal={handleCloseModal} {...props} />
    );

    const viewHistoryModal = getByTestId(VIEW_HISTORY_MODAL);
    expect(viewHistoryModal).toBeInTheDocument();

    const closeBtn = getByTestId(CLOSE_VIEW_HISTORY_MODAL_BTN);
    
    fireEvent.click(closeBtn);

    expect(handleCloseModal).toHaveBeenCalledTimes(1);
    // expect(await viewHistoryModal).not.toBeInTheDocument();
  });
});
