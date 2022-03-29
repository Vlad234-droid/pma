import React, { useCallback, useState } from 'react';
import { useStyle, Rule, useBreakpoints, IconButton as BackButton } from '@dex-ddl/core';
import { useNavigate } from 'react-router-dom';

import ColleagueProfile from './components/ColleagueProfile';
import { PieChart } from 'components/PieChart';
import { useTranslation } from 'components/Translation';
import { View } from 'components/PieChart/config';
import { IconButton } from 'components/IconButton';
import { FilterOption } from 'features/Shared';
import FilterModal from 'features/Report/components/FilterModal';
import { buildPath } from 'features/Routes';

import { useObjectivesProfile } from './hooks';
import { ObjectiveType } from './config';
import { TitlesReport } from 'config/enum';
import { initialValues } from 'features/Report/config';
import { getCurrentYear } from 'utils/date';

import { Page } from 'pages';

export const OBJECTIVES_WRAPPER = 'objectives_wrapper';
export const APPROVED_COLLEAGUES_WRAPPER = 'approved-colleagues_wrapper';
export const NOT_APPROVED_COLLEAGUES_WRAPPER = 'not-approved-colleagues_wrapper';

const ObjectivesReportStatistics = () => {
  const { css } = useStyle();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState<string>('');
  const [filterModal, setFilterModal] = useState(false);
  const [filterData, setFilterData] = useState<any>(initialValues);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);

  const [pending, done, objectiveType, objectivesSubmittedPercentage, objectivesApprovedPercentage, query] =
    useObjectivesProfile();

  const checkObjectiveType = () => objectiveType && objectiveType === ObjectiveType.SUBMITTED;

  const getContent = useCallback(() => {
    const content = (
      <div className={css({ width: '100%' })}>
        <div>
          {!!pending.length && (
            <span className={css(objectiveTypeStyle)}>
              {objectiveType === ObjectiveType.SUBMITTED
                ? t('not_submitted', 'Not submitted')
                : t('not_approved', 'Not approved')}
            </span>
          )}
          {pending.map((item) => (
            <div key={item.uuid} className={css({ marginTop: '8px' })} data-test-id={NOT_APPROVED_COLLEAGUES_WRAPPER}>
              <ColleagueProfile colleague={item} />
            </div>
          ))}
        </div>
        <div>
          {!!done.length && (
            <span className={css(objectiveTypeStyle, { marginTop: '24px' })}>
              {objectiveType === ObjectiveType.SUBMITTED ? t('submitted', 'Submitted') : t('approved', 'Approved')}
            </span>
          )}
          {done.map((item) => (
            <div key={item.uuid} className={css({ marginTop: '8px' })} data-test-id={APPROVED_COLLEAGUES_WRAPPER}>
              <ColleagueProfile colleague={item} />
            </div>
          ))}
        </div>
      </div>
    );

    return content;
  }, [pending, done]);

  return (
    <div data-test-id={OBJECTIVES_WRAPPER}>
      <div className={css(arrowLeftStyle)}>
        <BackButton
          onPress={() => {
            navigate({
              pathname: buildPath(Page.REPORT),
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
          <PieChart
            title={
              checkObjectiveType()
                ? t(TitlesReport.OBJECTIVES_SUBMITTED, 'Objectives submitted')
                : t(TitlesReport.OBJECTIVES_APPROVED, 'Objectives approved')
            }
            data={[
              {
                percent: checkObjectiveType() ? objectivesSubmittedPercentage : objectivesApprovedPercentage,
              },
            ]}
            display={View.CHART}
          />
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
  maxHeight: '185px',
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

const objectiveTypeStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  marginBottom: '22px',
  display: 'inline-block',
});

export default ObjectivesReportStatistics;
