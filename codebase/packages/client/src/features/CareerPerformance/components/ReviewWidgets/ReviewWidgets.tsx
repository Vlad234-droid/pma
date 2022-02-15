import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

import { ReviewWidget } from 'features/Objectives';
import { ReviewType } from 'config/enum';

import { Review } from '../../config/types';

type Props = {
  showMyReview?: boolean;
  showAnnualReview?: boolean;
  basicTileStyle: Rule;
  midYearReview: Review;
  endYearReview: Review;
};

const ReviewWidgets: FC<Props> = ({
  showMyReview = false,
  showAnnualReview = false,
  basicTileStyle,
  midYearReview,
  endYearReview,
}) => {
  const { css } = useStyle();

  return (
    <>
      {showMyReview && (
        <>
          <div data-test-id='mid-year-review' className={css(basicTileStyle)}>
            <ReviewWidget
              reviewType={ReviewType.MYR}
              status={midYearReview?.status}
              startTime={midYearReview?.startTime}
              endTime={midYearReview?.endTime || undefined}
              lastUpdatedTime={midYearReview?.lastUpdatedTime}
              onClick={() => console.log('ReviewWidget')}
              onClose={() => console.log('ReviewWidget')}
              title={'Mid-year review'}
              customStyle={{ height: '100%' }}
            />
          </div>
          <div data-test-id='end-year-review' className={css(basicTileStyle)}>
            <ReviewWidget
              reviewType={ReviewType.EYR}
              status={endYearReview?.status}
              startTime={endYearReview?.startTime}
              endTime={endYearReview?.endTime || undefined}
              lastUpdatedTime={endYearReview?.lastUpdatedTime}
              onClick={() => console.log('ReviewWidget')}
              onClose={() => console.log('ReviewWidget')}
              title={'Year-end review'}
              customStyle={{ height: '100%' }}
            />
          </div>
        </>
      )}
      {showAnnualReview && (
        <div data-test-id='annual-performance-review' className={css(basicTileStyle)}>
          <ReviewWidget
            reviewType={ReviewType.EYR}
            status={endYearReview?.status}
            startTime={endYearReview?.startTime}
            endTime={endYearReview?.endTime || undefined}
            lastUpdatedTime={endYearReview?.lastUpdatedTime}
            onClick={() => console.log('ReviewWidget')}
            onClose={() => console.log('ReviewWidget')}
            title={'Annual performance review'}
            customStyle={{ height: '100%' }}
          />
        </div>
      )}
    </>
  );
};

export default ReviewWidgets;
