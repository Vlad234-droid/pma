import React, { useState } from 'react';
import { useStyle, Rule, useBreakpoints, IconButton as BackButton } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';

import { PieChart } from 'components/PieChart';
import InfoTable from 'components/InfoTable';
import { useTranslation } from 'components/Translation';
import { View } from 'components/PieChart/config';
import { IconButton } from 'components/IconButton';
import { FilterOption } from 'features/Shared';
import FilterModal from 'features/Report/components/FilterModal';
import { buildPath } from 'features/Routes';
import { ChartContent } from './components/ChartContent';
import { TableContent } from './components/TableContent';

import { useTileStatistics } from './hooks';
import { getReportTitles, checkTableChart, getTableChartTitle } from './utils';
import { initialValues } from 'features/Report/config';
import { getCurrentYear } from 'utils/date';
import { ReportPage } from 'config/enum';

import { Page } from 'pages';

export const OBJECTIVES_WRAPPER = 'objectives_wrapper';

const TileReport = () => {
  const { css } = useStyle();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState<string>('');
  const [filterModal, setFilterModal] = useState(false);
  const [filterData, setFilterData] = useState<any>(initialValues);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);

  const { type, query } = useTileStatistics();

  const checkBusinessType = !!type && type !== ReportPage.REPORT_NEW_TO_BUSINESS;

  const isTableChart = checkTableChart(type);

  const getContent = () => {
    if (isTableChart) return <TableContent type={type} />;
    return <ChartContent checkBusinessType={checkBusinessType} type={type} />;
  };

  return (
    <div data-test-id={OBJECTIVES_WRAPPER}>
      <div className={css(arrowLeftStyle)}>
        <BackButton
          onPress={() => {
            navigate({
              pathname: buildPath(Page.REPORT),
              //@ts-ignore
              search: new URLSearchParams({ year: query.year || getCurrentYear() }).toString(),
            });
          }}
          graphic='backwardLink'
        />
      </div>
      <div className={css(header)}>
        <div className={css(flexCenterStyled)}>
          <IconButton
            graphic='information'
            iconStyles={iconStyle}
            onPress={() => {
              console.log();
            }}
          />
          <FilterOption
            focus={focus}
            customIcon={true}
            searchValue={searchValueFilterOption}
            onFocus={setFocus}
            withIcon={false}
            customStyles={{
              ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
              ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
            }}
            onChange={(e) => setSearchValueFilterOption(() => e.target.value)}
            onSettingsPress={() => {
              setFilterModal((prev) => !prev);
              setFocus(false);
            }}
            setSearchValueFilterOption={setSearchValueFilterOption}
          />
          <FilterModal
            filterModal={filterModal}
            setFilterModal={setFilterModal}
            filterData={filterData}
            setFilterData={setFilterData}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            isCheckAll={isCheckAll}
            setIsCheckAll={setIsCheckAll}
          />
        </div>
      </div>
      <div className={css(wrapperStyle)}>
        <div className={css(leftColumn)}>{getContent()}</div>
        <div className={css(rightColumn)}>
          {isTableChart ? (
            <InfoTable mainTitle={getTableChartTitle(t, type)} data={type} />
          ) : (
            <PieChart title={getReportTitles(t, type)?.chart} data={type} display={View.CHART} />
          )}
        </div>
      </div>
    </div>
  );
};

const arrowLeftStyle: Rule = () => {
  return {
    position: 'fixed',
    top: '34px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    left: '16px',
  };
};

const rightColumn: Rule = {
  display: 'flex',
  gap: '8px',
  flex: 4,
  flexBasis: '400px',
  marginTop: '50px',
  alignSelf: 'flex-end',
};

const leftColumn: Rule = {
  display: 'flex',
  gap: '8px',
  flexDirection: 'row',
  flex: 6,
  flexBasis: '550px',
};

const header: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    flexWrap: medium ? 'wrap' : 'nowrap',
    ...(medium && { flexBasis: '250px' }),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '10px',
  };
};

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'space-between',
};

const wrapperStyle: Rule = () => {
  return {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap-reverse',
    marginTop: '8px',
  };
};

const iconStyle: Rule = {
  marginRight: '10px',
};

export default TileReport;
