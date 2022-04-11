// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { ReviewType, Status, TimelineType } from 'config/enum';

import CareerPerformance from './CareerPerformance';

jest.mock('features/Objectives', () => {
  return {
    __esModule: true,
    Widgets: () => {
      return <div>mocked_objective_widgets</div>;
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

jest.mock('features/KnowledgeLibrary', () => {
  return {
    __esModule: true,
    KnowledgeLibraryWidget: () => {
      return <div>mocked_knowledge_library_widget</div>;
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
    midYearReview: {
      code: ReviewType.MYR,
      colleagueCycleUuid: 'mocked_cycle_uuid',
      count: 2,
      description: 'mocked_desc',
      endTime: null,
      lastUpdatedTime: 'mocked_last_updated_time',
      reviewType: ReviewType.MYR,
      startTime: 'mocked_start_time',
      status: Status.APPROVED,
      type: TimelineType.REVIEW,
      uuid: 'mocked_uuid',
      properties: {
        mapJson: {
          mocked: 'mocked',
        },
      },
    },
    endYearReview: {
      code: ReviewType.EYR,
      colleagueCycleUuid: 'mocked_cycle_uuid',
      count: 2,
      description: 'mocked_desc',
      endTime: null,
      lastUpdatedTime: 'mocked_last_updated_time',
      reviewType: ReviewType.EYR,
      startTime: 'mocked_start_time',
      status: Status.DECLINED,
      type: TimelineType.REVIEW,
      uuid: 'mocked_uuid',
      properties: {
        mapJson: {
          mocked: 'mocked',
        },
      },
    },
    displayTimelines: true,
  };

  describe('#render', () => {
    it('should render expected components', () => {
      const { getByText } = render(<CareerPerformance {...props} />);

      expect(getByText('mocked_info_widgets')).toBeInTheDocument();
      expect(getByText('mocked_help_widgets')).toBeInTheDocument();
      expect(getByText('mocked_objective_widgets')).toBeInTheDocument();
      expect(getByText('My reviews')).toBeInTheDocument();
      expect(getByText('Useful resources')).toBeInTheDocument();
      expect(getByText('mocked_review_widgets')).toBeInTheDocument();
      expect(getByText('mocked_knowledge_library_widget')).toBeInTheDocument();
    });

    it('should render objectives and reviews widgets, if !props.displayTimelines', () => {
      const newProps = {
        ...props,
        displayTimelines: false,
      };
      const { queryByText } = render(<CareerPerformance {...newProps} />);

      expect(queryByText('mocked_objective_widgets')).toBeInTheDocument();
      expect(queryByText('My reviews')).not.toBeInTheDocument();
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
