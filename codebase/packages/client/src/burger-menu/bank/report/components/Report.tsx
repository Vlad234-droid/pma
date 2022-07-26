import React from 'react';
import { MenuItem as Item } from 'components/MenuItem';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages';

const MenuItem = () => {
  //TODO: Disabled tile PMA-2259
  return null;

  const { t } = useTranslation();

  return <Item iconGraphic={'team'} linkTo={buildPath(Page.REPORT)} title={t('team_reporting', 'Team reporting')} />;
};

export default MenuItem;
