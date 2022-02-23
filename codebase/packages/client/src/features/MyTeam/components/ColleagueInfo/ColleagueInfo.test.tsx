// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import ColleagueInfo from './ColleagueInfo';

describe('<ColleagueInfo />', () => {
  const props = {
    firstName: 'mocked_first_name',
    lastName: 'mocked_last_name',
    jobName: 'mocked_job_name',
    businessType: 'mocked_business_type',
    manager: {
      uuid: 'mocked_uuid',
      firstName: 'mocked_manager_first_name',
      jobName: 'mocked_manager_job_name',
      lastName: 'mocked_manager_last_name',
      middleName: null,
      businessType: 'mocked_manager_business_type',
    }
  };
  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<ColleagueInfo {...props} />);

      expect(getByTestId('colleague-info')).toBeInTheDocument();
    });

    it('should render <Avatar /> component', () => {
      const { getByTestId } = render(<ColleagueInfo {...props} />);

      expect(getByTestId('avatar')).toBeInTheDocument();
    });

    it('should render colleague firstName, lastName, jobName, businessType', () => {
      const { getByText } = render(<ColleagueInfo {...props} />);

      expect(getByText(`${props.firstName} ${props.lastName}`)).toBeInTheDocument();
      expect(getByText(`${props.jobName}, ${props.businessType}`)).toBeInTheDocument();
    });

    it('should render manager firstName, lastName, if it is passed', () => {
      const { getByText } = render(<ColleagueInfo {...props} />);

      expect(getByText(`Line manager: ${props.manager.firstName} ${props.manager.lastName}`)).toBeInTheDocument();
    });

    it('should not render manager data, if it is not passed', () => {
      const newProps = {
        ...props,
        manager: undefined,
      };

      const { queryByText } = render(<ColleagueInfo {...newProps} />);

      expect(queryByText(`Line manager: ${props.manager.firstName} ${props.manager.lastName}`)).not.toBeInTheDocument();
    });
  });
});
