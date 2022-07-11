import React from 'react';
import { MenuItem as Item } from 'components/MenuItem';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages';

const MenuItem = () => {
  const { t } = useTranslation();
  return (
    <Item
      iconGraphic={'list'}
      linkTo={buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)}
      title={t('personal_development_plan', 'Personal Development Plan')}
    />
  );
};

export default MenuItem;
