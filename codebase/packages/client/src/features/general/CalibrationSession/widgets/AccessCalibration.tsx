import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import {
  calibrationReviewMetaSelector,
  colleagueUUIDSelector,
  getCalibrationPointSelector,
  isAnniversaryTimelineType,
} from '@pma/store';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import BaseWidget from 'components/BaseWidget';
import { Icon } from 'components/Icon';
import { Status } from 'config/enum';
import { isDateFromISOAfterNow, isDateFromISOBeforeNow } from 'utils';
import { Page } from 'pages';

const AccessCalibration: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { css } = useStyle();

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loading } = useSelector(calibrationReviewMetaSelector);
  const { endTime, startTime, status: TLPStatus } = useSelector(getCalibrationPointSelector(colleagueUuid, 'CURRENT'));
  const isAnniversaryColleague = useSelector(isAnniversaryTimelineType(colleagueUuid, 'CURRENT'));

  const isStartedPoint =
    ![Status.NOT_STARTED, Status.COMPLETED].includes(TLPStatus) &&
    isDateFromISOAfterNow(startTime) &&
    isDateFromISOBeforeNow(endTime);

  if (isAnniversaryColleague || loading) return null;

  return (
    <BaseWidget
      iconGraphic={'rating'}
      title={t('calibration', 'Calibration')}
      customStyle={{ flex: '2 1 110px' }}
      background={isStartedPoint ? 'tescoBlue' : 'white'}
      withButton={false}
      onClick={() => navigate(buildPath(Page.CALIBRATION_SESSION_OVERVIEW))}
      data={
        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' })}>
          {/*//@ts-ignore*/}
          {isStartedPoint && <Icon graphic={'attention'} iconStyles={{ marginBottom: '0px !important' }} />}
          {t('view_and_set_up_calibration', 'View and set up Calibration')}
        </div>
      }
    />
  );
};

export default AccessCalibration;
