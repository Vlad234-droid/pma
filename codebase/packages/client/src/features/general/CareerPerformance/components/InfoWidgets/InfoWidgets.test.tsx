// @ts-ignore
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { Status } from 'config/enum';

import InfoWidgets from './InfoWidgets';

jest.mock('features/general/Profile', () => {
  return {
    __esModule: true,
    DashboardProfile: () => {
      return <div>mocked_dashboard_profile</div>;
    },
  };
});

jest.mock('components/StepIndicator', () => {
  return {
    __esModule: true,
    StepIndicator: () => {
      return <div>mocked_step_indicator</div>;
    },
  };
});

describe('<InfoWidgets />', () => {
  describe('#render', () => {
    const props = {
      descriptions: ['mocked_desc_1', 'mocked_desc_2'],
      startDates: ['mocked_start_date_1', 'mocked_start_date_2'],
      statuses: [Status.APPROVED, Status.PENDING],
    };

    it('should render wrapper', () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <InfoWidgets {...props} />
        </BrowserRouter>,
      );

      expect(getByTestId('info-widgets')).toBeInTheDocument();
    });

    it('should render wrapper', () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <InfoWidgets {...props} />
        </BrowserRouter>,
      );

      expect(getByTestId('info-widgets')).toBeInTheDocument();
    });

    it('should render <DashboardProfile />', () => {
      const { getByText } = render(
        <BrowserRouter>
          <InfoWidgets {...props} />
        </BrowserRouter>,
      );

      expect(getByText('mocked_dashboard_profile')).toBeInTheDocument();
    });

    it('should not render <StepIndicator />, if !props.showMyReview', () => {
      const { queryByText } = render(
        <BrowserRouter>
          <InfoWidgets {...props} />
        </BrowserRouter>,
      );

      expect(queryByText('mocked_step_indicator')).not.toBeInTheDocument();
    });

    it('should render <StepIndicator />, if props.showMyReview', () => {
      const newProps = {
        ...props,
        showMyReview: true,
      };

      const { getByText } = render(
        <BrowserRouter>
          <InfoWidgets {...newProps} />
        </BrowserRouter>,
      );

      expect(getByText('mocked_step_indicator')).toBeInTheDocument();
    });
  });
});
