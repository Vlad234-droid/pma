// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { ReviewType, Status, TimelineType } from 'config/enum';

import CareerPerformance from './CareerPerformance';

jest.mock('features/general/ObjectiveWidgets', () => {
  return {
    __esModule: true,
    ObjectiveWidgets: () => {
      return <div>mocked_objective_widgets</div>;
    },
  };
});

jest.mock('./components/HelpWidgets', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_help_widgets</div>;
    },
  };
});

jest.mock('./components/ReviewWidgets', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>mocked_review_widgets</div>;
    },
  };
});

jest.mock('features/general/KnowledgeLibrary', () => {
  return {
    __esModule: true,
    KnowledgeLibraryWidget: () => {
      return <div>mocked_knowledge_library_widget</div>;
    },
  };
});

describe('<CareerPerformance />', () => {
  const props = {
    loading: false,
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
      summaryStatus: Status.APPROVED,
      type: TimelineType.REVIEW,
      uuid: 'mocked_uuid',
      properties: {
        mocked: 'mocked',
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
      summaryStatus: Status.APPROVED,
      type: TimelineType.REVIEW,
      uuid: 'mocked_uuid',
      properties: {
        mocked: 'mocked',
      },
    },
    displayTimelines: true,
  };

  describe('#render', () => {
    it.skip('should render expected components', () => {
      const { getByText } = render(<CareerPerformance {...props} />);

      expect(getByText('mocked_help_widgets')).toBeInTheDocument();
      expect(getByText('mocked_objective_widgets')).toBeInTheDocument();
      expect(getByText('My reviews')).toBeInTheDocument();
      expect(getByText('Useful resources')).toBeInTheDocument();
      expect(getByText('mocked_review_widgets')).toBeInTheDocument();
      expect(getByText('mocked_knowledge_library_widget')).toBeInTheDocument();
    });

    it.skip('should render objectives and reviews widgets, if !props.displayTimelines', () => {
      const newProps = {
        ...props,
        displayTimelines: false,
      };
      const { queryByText } = render(<CareerPerformance {...newProps} />);

      expect(queryByText('mocked_objective_widgets')).toBeInTheDocument();
      expect(queryByText('My reviews')).not.toBeInTheDocument();
    });
  });
});
