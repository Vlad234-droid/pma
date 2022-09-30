import React from 'react';
import { buildPath } from 'features/general/Routes';
import { MenuItem as Item } from 'components/MenuItem';
import { useTranslation } from 'components/Translation';
import { useHeaderContainer } from 'contexts/headerContext';
import { Page } from 'pages';
import { useTenant } from 'features/general/Permission';
import { Tenant } from 'utils';

const MenuItem = () => {
  const { linkTitle } = useHeaderContainer();
  const { t } = useTranslation();
  const tenant = useTenant();
  return (
    <Item
      iconGraphic={'goal'}
      linkTo={buildPath(Page.REVIEWS_VIEW)}
      title={
        linkTitle?.[Page.REVIEWS_VIEW]
          ? linkTitle[Page.REVIEWS_VIEW]
          : t(
              'my_objectives_and_reviews',
              tenant === Tenant.GENERAL ? 'My objectives and reviews' : 'Quarterly priorities',
              { ns: tenant },
            )
      }
    />
  );
};

export default MenuItem;
