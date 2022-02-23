// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import MyTeam from './MyTeam';

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

    it('should render <ViewFilters /> component', () => {
      const { getByTestId } = render(<MyTeam />);

      expect(getByTestId('view-filters')).toBeInTheDocument();
    });

    it('should render <Filters /> component', () => {
      const { getByTestId } = render(<MyTeam />);

      expect(getByTestId('filters')).toBeInTheDocument();
    });

    it('should render <TeamWidgets />', () => {
      const { getByText } = render(<MyTeam />);

      expect(getByText('mocked_team_widgets')).toBeInTheDocument();
    });

    it('should render default view', () => {
      const { getByLabelText } = render(<MyTeam />);

      expect(getByLabelText('My direct reports').checked).toEqual(true);
      expect(getByLabelText('My full team').checked).toEqual(false);
    });
  });

  describe('#handlers', () => {
    it('should handle view change', () => {
      const { getByLabelText } = render(<MyTeam />);

      fireEvent.click(getByLabelText('My full team'));

      expect(getByLabelText('My direct reports').checked).toEqual(false);
      expect(getByLabelText('My full team').checked).toEqual(true);
    });
  });
});
