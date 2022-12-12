import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import CalibrationSessionOverview, {
  CalibrationsCompleted,
  CreateCalibrationSession,
  RatingsChange,
  RatingsSubmitted,
  Widget,
} from 'features/general/CalibrationSession';
import { Filter } from 'features/general/CalibrationSession/components/Filter';
import { role, usePermission } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages/general/types';
import useDownloadExelFile from 'hooks/useDownloadExelFile';
import { getCurrentYear } from 'utils';

const REPORT_URL = 'reports/calibration-overview';

const CalibrationSessionPage: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isPerform = usePermission([role.PEOPLE_TEAM]);

  const [period, setPeriod] = useState<string>(getCurrentYear().toString());

  const downloadReport = useDownloadExelFile({
    resource: { url: REPORT_URL, params: { year: period } },
    fileName: 'Report',
    ext: 'xlsx',
    errorMassage: {
      title: t('statistics_not_found', 'Statistics not found'),
      description: t('try_to_select_another_year', 'Try to select another year.'),
    },
  });

  return (
    <div>
      <div>
        <Filter withDateFilter onChangePeriod={(active) => setPeriod(active)} period={period} />
        <div className={css(widgetContainerStyles)}>
          <Widget title={t('download_report', 'Download report')} graphics={'download'} onClick={downloadReport} />
          <Widget
            title={t('calibration_sessions', 'Calibration sessions')}
            graphics={'chart'}
            onClick={() => navigate(buildPath(Page.CALIBRATION_SESSION_LIST))}
            isDisabled={!isPerform}
          />
          <CreateCalibrationSession />
          <RatingsSubmitted />
          <CalibrationsCompleted />
          <RatingsChange />
        </div>
      </div>
      <CalibrationSessionOverview period={period} />
    </div>
  );
};

const widgetContainerStyles: Rule = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '8px',
  marginBottom: '56px',
};

export default CalibrationSessionPage;
