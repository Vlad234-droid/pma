// @ts-ignore
import React from 'react';

// @ts-ignore
import { BrowserRouter } from 'react-router-dom';

import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import TeamWidgets from './TeamWidgets';
import { View } from '../../config/types';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
  Link: ({ children }) => <div>{children}</div>,
}));

describe('<TeamWidgets />', () => {
  const employee = generateEmployeeReview();
  const props = {
    loaded: false,
    colleagues: [employee],
    employeeWithPendingApprovals: [employee],
    employeePendingApprovals: [employee],
    view: View.FULL_TEAM,
    loadManagers: jest.fn(),
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<TeamWidgets {...props} />);

      expect(getByTestId('team-widgets')).toBeInTheDocument();
    });

    it('should not render <TeamMateProfile />, if !props.loaded', () => {
      const { queryByTestId } = render(<TeamWidgets {...props} />);

      expect(queryByTestId('team-mate-profile')).not.toBeInTheDocument();
    });

    it('should not render <PendingApprovals /> and <Actions />, if props.view !== View.DIRECT_REPORTS', () => {
      const { queryByTestId } = render(<TeamWidgets {...props} />);

      expect(queryByTestId('actions')).not.toBeInTheDocument();
      expect(queryByTestId('pending-approvals')).not.toBeInTheDocument();
    });

    it('should render <TeamMateProfile />, if props.loaded', () => {
      const newProps = {
        ...props,
        loaded: true,
        colleagues: [employee, employee],
      };

      const { getAllByTestId } = render(<TeamWidgets {...newProps} />);

      expect(getAllByTestId('team-mate-profile')).toHaveLength(2);
    });

    it('should render <PendingApprovals /> and <Actions />, if props.view === View.DIRECT_REPORTS', () => {
      const newProps = {
        ...props,
        loaded: true,
        view: View.DIRECT_REPORTS,
      };

      const { getByTestId } = render(
        <BrowserRouter>
          <TeamWidgets {...newProps} />
        </BrowserRouter>,
      );

      expect(getByTestId('actions')).toBeInTheDocument();
      expect(getByTestId('pending-approvals')).toBeInTheDocument();
    });
  });

  describe('#useEffect', () => {
    it('should not call props.loadManagers, if !props.colleagueUuid', () => {
      render(<TeamWidgets {...props} />);

      expect(props.loadManagers).not.toHaveBeenCalled();
    });

    it('should call props.loadManagers, if props.colleagueUuid', () => {
      const newProps = {
        ...props,
        colleagueUuid: 'mocked_uuid',
      };

      render(<TeamWidgets {...newProps} />);

      expect(props.loadManagers).toHaveBeenCalledTimes(1);
    });
  });
});
