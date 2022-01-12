import React from 'react';

import { renderWithTheme as render } from 'utils/test';

import ApproveModal from './ApproveModal';

describe('<ApproveModal />', () => {
  const props = {
    onClose: jest.fn(),
    onSave: jest.fn(),
  };

  describe('#render', () => {
    it('should render title', () => {
      const { getByText } = render(
        <ApproveModal {...props} />,
      );

      expect(getByText('Submit objectives or reviews')).toBeInTheDocument();
    });

    it('should render content', () => {
      const { getByText } = render(
        <ApproveModal {...props} />,
      );

      expect(getByText('Are you sure you want to approve objectives or reviews?')).toBeInTheDocument();
    });
  });
});