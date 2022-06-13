// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import { getMissedFields } from '../../utils';
import DataModal from './DataModal';

jest.mock('../../utils');

describe('<DataModal />', () => {
  const props = {
    info: {},
  };

  beforeEach(() => {
    // @ts-ignore
    getMissedFields.mockReset();
  });

  describe('#render', () => {
    it('should not render modal, if no empty fields', () => {
      // @ts-ignore
      getMissedFields.mockReturnValueOnce([]);
      const { queryByText } = render(<DataModal {...props} />);

      expect(queryByText('Your profile data is missing')).not.toBeInTheDocument();
    });

    it('should render modal and missed fields, if empty fields', () => {
      // @ts-ignore
      getMissedFields.mockReturnValueOnce(['fieldOne', 'fieldTwo']);
      const { getByText } = render(<DataModal {...props} />);

      expect(getByText('Your profile data is missing')).toBeInTheDocument();
      expect(getByText('fieldOne is blank')).toBeInTheDocument();
      expect(getByText('fieldTwo is blank')).toBeInTheDocument();
      expect(
        getByText('Please refer to System guidance and FAQs to find out how to correct this data.'),
      ).toBeInTheDocument();
      expect(getByText('Close')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should close modal on close button click', () => {
      // @ts-ignore
      getMissedFields.mockReturnValueOnce(['fieldOne', 'fieldTwo']);
      const { getByText, queryByText } = render(<DataModal {...props} />);

      expect(getByText('Your profile data is missing')).toBeInTheDocument();

      fireEvent.click(getByText('Close'));

      expect(queryByText('Your profile data is missing')).not.toBeInTheDocument();
    });
  });
});
