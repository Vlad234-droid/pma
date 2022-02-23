// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import PendingApprovals from './PendingApprovals';

describe('<PendingApprovals />', () => {
  const props = {
    count: 1,
  };

  describe('#render', () => {
    it('should not render <TileWrapper />, if !count', () => {
      const props = {
        count: 0,
      };

      const { queryByTestId } = render(<PendingApprovals {...props} />);

      expect(queryByTestId('tile-wrapper')).not.toBeInTheDocument();
    });

    it('should render <TileWrapper />, if count', () => {
      const { getByTestId } = render(<PendingApprovals {...props} />);

      expect(getByTestId('tile-wrapper')).toBeInTheDocument();
    });

    it('should render expected content, if count', () => {
      const { getByText } = render(<PendingApprovals {...props} />);

      expect(getByText('Pending actions')).toBeInTheDocument();
      expect(getByText('You have pending actions')).toBeInTheDocument();
      expect(getByText('1')).toBeInTheDocument();
    });
  });
});
