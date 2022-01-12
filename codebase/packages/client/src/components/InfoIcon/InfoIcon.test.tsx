import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithTheme as render } from 'utils/test';

import InfoIcon from './InfoIcon';

describe('<InfoIcon />', () => {
  const props = {
    onClick: jest.fn(),
  };

  describe('#render', () => {
    it('should render correctly', () => {
      const { getByTestId, getByRole } = render(
        <InfoIcon {...props} />,
      );

      expect(getByTestId('info-icon')).toBeInTheDocument();
      expect(getByRole('button')).toBeInTheDocument();
    });

    it('should call props.onClick', () => {
      const { getByRole } = render(
        <InfoIcon {...props} />,
      );

      fireEvent.click(getByRole('button'))

      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
