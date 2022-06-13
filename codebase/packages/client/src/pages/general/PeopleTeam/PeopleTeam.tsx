import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyle, Styles } from '@pma/dex-wrapper';

import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import SecondaryWidget, { Props as SecondaryWidgetProps } from 'features/general/SecondaryWidget';
import ViewNavigation from 'features/general/ViewNavigation';

export const TEST_ID = 'test-people-team-id';
export const SECONDARY_WIDGET_ID = 'secondary-widget-id';

const PeopleTeam: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'rating',
      title: t('calibration', 'Calibration'),
      data: t('click_here_to_access_calibration', 'Click here to access the calibration area'),
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.CALIBRATION)),
      withButton: false,
    },
    {
      iconGraphic: 'account',
      title: t('reporting', 'Reporting'),
      data: t('Manga quis vivera sit tristique'),
      customStyle: { flex: '2 1 110px' },
      onClick: () => console.log('Navigate to reporting page'),
      withButton: false,
    },
  ];

  return (
    <div data-test-id={TEST_ID}>
      <ViewNavigation />
      <div data-test-id={SECONDARY_WIDGET_ID} className={css(wrapperStyle)}>
        {widgets.map((props, idx) => (
          <SecondaryWidget key={idx} {...props} />
        ))}
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
