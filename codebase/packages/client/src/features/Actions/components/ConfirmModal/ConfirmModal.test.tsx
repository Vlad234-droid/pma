// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import ConfirmModal from './ConfirmModal';

describe('<ConfirmModal />', () => {
  const props = {
    title: 'mocked_title',
    onClose: jest.fn(),
    onSave: jest.fn(),
    hasReason: true,
    employee: generateEmployeeReview(),
    reason: 'mocked_reason',
    submitBtnTitle: <div>mocked_btn_title</div>,
    children: 'mocked_children',
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<ConfirmModal {...props} />);

      expect(getByTestId('actions-confirm-modal')).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = render(<ConfirmModal {...props} />);

      expect(getByText('mocked_children')).toBeInTheDocument();
    });

    it('should render colleagueInfo', () => {
      const { getByTestId } = render(<ConfirmModal {...props} />);

      expect(getByTestId('colleague-info')).toBeInTheDocument();
    });
  });
});
