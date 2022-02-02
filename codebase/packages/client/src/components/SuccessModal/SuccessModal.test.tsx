// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import SuccessModal from './SuccessModal';

describe('<SuccessModal />', () => {
  const props = {
    onClose: jest.fn(),
    description: 'mocked_description',
    withСheckMark: true,
    title: 'mocked_title',
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<SuccessModal {...props} />);

      expect(getByTestId('success-modal')).toBeInTheDocument();
    });

    it('should render check icon, if props.withСheckMark', () => {
      const { getByTestId, queryByTestId } = render(<SuccessModal {...props} />);

      expect(getByTestId('success-check-mark')).toBeInTheDocument();
      expect(queryByTestId('success-mark')).not.toBeInTheDocument();
    });

    it('should not render check icon, if !props.withСheckMark', () => {
      const newProps = {
        ...props,
        withСheckMark: false,
      };

      const { queryByTestId, getByTestId } = render(<SuccessModal {...newProps} />);

      expect(getByTestId('success-mark')).toBeInTheDocument();
      expect(queryByTestId('success-check-mark')).not.toBeInTheDocument();
    });

    it('should render Done! text', () => {
      const { getByText } = render(<SuccessModal {...props} />);

      expect(getByText('Done!')).toBeInTheDocument();
    });

    it('should render description if passed', () => {
      const { getByText } = render(<SuccessModal {...props} />);

      expect(getByText('mocked_description')).toBeInTheDocument();
    });

    it(' should render Okay button', () => {
      const { getByText } = render(<SuccessModal {...props} />);

      expect(getByText('Okay')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClose on Okay button click', () => {
      const { getByText } = render(<SuccessModal {...props} />);

      const button = getByText('Okay');

      fireEvent.click(button);

      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
