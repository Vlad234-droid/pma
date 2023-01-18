import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getCalibrationSessionsSelector } from '@pma/store';

import useDownloadExelFile from 'hooks/useDownloadExelFile';
import { Widget } from 'features/general/CalibrationSession/widgets';
import { useTranslation } from 'components/Translation';
import { getFinancialYear } from 'utils';

const REPORT_URL = 'reports/calibration-session';

const Download: FC<{ uuid: string }> = ({ uuid }) => {
  const { t } = useTranslation();

  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];

  const { startTime } = calibrationSessions.find((cs) => cs.uuid === uuid) || {};

  const downloadReport = useDownloadExelFile({
    resource: {
      url: REPORT_URL,
      params: { year: getFinancialYear().toString(), 'calibration-session-uuid': uuid },
    },
    fileName: 'Report',
    ext: 'xlsx',
    errorMassage: {
      title: t('statistics_not_found', 'Statistics not found'),
      description: '',
    },
  });

  return (
    <Widget
      graphics={'download'}
      title={t('download_report', 'Download report')}
      onClick={downloadReport}
      isDisabled={!startTime || !uuid}
    />
  );
};

export default Download;
