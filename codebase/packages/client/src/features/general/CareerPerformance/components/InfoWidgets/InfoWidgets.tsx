import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Page } from 'pages';
import { DashboardProfile } from 'features/general/Profile';
import { StepIndicator } from 'components/StepIndicator';
import { useTranslation } from 'components/Translation';
import { Status } from 'config/enum';

type Props = {
  showMyReview?: boolean;
  statuses: Status[];
  descriptions: string[];
  startDates: string[];
};

const InfoWidgets: FC<Props> = ({ showMyReview = false, statuses, descriptions, startDates }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div data-test-id='info-widgets' className={css(wrapperStyles)}>
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
