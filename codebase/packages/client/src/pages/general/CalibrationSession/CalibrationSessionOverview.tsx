import React, { FC, useState } from 'react';
import { userCurrentPerformanceCyclePeriodSelector } from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CalibrationSessionOverview, {
  AddedToSession,
  CreateCalibrationSession,
  RatingsChange,
  RatingsSubmitted,
  Widget,
} from 'features/general/CalibrationSession';
import { Filter } from 'features/general/CalibrationSession/components/Filter';
import { useCalibrationStatistics } from 'features/general/CalibrationSession/hook';
import { role, usePermission } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import { Page } from 'pages/general/types';
import useDownloadExelFile from 'hooks/useDownloadExelFile';
import { getCurrentYear } from '../../../utils';

const REPORT_URL = 'reports/calibration-overview';

const CalibrationSessionPage: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { period: backPeriod } = (state as any) || {};
  const isPerform = usePermission([role.TALENT_ADMIN]);

  const [filters, setFilters] = useState<Record<string, Record<string, boolean>>>({});
  const [searchValue, setSearchValue] = useState<string>('');

  const performancePeriod = useSelector(userCurrentPerformanceCyclePeriodSelector) || getCurrentYear();
  const [period, setPeriod] = useState<string>(backPeriod || performancePeriod.toString());

  const { download: downloadReport, loading: reportLoading } = useDownloadExelFile({
    resource: { url: REPORT_URL, params: { year: period } },
    fileName: 'Report',
    ext: 'xlsx',
    errorMassage: {
      title: t('statistics_not_found', 'Statistics not found'),
      description: t('try_to_select_another_year', 'Try to select another year.'),
    },
  });

  const { loading, statistics } = useCalibrationStatistics({
    period,
    filters,
    searchValue: searchValue.length > 2 ? searchValue : undefined,
  });

  return (
    <div>
      <div>
        <Filter
          withDateFilter
          onChangePeriod={(active) => {
            backPeriod && navigate(pathname, { replace: true });
            setPeriod(active);
          }}
          period={period}
          onChangeFilters={(filters) => setFilters(filters)}
          onSearch={(value) => setSearchValue(value)}
        />
        {loading ? (
          <Spinner fullHeight />
        ) : (
          <div className={css(widgetContainerStyles)}>
            <Widget
              title={t('download_report', 'Download report')}
              graphics={'download'}
              onClick={downloadReport}
              isDisabled={reportLoading}
            />
            <Widget
              title={t('calibration_sessions', 'Calibration sessions')}
              graphics={'chart'}
              onClick={() => navigate(buildPath(Page.CALIBRATION_SESSION_LIST))}
              isDisabled={isPerform}
            />
            <CreateCalibrationSession />
            <RatingsSubmitted
              count={statistics?.submitted?.count?.toString() ?? '0'}
              total={statistics?.submitted?.total?.toString() ?? '0'}
            />
            <AddedToSession
              count={statistics?.['added-to-session']?.count?.toString() ?? '0'}
              total={statistics?.['added-to-session']?.total?.toString() ?? '0'}
            />
            <RatingsChange count={statistics?.['rating-changed']?.count?.toString() ?? '0'} />
          </div>
        )}
      </div>
      <CalibrationSessionOverview
        period={period}
        filters={filters}
        searchValue={searchValue.length > 2 ? searchValue : undefined}
      />
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
