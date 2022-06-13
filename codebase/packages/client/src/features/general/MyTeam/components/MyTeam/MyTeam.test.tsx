// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import MyTeam, { TEST_NO_FILTERS } from './MyTeam';

jest.mock('../TeamWidgets', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_team_widgets</div>;
    },
  };
});

describe('<MyTeam />', () => {
  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<MyTeam />);

      expect(getByTestId('my-team')).toBeInTheDocument();
    });

    it('should render <Filters /> component', () => {
      const { getByTestId } = render(<MyTeam />);

      expect(getByTestId('filters')).toBeInTheDocument();
    });

    it('should render <TeamWidgets />', () => {
      const { getByText } = render(<MyTeam />);

      expect(getByText('mocked_team_widgets')).toBeInTheDocument();
    });

    it('should NOT render ViewFilter by default', () => {
      const { getByTestId } = render(<MyTeam />);

      expect(getByTestId(TEST_NO_FILTERS)).toBeInTheDocument();
    });
  });
});
