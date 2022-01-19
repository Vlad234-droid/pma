// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import ConfirmModal from './ConfirmModal';

describe('<ConfirmModal />', () => {
  const props = {
    title: 'mocked_title',
    onClose: jest.fn(),
    onSave: jest.fn(),
  };

  describe('#render', () => {
    it('should render title', () => {
      const { getByText } = render(<ConfirmModal {...props} />);

      expect(getByText('mocked_title')).toBeInTheDocument();
    });

    it('should render children', () => {
      const { getByText } = render(
        <ConfirmModal {...props}>
          <div>mocked_children</div>
        </ConfirmModal>,
      );

      expect(getByText('mocked_children')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClose on Cancel button click', () => {
      const { getByTestId } = render(<ConfirmModal {...props} />);

      expect(getByTestId('cancel-btn')).toBeInTheDocument();

      fireEvent.click(getByTestId('cancel-btn'));

      expect(props.onClose).toHaveBeenCalled();
    });

    it('should call props.onSave on Submit button click, if !hasReason', () => {
      const { getByTestId } = render(<ConfirmModal {...props} />);

      expect(getByTestId('submit-btn')).toBeInTheDocument();

      fireEvent.click(getByTestId('submit-btn'));

      expect(props.onSave).toHaveBeenCalled();
    });

    // it('should not call props.onSave on Submit button click, if hasReason and !reason.length', () => {
    //   const newProps = {
    //     ...props,
    //     hasReason: true,
    //   };
    //
    //   const { getByTestId } = render(<ConfirmModal {...newProps} />);
    //
    //   expect(getByTestId('submit-btn')).toBeInTheDocument();
    //
    //   fireEvent.click(getByTestId('submit-btn'));
    //
    //   expect(props.onSave).not.toHaveBeenCalled();
    // });
    //
    // it('should call props.onSave with true and reason on Submit button click, if hasReason', () => {
    //   const newProps = {
    //     ...props,
    //     hasReason: true,
    //     reason: 'mocked_reason',
    //   };
    //
    //   const { getByTestId } = render(<ConfirmModal {...newProps} />);
    //
    //   expect(getByTestId('submit-btn')).toBeInTheDocument();
    //
    //   fireEvent.click(getByTestId('submit-btn'));
    //
    //   expect(props.onSave).toHaveBeenCalledWith(true, 'mocked_reason');
    // });
    //
    // it('should call props.onSave with false and reason on Submit button click, if !hasReason', () => {
    //   const newProps = {
    //     ...props,
    //     hasReason: false,
    //     reason: '',
    //   };
    //
    //   const { getByTestId } = render(<ConfirmModal {...newProps} />);
    //
    //   expect(getByTestId('submit-btn')).toBeInTheDocument();
    //
    //   fireEvent.click(getByTestId('submit-btn'));
    //
    //   expect(props.onSave).toHaveBeenCalledWith(true, 'mocked_reason');
    // });
  });
});
