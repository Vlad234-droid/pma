// @ts-ignore
import { fireEvent } from '@testing-library/react';
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';

import ModalError, { TEST_DESCRIPTION_ID, TEST_CLOSE } from './ModalError';

describe('<ModalError />', () => {
  describe('#render', () => {
    const props = {
      title: 'Test Title',
      description: 'Test Description',
      onClose: jest.fn(),
    };

    it('should render ModalError title', () => {
      const { getByTestId, getByText } = render(<ModalError {...props} />);
      expect(getByText('Test Title')).toBeInTheDocument();
    });

    it('should render ModalError description', () => {
      const { getByTestId } = render(<ModalError {...props} />);
      expect(getByTestId(TEST_DESCRIPTION_ID)).toBeInTheDocument();
    });

    it('should trigger onClose button', () => {
      const { getByTestId } = render(<ModalError {...props} />);

      expect(screen.getByTestId(TEST_CLOSE)).toBeInTheDocument();
      fireEvent.click(screen.getByTestId(TEST_CLOSE));
      expect(props.onClose).toBeCalled();
    });
  });
});
