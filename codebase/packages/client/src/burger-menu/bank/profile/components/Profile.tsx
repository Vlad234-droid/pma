import React from 'react';
import { MenuItem as Item } from 'components/MenuItem';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages';

const MenuItem = () => {
  //TODO: Disabled tile PMA-2259
  return null;

  const { t } = useTranslation();
  return <Item iconGraphic={'account'} linkTo={buildPath(Page.PROFILE)} title={t('my_profile', 'My profile')} />;
};

export default MenuItem;
