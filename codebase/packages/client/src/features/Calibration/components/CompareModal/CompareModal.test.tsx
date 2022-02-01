// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import CompareModal from './CompareModal';

describe('<CompareModal />', () => {
  const props = {
    onClose: jest.fn(),
    onSave: jest.fn(),
    mode: 'None',
    options: [
      { id: 'mocked_id_1', label: 'mocked_id_1', text: 'mocked_id_1' },
      { id: 'mocked_id_2', label: 'mocked_id_2', text: 'mocked_id_2' },
    ],
  };

  describe('#render', () => {
    it('should render expected title', () => {
      const { getByText } = render(<CompareModal {...props} />);

      expect(getByText(`Compare ${new Date().getFullYear()} calibration submission`)).toBeInTheDocument();
    });

    it('should render compare modal', () => {
      const { getByTestId } = render(<CompareModal {...props} />);

      expect(getByTestId('compare-modal')).toBeInTheDocument();
    });

    it('should render options', () => {
      const { getByText } = render(<CompareModal {...props} />);

      expect(getByText('mocked_id_1')).toBeInTheDocument();
      expect(getByText('mocked_id_2')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should chek radio on click', () => {
      const { getByLabelText, getByText } = render(<CompareModal {...props} />);

      const labelRadio: HTMLInputElement = getByLabelText('mocked_id_2');
      expect(labelRadio.checked).toEqual(false);
      fireEvent.click(labelRadio);
      expect(labelRadio.checked).toEqual(true);

      fireEvent.click(getByText('Compare'));

      expect(props.onSave).toHaveBeenCalledWith('mocked_id_2');
    });
  });
});
