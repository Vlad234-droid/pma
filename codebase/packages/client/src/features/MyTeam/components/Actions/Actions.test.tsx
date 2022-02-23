// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Actions from './Actions';

describe('<Actions />', () => {
  const props = {
    draftCount: 1,
    waitingCount: 2,
  };
  describe('#render', () => {
    it('should render <TileWrapper />', () => {
      const { getByTestId } = render(<Actions {...props} />);

      expect(getByTestId('tile-wrapper')).toBeInTheDocument();
    });

    it('should render expected content', () => {
      const { getByText } = render(<Actions {...props} />);

      expect(getByText('Your actions')).toBeInTheDocument();
      expect(getByText(props.waitingCount)).toBeInTheDocument();
      expect(getByText('Your pending actions')).toBeInTheDocument();
      expect(getByText(props.draftCount)).toBeInTheDocument();
      expect(getByText('Your colleagues pending actions')).toBeInTheDocument();
    });
  });
});
