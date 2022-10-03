import React from 'react';
import { colleagueUUIDSelector, timelinesExistSelector } from '@pma/store';
import { useSelector } from 'react-redux';

import { MenuItem as Item } from 'components/MenuItem';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages';

const MenuItem = () => {
  const { t } = useTranslation();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelineExist = useSelector(timelinesExistSelector(colleagueUuid));

  if (!timelineExist) return null;

  return (
    <Item
      iconGraphic={'goal'}
      linkTo={buildPath(Page.REVIEWS_VIEW)}
      title={t('quarterly_priorities', 'Quarterly Priorities')}
    />
  );
};

export default MenuItem;
