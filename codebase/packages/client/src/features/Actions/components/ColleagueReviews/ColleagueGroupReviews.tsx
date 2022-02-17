import React, { FC, useState } from 'react';
import { useStyle } from '@dex-ddl/core';

import { ReviewType, Status } from 'config/enum';
import { useTranslation } from 'components/Translation';

import { ColleagueReview } from './ColleagueReview';
import { Buttons } from './Buttons';
import { Notification } from 'components/Notification';

type Props = {
  status: Status;
  reviews: any[];
  schema: any;
  reviewType: ReviewType;
  updateReviewStatus: (status: Status) => (reviewType: ReviewType) => (T) => void;
  updateColleagueReviews: (T) => void;
};

export const ColleagueGroupReviews: FC<Props> = ({
  reviews,
  schema,
  reviewType,
  updateReviewStatus,
  updateColleagueReviews,
  status,
}) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const [formsValid, validateReview] = useState<{ [key: string]: boolean }>({});
  const isButtonsDisabled = Object.values(formsValid).filter((val) => !val)?.length > 0;

  return (
    <div className={css({ padding: '24px 35px 24px 24px' })}>
      <Notification
        graphic='information'
        iconColor='pending'
        text={t('time_to_approve_or_decline', 'It’s time to review your colleague’s objectives and / or reviews')}
        customStyle={{
          background: '#FFDBC2',
          marginBottom: '20px',
        }}
      />
      {reviews.map((review) => (
        <ColleagueReview
          key={review.uuid}
          review={review}
          schema={schema}
          validateReview={validateReview}
          updateColleagueReviews={updateColleagueReviews}
        />
      ))}
      {status === Status.WAITING_FOR_APPROVAL && (
        <Buttons reviewType={reviewType} updateReviewStatus={updateReviewStatus} isDisabled={isButtonsDisabled} />
      )}
    </div>
  );
};
