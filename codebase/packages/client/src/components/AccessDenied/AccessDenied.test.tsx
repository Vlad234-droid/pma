import React from 'react';
import { renderWithTheme as render } from 'utils/test';

import { AccessDenied } from './AccessDenied';

describe('<AccessDenied />', () => {
  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<AccessDenied message='mocked_message' />);

      expect(getByTestId('access-denied')).toBeInTheDocument();
    });

    it('should render message', () => {
      const { getByText} = render(<AccessDenied message='mocked_message' />);

      expect(getByText('mocked_message')).toBeInTheDocument();
    });
  });
});
