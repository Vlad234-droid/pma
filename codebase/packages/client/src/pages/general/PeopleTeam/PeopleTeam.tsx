import React, { FC } from 'react';
import { useStyle, Styles } from '@pma/dex-wrapper';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { AccessCalibration } from 'features/general/CalibrationSession';
import ViewNavigation from 'features/general/ViewNavigation';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import BaseWidget from 'components/BaseWidget';
import { Page } from 'pages';

export const TEST_ID = 'test-people-team-id';
export const SECONDARY_WIDGET_ID = 'secondary-widget-id';

const PeopleTeam: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { t } = useTranslation();

  return (
    <div data-test-id={TEST_ID}>
      <ViewNavigation />
      <div data-test-id={SECONDARY_WIDGET_ID} className={css(wrapperStyle)}>
        <AccessCalibration />
        <BaseWidget
          withButton={false}
          onClick={() => navigate(buildPath(Page.REPORT), { state: { backPath: pathname } })}
          customStyle={{ flex: '2 1 110px' }}
          data={t('access_your_team_reporting_dashboard', 'Access your team reporting dashboard')}
          iconGraphic={'account'}
          title={t('reporting', 'Reporting')}
        />
      </div>
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
} as Styles;

export default PeopleTeam;
