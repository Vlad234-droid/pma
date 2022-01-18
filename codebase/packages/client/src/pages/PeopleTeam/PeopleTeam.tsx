import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyle, Styles } from '@dex-ddl/core';

import { RouterSwitch } from 'components/RouterSwitch';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import SecondaryWidget, { Props as SecondaryWidgetProps } from 'features/SecondaryWidget';

export const TEST_ID = 'my-team';

// TODO: People Team role?
// TODO: icon for calibrations
// TODO: add translation

const PeopleTeam: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'calibration',
      title: t('Calibration'),
      date: t('Purus id ut tempus euismod ut.'),
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.CALIBRATION)),
      withButton: false,
    },
    {
      iconGraphic: 'account',
      title: t('Reporting'),
      date: t('Manga quis vivera sit tristique'),
      customStyle: { flex: '2 1 110px' },
      onClick: () => console.log('Navigate to reporting page'),
      withButton: false,
    },
  ];

  return (
    <div>
      <div className={css({ display: 'flex', justifyContent: 'center' })}>
        <RouterSwitch
          links={[
            { link: buildPath(Page.CONTRIBUTION), name: 'My View' },
            { link: buildPath(Page.MY_TEAM), name: 'My Team' },
            { link: buildPath(Page.PEOPLE_TEAM), name: 'People Team' },
          ]}
        />
      </div>
      <div className={css(wrapperStyle)}>
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
