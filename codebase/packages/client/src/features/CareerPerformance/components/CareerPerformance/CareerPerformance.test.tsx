// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { ReviewType, Status } from 'config/enum';

import CareerPerformance from './CareerPerformance';

jest.mock('features/Objectives', () => {
  return {
    __esModule: true,
    Widgets: () => {
      return <div>mocked_objective_widgets</div>;
    },
  };
});

jest.mock('features/ViewNavigation', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_view_navigation</div>;
    },
  };
});


jest.mock('../HelpWidgets', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_help_widgets</div>;
    },
  };
});

jest.mock('../ReviewWidgets', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_review_widgets</div>;
    },
  };
});

jest.mock('../InfoWidgets', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_info_widgets</div>;
    },
  };
});

jest.mock('../Resources', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_resources</div>;
    },
  };
});

describe('<CareerPerformance />', () => {
  const props = {
    loadTimeline: jest.fn(),
    descriptions: ['mocked_desc_1', 'mocked_desc_2'],
    startDates: ['mocked_start_date_1', 'mocked_start_date_2'],
    statuses: [Status.APPROVED, Status.PENDING],
    timelineTypes: {
      [ReviewType.EYR]: false,
      [ReviewType.MYR]: false,
      [ReviewType.OBJECTIVE]: true,
    },
    midYearReview: 'mocked_myr',
    endYearReview: 'mocked_eyr',
  };

  describe('#render', () => {
    it('should render expected components', () => {
      const { getByText } = render(<CareerPerformance {...props} />);

      expect(getByText('mocked_view_navigation')).toBeInTheDocument();
      expect(getByText('mocked_info_widgets')).toBeInTheDocument();
      expect(getByText('mocked_help_widgets')).toBeInTheDocument();
      expect(getByText('mocked_objective_widgets')).toBeInTheDocument();
      expect(getByText('My reviews')).toBeInTheDocument();
      expect(getByText('Useful resources')).toBeInTheDocument();
      expect(getByText('mocked_review_widgets')).toBeInTheDocument();
      expect(getByText('mocked_resources')).toBeInTheDocument();
    });
  });
  describe('#useEffect', () => {
    it('should not call loadTimeline, if !props.colleagueUuid', () => {
      render(<CareerPerformance {...props} />);

      expect(props.loadTimeline).not.toHaveBeenCalled();
    });

    it('should call loadTimeline with colleagueUuid, if props.colleagueUuid', () => {
      const newProps = {
        ...props,
        colleagueUuid: 'mocked_uuid',
      };
      render(<CareerPerformance {...newProps} />);

      expect(props.loadTimeline).toHaveBeenCalledWith(newProps.colleagueUuid);
    });
  });
});