import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useStyle } from '@dex-ddl/core';
import { timelineTypesAvailabilitySelector, USER } from '@pma/store';
import { Page } from 'pages';
import { ReviewType } from 'config/enum';
import { PersonalProfileWidget } from 'features/general/Profile';
import { Rule } from '@pma/dex-wrapper';
import { useTenant } from 'features/general/Permission';

// TODO: separate & move to CareerPerformance Page
export const CareerHeaderSection: FC<{ timeline: React.ReactNode }> = ({ timeline }) => {
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current));
  const showMyReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const { css } = useStyle();
  const tenant = useTenant();

  const HelpWidget = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/widgets/HelpWidget`).then((module) => ({ default: module.HelpWidget })),
      ),
    [tenant],
  );

  return (
    <div className={css(wrapperStyles)}>
      <div className={css(infoWidgetsStyles)}>
        <Link to={`../${Page.PROFILE}`}>
          <PersonalProfileWidget />
        </Link>
        {showMyReview && timeline}
      </div>
      <HelpWidget />
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
};

const infoWidgetsStyles: Rule = {
  flex: '3 1 504px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};
