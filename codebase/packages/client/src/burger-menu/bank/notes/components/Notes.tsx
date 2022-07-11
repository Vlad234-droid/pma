import React from 'react';
import { MenuItem as Item } from 'components/MenuItem';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages';

const MenuItem = () => {
  const { t } = useTranslation();
  return <Item iconGraphic={'edit'} linkTo={buildPath(Page.NOTES)} title={t('my_notes', 'My notes')} />;
};

export default MenuItem;
