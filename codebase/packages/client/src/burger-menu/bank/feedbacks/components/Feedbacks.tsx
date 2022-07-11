import React from 'react';
import { MenuItem as Item } from 'components/MenuItem';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages';

const MenuItem = () => {
  const { t } = useTranslation();
  return <Item iconGraphic={'chat'} linkTo={buildPath(Page.FEEDBACKS)} title={t('feedback', 'Feedback')} />;
};

export default MenuItem;
