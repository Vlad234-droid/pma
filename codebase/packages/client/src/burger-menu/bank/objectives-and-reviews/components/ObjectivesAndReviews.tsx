import React from 'react';
import { buildPath } from 'features/general/Routes';
import { MenuItem as Item } from 'components/MenuItem';
import { useTranslation } from 'components/Translation';
import { useHeaderContainer } from 'contexts/headerContext';
import { Page } from 'pages';

const MenuItem = () => {
  const { linkTitle } = useHeaderContainer();
  const { t } = useTranslation();
  return (
    <Item
      iconGraphic={'goal'}
      linkTo={buildPath(Page.OBJECTIVES_VIEW)}
      title={
        linkTitle?.[Page.OBJECTIVES_VIEW]
          ? linkTitle[Page.OBJECTIVES_VIEW]
          : t('my_objectives_and_reviews', 'My objectives and reviews')
      }
    />
  );
};

export default MenuItem;
