// @ts-ignore
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Actions from './Actions';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('<Actions />', () => {
  const props = {
    draftCount: 1,
    waitingCount: 2,
  };
  describe('#render', () => {
    it('should render <TileWrapper />', () => {
      const { getAllByTestId } = render(
        <BrowserRouter>
          <Actions {...props} />
        </BrowserRouter>,
      );

      expect(getAllByTestId('tile-wrapper')[0]).toBeInTheDocument();
    });

    it('should render expected content', () => {
      const { getByText } = render(
        <BrowserRouter>
          <Actions {...props} />
        </BrowserRouter>,
      );

      expect(getByText('Your actions')).toBeInTheDocument();
      expect(getByText(props.waitingCount)).toBeInTheDocument();
      expect(getByText('Your pending actions')).toBeInTheDocument();
      expect(getByText(props.draftCount)).toBeInTheDocument();
      expect(getByText('Your colleagues pending actions')).toBeInTheDocument();
    });
  });
});
