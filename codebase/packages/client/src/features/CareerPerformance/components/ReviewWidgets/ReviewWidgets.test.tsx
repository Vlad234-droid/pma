// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
// @ts-ignore
import { ReviewType, Status, TimelineType } from 'config/enum';

import ReviewWidgets from './ReviewWidgets';

describe('<ReviewWidgets />', () => {
  describe('#render', () => {
    const props = {
      basicTileStyle: {},
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
            'mocked': 'mocked',
          },
        }
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
            'mocked': 'mocked',
          },
        }
      },
    };

    it('should not render myr and eyr, if !props.showMyReview', () => {
      const { queryByTestId, queryByText } = render(<ReviewWidgets {...props} />);

      expect(queryByTestId('mid-year-review')).not.toBeInTheDocument();
      expect(queryByText('Mid-year review')).not.toBeInTheDocument();
      expect(queryByTestId('end-year-review')).not.toBeInTheDocument();
      expect(queryByText('Year-end review')).not.toBeInTheDocument();
    });

    it('should not render annual performance , if !props.showAnnualReview', () => {
      const { queryByTestId, queryByText } = render(<ReviewWidgets {...props} />);

      expect(queryByTestId('annual-performance-review')).not.toBeInTheDocument();
      expect(queryByText('Annual performance review')).not.toBeInTheDocument();
    });

    it('should render myr and eyr, if props.showMyReview', () => {
      const newProps = {
        ...props,
        showMyReview: true,
      };

      const { getByTestId, getByText } = render(<ReviewWidgets {...newProps} />);

      expect(getByTestId('mid-year-review')).toBeInTheDocument();
      expect(getByText('Mid-year review')).toBeInTheDocument();
      expect(getByTestId('end-year-review')).toBeInTheDocument();
      expect(getByText('Year-end review')).toBeInTheDocument();
    });

    it('should render annual performance , if !props.showAnnualReview', () => {
      const newProps = {
        ...props,
        showAnnualReview: true,
      };

      const { getByTestId, getByText } = render(<ReviewWidgets {...newProps} />);

      expect(getByTestId('annual-performance-review')).toBeInTheDocument();
      expect(getByText('Annual performance review')).toBeInTheDocument();
    });
  });
});
