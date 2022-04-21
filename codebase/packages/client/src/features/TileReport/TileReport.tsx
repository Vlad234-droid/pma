import React, { useState } from 'react';
import { useStyle, Rule, CreateRule, IconButton as BackButton } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';

import InfoTable from 'components/InfoTable';
import FilterModal from 'features/Report/components/FilterModal';
import { PieChart } from 'components/PieChart';
import { useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import { FilterOption } from 'features/Shared';
import { buildPath } from 'features/Routes';
import { ChartContent } from './components/ChartContent';
import { TableContent } from './components/TableContent';
import { WorkLevelContent } from './components/WorkLevelContent';
import { View } from 'components/PieChart/config';

import { useTileStatistics } from './hooks';
import { getReportTitles, checkTableChart, getTableChartTitle, checkBusinessType, checkWorkLevel } from './utils';
import { initialValues } from 'features/Report/config';
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
  const [filterData, setFilterData] = useState<any>(initialValues);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);

  const { type, query } = useTileStatistics();

  const isBusinessType = checkBusinessType(type);

  const isTableChart = checkTableChart(type);

  const isWorkLevel = checkWorkLevel(type);

  const getContent = () => {
    if (isWorkLevel) return <WorkLevelContent />;
    if (isTableChart) return <TableContent type={type} />;
    return <ChartContent isBusinessType={isBusinessType} type={type} />;
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
      <div className={css(header({ mobileScreen }))}>
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

const rightColumn: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flex: 4,
  flexBasis: '400px',
  marginTop: '72px',
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

const iconStyle: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
});

export default TileReport;
