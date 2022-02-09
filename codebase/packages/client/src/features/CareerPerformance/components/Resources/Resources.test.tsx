// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Resources from './Resources';

describe('<Resources />', () => {
  describe('#render', () => {
    const props = {
      basicTileStyle: {},
    };

    it('should render expected components', () => {
      const { getByTestId, getAllByText, getByText } = render(<Resources {...props} />);

      expect(getByTestId('personal-contribution')).toBeInTheDocument();
      expect(getAllByText('Click here to find the Your Contribution Guide.')).toHaveLength(2);
      expect(getByTestId('personal-conversation')).toBeInTheDocument();
      expect(getByText('Useful guidance on having great performance conversations.')).toBeInTheDocument();
      expect(getByTestId('feedback')).toBeInTheDocument();
      expect(getByText('Learn more about giving and receiving great feedback.')).toBeInTheDocument();
      expect(getByTestId('learning')).toBeInTheDocument();
    });
  });
});
