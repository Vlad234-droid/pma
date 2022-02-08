import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@dex-ddl/core';

import { Page } from 'pages';
import { DashboardProfile } from 'features/Profile';
import { StepIndicator } from 'components/StepIndicator';
import { useTranslation } from 'components/Translation';

type Props = {
  showMyReview: boolean;
  statuses: any;
  descriptions: any;
  startDates: any;
}

const InfoWidgets: FC<Props> = ({ showMyReview, statuses, descriptions, startDates }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div className={css(wrapperStyles)}>
      <Link to={`../${Page.PROFILE}`}>
        <DashboardProfile />
      </Link>
      {showMyReview && (
        <StepIndicator
          mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
          titles={descriptions}
          descriptions={startDates}
          statuses={statuses}
        />
      )}
    </div>
  );
};

export default InfoWidgets;

const wrapperStyles: Rule = {
  flex: '3 1 504px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};
