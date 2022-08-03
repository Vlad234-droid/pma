import React from 'react';
import { colleagueUUIDSelector, timelinesExistSelector } from '@pma/store';
import { useSelector } from 'react-redux';

import { buildPath } from 'features/general/Routes';
import { MenuItem as Item } from 'components/MenuItem';
import { useTranslation } from 'components/Translation';
import { useHeaderContainer } from 'contexts/headerContext';
import { Page } from 'pages';

const MenuItem = () => {
  const { linkTitle } = useHeaderContainer();
  const { t } = useTranslation();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelineExist = useSelector(timelinesExistSelector(colleagueUuid));

  if (!timelineExist) return null;

  return (
    <Item
      iconGraphic={'goal'}
      linkTo={buildPath(Page.REVIEWS_VIEW)}
      title={
        linkTitle?.[Page.REVIEWS_VIEW]
          ? linkTitle[Page.REVIEWS_VIEW]
          : t('my_objectives_and_reviews', 'My objectives and reviews')
      }
    />
  );
};

export default MenuItem;
