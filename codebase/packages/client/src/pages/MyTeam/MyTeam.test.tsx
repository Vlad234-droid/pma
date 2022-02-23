// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import MyTeam from './MyTeam';

jest.mock('features/ViewNavigation', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_view_navigation</div>;
    },
  };
});

jest.mock('features/MyTeam', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_my_team</div>;
    },
  };
});

describe('<MyTeam /> page', () => {
  describe('#render', () => {
    it('should render navigation and team components', () => {
      const { getByText } = render(<MyTeam />);

      expect(getByText('mocked_view_navigation')).toBeInTheDocument();
      expect(getByText('mocked_my_team')).toBeInTheDocument();
    });
  });
});
