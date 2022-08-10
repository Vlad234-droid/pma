import React, { useState } from 'react';
import { CreateRule, IconButton as BackButton, Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';

import InfoTable from 'components/InfoTable';
import FilterModal from 'features/general/Report/components/FilterModal';
import { PieChart } from 'components/PieChart';
import { useTranslation } from 'components/Translation';
import { FilterOption } from 'features/general/Shared';
import { buildPath } from 'features/general/Routes';
import { ChartContent } from './components/ChartContent';
import { TableContent } from './components/TableContent';
// TODO: enabled when content of chart meets business requirements
// import { WorkLevelContent } from './components/WorkLevelContent';
import { View } from 'components/PieChart/config';
import { ColleaguesCount } from 'features/general/Report/components/ColleaguesCount';
import { useStatisticsReport } from 'features/general/Report/hooks';

import { useTileStatistics } from './hooks';
import {
  checkBusinessType,
  checkExceptionType,
  checkTableChart,
  getReportTitles,
  checkColleaguesCount,
  getTableChartTitle,
} from './utils';
import { initialValues, metaStatuses } from 'features/general/Report/config';
import { getCurrentYear } from 'utils/date';

import { Page } from 'pages';

export const OBJECTIVES_WRAPPER = 'objectives-wrapper';

const TileReport = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState<string>('');
  const [filterModal, setFilterModal] = useState(false);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);
  const [isFullView] = useState<boolean>(false);

  const { colleaguesCount } = useStatisticsReport([...metaStatuses]);

  const { type, query } = useTileStatistics();

  const isBusinessType = checkBusinessType(type);
  const isTableChart = checkTableChart(type);
  // TODO: enabled when content of chart meets business requirements
  // const isWorkLevel = checkWorkLevel(type);
  const isException = checkExceptionType(type);
  const isShowCount = checkColleaguesCount(type);

  const getContent = () => {
    // TODO: enabled when content of chart meets business requirements
    // if (isWorkLevel) return <WorkLevelContent toggleFullView={toggleFullView} isFullView={isFullView} />;
    if (isTableChart) return <TableContent type={type} />;
    return <ChartContent isException={isException} type={type} />;
  };

  return (
    <div data-test-id={OBJECTIVES_WRAPPER}>
      <div className={css(arrowLeftStyle)}>
        <BackButton
          testId={'test-back-button'}
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
      <div className={css(header({ mobileScreen }))}>
        {isShowCount && <ColleaguesCount countStyles={countStyles} colleaguesCount={colleaguesCount} />}
        <div className={css(flexCenterStyled)}>
          <FilterOption
            testSettingsId='filter-options-id'
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
            initialValues={initialValues}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            isCheckAll={isCheckAll}
            setIsCheckAll={setIsCheckAll}
          />
        </div>
      </div>
      <div data-test-id={'test-pie-chart'} className={css(wrapperStyle)}>
        <div data-test-id={'content-id'} className={css(leftColumn)}>
          {getContent()}
        </div>
        {!isFullView && (
          <div data-test-id={'full-view'} className={css(rightColumn({ isTableChart }))}>
            {/*TODO: enabled when content of chart meets business requirements*/}
            {/*isWorkLevel ? (*/}
            {/*<PieChart*/}
            {/*    title={getReportTitles(t, type)?.chart}*/}
            {/*    data={[{ percent: approvedObjPercent, title: approvedObjTitle }]}*/}
            {/*    display={View.CHART}*/}
            {/*/>*/}
            {/*) :*/}

            {isTableChart ? (
              <InfoTable mainTitle={getTableChartTitle(t, type)} data={type} />
            ) : (
              <PieChart
                title={getReportTitles(t, type)?.chart}
                data={type}
                display={!isBusinessType ? View.CHART : View.QUANTITY}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const countStyles: Rule = ({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  fontWeight: theme.font.weight.regular,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.base,
});

const arrowLeftStyle: Rule = ({ theme }) => {
  return {
    position: 'fixed',
    top: '34px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    left: theme.spacing.s4,
  };
};

const rightColumn: CreateRule<{ isTableChart: boolean }> =
  ({ isTableChart }) =>
  ({ theme }) => ({
    display: 'flex',
    gap: theme.spacing.s2,
    flex: 4,
    flexBasis: '400px',
    marginTop: isTableChart ? '51px' : '73px',
    alignSelf: 'flex-end',
  });

const leftColumn: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flexDirection: 'row',
  flex: 6,
  flexBasis: '550px',
});

const header: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  position: 'relative',
  display: 'flex',
  flexWrap: mobileScreen ? 'wrap' : 'nowrap',
  ...(mobileScreen && { flexBasis: '250px' }),
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: '10px',
});

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'space-between',
};

const wrapperStyle: Rule = ({ theme }) => {
  return {
    display: 'flex',
    gap: theme.spacing.s2,
    flexWrap: 'wrap-reverse',
    marginTop: theme.spacing.s2,
  };
};

export default TileReport;
