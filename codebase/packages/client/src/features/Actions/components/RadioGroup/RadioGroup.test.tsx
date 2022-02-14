// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';

import { RadioGroup } from './RadioGroup';
// @ts-ignore
import { Status } from 'config/enum';

describe('<RadioGroup />', () => {
  const props = {
    status: Status.WAITING_FOR_APPROVAL,
    setStatus: jest.fn(),
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      render(<RadioGroup {...props} />);

      expect(screen.getByTestId('radio-group')).toBeInTheDocument();
      screen.getAllByRole('radio').forEach((radio: any) => {
        if (radio.id === 'WAITING_FOR_APPROVAL') {
          expect(radio.checked).toBeTruthy();
        } else {
          expect(radio.checked).not.toBeTruthy();
        }
      });
      fireEvent.click(screen.getByText('Complete'));
      expect(props.setStatus).toBeCalledWith('APPROVED');
    });
  });
});
