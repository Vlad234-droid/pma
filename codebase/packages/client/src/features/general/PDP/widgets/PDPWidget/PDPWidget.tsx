import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { earlyDataPDPSelector, PDPActions, schemaMetaPDPSelector } from '@pma/store';

import { Page } from 'pages';
import { DATE_STRING_FORMAT, formatDateString } from 'utils';
import { buildPath } from 'features/general/Routes';
import BaseWidget from 'components/BaseWidget';
import { useTranslation } from 'components/Translation';

const PDPWidget: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dates = useSelector(earlyDataPDPSelector) || '';
  const pdpSelector = useSelector(schemaMetaPDPSelector)?.goals || [];
  const addedDate = dates && pdpSelector.length ? formatDateString(dates, DATE_STRING_FORMAT) : '';

  useEffect(() => {
    if (pdpSelector.length) {
      dispatch(PDPActions.getEarlyAchievementDate({}));
    }
  }, [pdpSelector]);

  return (
    <BaseWidget
      date={addedDate}
      iconGraphic={'list'}
      title={t('personal_development_plan', 'Personal development Plan')}
      customStyle={{ flex: '2 1 110px' }}
      onClick={() => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN))}
    />
  );
};

export default PDPWidget;
