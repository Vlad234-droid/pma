import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'utils/test';
import TipsCard, { TIPS_CARD, VIEW_HISTORY_BTN, PUSH_TIP_BTN } from './TipsCard';
import { VIEW_HISTORY_MODAL } from './ViewHistoryModal';
import { PUSH_TIP_MODAL } from './PushTipModal';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

//TODO: add test for "Edit tip" button

describe('Tips page', () => {
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
        name: 'mocked_name',
      },
    },
  };
  it('should render tip card', async () => {
    const { getByTestId } = renderWithTheme(<TipsCard {...props} />);
    const tipCard = getByTestId(TIPS_CARD);

    expect(tipCard).toBeInTheDocument();
  });

  it('should render view history modal', async () => {
    const { getByTestId } = renderWithTheme(<TipsCard {...props} />);
    const viewHistoryBtn = getByTestId(VIEW_HISTORY_BTN);

    expect(viewHistoryBtn).toBeInTheDocument();

    fireEvent.click(viewHistoryBtn);

    const viewHistoryModal = getByTestId(VIEW_HISTORY_MODAL);
    expect(viewHistoryModal).toBeInTheDocument();
  });

  it('should render push tip modal', async () => {
    const { getByTestId } = renderWithTheme(<TipsCard {...props} />);
    const pushTipBtn = getByTestId(PUSH_TIP_BTN);

    expect(pushTipBtn).toBeInTheDocument();

    fireEvent.click(pushTipBtn);

    const pushTipModal = getByTestId(PUSH_TIP_MODAL);
    expect(pushTipModal).toBeInTheDocument();
  });
});
