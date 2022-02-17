import React, { FC, useState, useEffect } from 'react';
import { ReportActions, approvedObjectivesSelector, notApprovedObjectivesSelector } from '@pma/store';
import { Button, colors, CreateRule, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import { IconButton } from 'components/IconButton';
import { FilterOption } from 'features/Shared';
import { PieChart } from 'components/PieChart';
import { View } from 'components/PieChart/PieChart';
import { GenericItemField } from 'components/GenericForm';
import { Item, Select } from 'components/Form';
import FilterModal from './components/FilterModal';
import InfoTable from './components/InfoTable';
import { DonwloadReportModal } from './Modals';
import { Trans } from 'components/Translation';
import { Rating, TitlesReport } from 'config/enum';
import AppliedFilters from './components/AppliedFilters';
import { createYearSchema, field_options, years, listOfStatuses, metaStatuses } from './config';
import { downloadCsvFile } from './utils';

import useStatisticsReport from './hooks';

export const REPORT_WRAPPER = 'REPORT_WRAPPER';

const Report: FC = () => {
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [showDownloadReportModal, setShowDownloadReportModal] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [filterData, setFilterData] = useState<any>([
    {
      title: 'Work level',
      data: [
        { title: 'Select All' },
        { title: 'Colleagues' },
        { title: 'Work level 1' },
        { title: 'Work level 2' },
        { title: 'Work level 3' },
      ],
    },
    {
      title: 'Operational areas',
      data: [
        { title: 'Select All' },
        { title: 'Objectives' },
        { title: 'PDP' },
        { title: 'Mid-year Review' },
        { title: 'End-year Review' },
      ],
    },
    {
      title: 'Gender',
      data: [{ title: 'Select All' }, { title: 'Male' }, { title: 'Female' }],
    },
  ]);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);

  const [approvedObjPercent, approvedObjTitle] = useSelector(approvedObjectivesSelector);
  const [notApprovedObjPercent, notApprovedObjTitle] = useSelector(notApprovedObjectivesSelector);

  const {
    myrSubmittedPercentage,
    myrApprovedPercentage,
    eyrSubmittedPercentage,
    eyrApprovedPercentage,
    feedbackRequestedPercentage,
    feedbackGivenPercentage,
    objectivesSubmittedPercentage,
    objectivesApprovedPercentage,
    myrRatingBreakdownBelowExpectedPercentage,
    myrRatingBreakdownBelowExpectedCount,
    myrRatingBreakdownSatisfactoryPercentage,
    myrRatingBreakdownSatisfactoryCount,
    myrRatingBreakdownGreatPercentage,
    myrRatingBreakdownGreatCount,
    myrRatingBreakdownOutstandingPercentage,
    myrRatingBreakdownOutstandingCount,
    eyrRatingBreakdownBelowExpectedPercentage,
    eyrRatingBreakdownBelowExpectedCount,
    eyrRatingBreakdownSatisfactoryPercentage,
    eyrRatingBreakdownSatisfactoryCount,
    eyrRatingBreakdownGreatPercentage,
    eyrRatingBreakdownGreatCount,
    eyrRatingBreakdownOutstandingPercentage,
    eyrRatingBreakdownOutstandingCount,
    newToBusinessCount,
    anniversaryReviewPerQuarter1Percentage,
    anniversaryReviewPerQuarter1Count,
    anniversaryReviewPerQuarter2Percentage,
    anniversaryReviewPerQuarter2Count,
    anniversaryReviewPerQuarter3Percentage,
    anniversaryReviewPerQuarter3Count,
    anniversaryReviewPerQuarter4Percentage,
    anniversaryReviewPerQuarter4Count,
  } = useStatisticsReport([...metaStatuses]);

  useEffect(() => {
    dispatch(ReportActions.getObjectivesStatistics({ year: years[2021] }));
  }, []);

  useEffect(() => {
    dispatch(
      ReportActions.getObjectivesReport({
        year: years[2021],
        statuses_in: [...listOfStatuses],
      }),
    );
  }, []);

  const { css } = useStyle();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createYearSchema),
  });

  const changeYearHandler = (value) => {
    console.log('value', value);
  };

  const handleCloseModal = () => {
    setShowDownloadReportModal(false);
  };

  const getAppliedReport = () => [...new Set(checkedItems.map((item) => item.split('-')[0]))];

  const clearAppliedFilters = (filterTitle) => {
    if (isCheckAll.length) setIsCheckAll((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
    setCheckedItems((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
  };

  const quantity = getAppliedReport().length;

  return (
    <>
      <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={REPORT_WRAPPER}>
        <div className={css(spaceBetween({ quantity }))}>
          {!!getAppliedReport().length && (
            <AppliedFilters clearAppliedFilters={clearAppliedFilters} getAppliedReport={getAppliedReport} />
          )}

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

            <IconButton
              graphic='download'
              customVariantRules={{
                default: iconBtnStyle as Rule,
              }}
              iconStyles={iconDownloadStyle}
              onPress={() => {
                setShowDownloadReportModal(true);
              }}
            />
          </div>
        </div>
        <div className={css(pieChartWrapper)}>
          <div className={css(leftColumn)}>
            <PieChart
              title={TitlesReport.OBJECTIVES_SUBMITTED}
              data={[{ percent: objectivesSubmittedPercentage }]}
              display={View.CHART}
            />
            <PieChart
              title={TitlesReport.WL4And5}
              display={View.CHART}
              data={[
                { percent: approvedObjPercent, title: approvedObjTitle },
                { percent: notApprovedObjPercent, title: notApprovedObjTitle },
              ]}
            />

            <PieChart
              title={TitlesReport.MYR}
              display={View.CHART}
              data={[
                { percent: myrSubmittedPercentage, title: TitlesReport.SUBMITTED },
                { percent: myrApprovedPercentage, title: TitlesReport.APPROVED },
              ]}
            />

            <PieChart
              title={TitlesReport.EYR}
              display={View.CHART}
              data={[
                { percent: eyrSubmittedPercentage, title: TitlesReport.SUBMITTED },
                { percent: eyrApprovedPercentage, title: TitlesReport.APPROVED },
              ]}
            />
            <PieChart
              title={TitlesReport.MOMENT_FEEDBACK}
              display={View.CHART}
              data={[
                { percent: feedbackRequestedPercentage, title: TitlesReport.REQUESTED },
                { percent: feedbackGivenPercentage, title: TitlesReport.GIVEN },
              ]}
            />
          </div>

          <div className={css(rightColumn)}>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <div className={css({ flex: '1' })}>
                <PieChart
                  title={TitlesReport.OBJECTIVES_APPROVED}
                  data={[{ percent: objectivesApprovedPercentage }]}
                  display={View.CHART}
                />
              </div>
              <div className={css({ display: 'flex', flexDirection: 'column' })}>
                <Button styles={[buttonCoreStyled]} onPress={downloadCsvFile}>
                  <Trans>WL4-5 report</Trans>
                </Button>
                <form>
                  <h2 className={css(yearLabel)}>View previous years</h2>
                  <GenericItemField
                    name={`year_options`}
                    methods={methods}
                    Wrapper={({ children }) => <Item withIcon={false}>{children}</Item>}
                    Element={Select}
                    options={field_options}
                    onChange={(value) => {
                      changeYearHandler(value);
                    }}
                  />
                </form>
              </div>
            </div>
            <InfoTable
              mainTitle={TitlesReport.MYR_BREAKDOWN}
              data={[
                {
                  percent: myrRatingBreakdownBelowExpectedPercentage,
                  quantity: myrRatingBreakdownBelowExpectedCount,
                  title: Rating.BELOW_EXPECTED,
                },
                {
                  percent: myrRatingBreakdownSatisfactoryPercentage,
                  quantity: myrRatingBreakdownSatisfactoryCount,
                  title: Rating.SATISFACTORY,
                },
                {
                  percent: myrRatingBreakdownGreatPercentage,
                  quantity: myrRatingBreakdownGreatCount,
                  title: Rating.GREAT,
                },
                {
                  percent: myrRatingBreakdownOutstandingPercentage,
                  quantity: myrRatingBreakdownOutstandingCount,
                  title: Rating.OUTSTANDING,
                },
              ]}
            />
            <InfoTable
              mainTitle={TitlesReport.EYR_BREAKDOWN}
              data={[
                {
                  percent: eyrRatingBreakdownBelowExpectedPercentage,
                  quantity: eyrRatingBreakdownBelowExpectedCount,
                  title: Rating.BELOW_EXPECTED,
                },
                {
                  percent: eyrRatingBreakdownSatisfactoryPercentage,
                  quantity: eyrRatingBreakdownSatisfactoryCount,
                  title: Rating.SATISFACTORY,
                },
                {
                  percent: eyrRatingBreakdownGreatPercentage,
                  quantity: eyrRatingBreakdownGreatCount,
                  title: Rating.GREAT,
                },
                {
                  percent: eyrRatingBreakdownOutstandingPercentage,
                  quantity: eyrRatingBreakdownOutstandingCount,
                  title: Rating.OUTSTANDING,
                },
              ]}
            />
            <div className={css(flexContainer)}>
              <PieChart
                title={TitlesReport.BUSINESS}
                data={[{ percent: newToBusinessCount, title: Rating.COLLEAGUES }]}
                display={View.QUANTITY}
              />
            </div>
            <InfoTable
              mainTitle={TitlesReport.ANNIVERSARY_REVIEWS}
              preTitle={TitlesReport.HOURLY_PAID}
              data={[
                {
                  percent: anniversaryReviewPerQuarter1Percentage,
                  quantity: anniversaryReviewPerQuarter1Count,
                  title: Rating.QUARTER_1,
                },
                {
                  percent: anniversaryReviewPerQuarter2Percentage,
                  quantity: anniversaryReviewPerQuarter2Count,
                  title: Rating.QUARTER_2,
                },
                {
                  percent: anniversaryReviewPerQuarter3Percentage,
                  quantity: anniversaryReviewPerQuarter3Count,
                  title: Rating.QUARTER_3,
                },
                {
                  percent: anniversaryReviewPerQuarter4Percentage,
                  quantity: anniversaryReviewPerQuarter4Count,
                  title: Rating.QUARTER_4,
                },
              ]}
            />
          </div>
        </div>
      </div>

      {showDownloadReportModal && <DonwloadReportModal onClose={handleCloseModal} />}
    </>
  );
};

const buttonCoreStyled: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '133px',
  background: theme.colors.tescoBlue,
  color: `${theme.colors.white}`,
  margin: '0px 42px 20px auto',
});

const flexContainer: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
  '& > div': {
    flex: 1,
  },
} as Styles;

const iconDownloadStyle: Rule = {
  width: '22px',
  height: '22px',
  position: 'relative',
  top: '2px',
  left: '2px',
};

const iconBtnStyle = {
  padding: '0',
  marginLeft: '5px',
  display: 'flex',
  height: '38px',
  width: '38px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  border: `1px solid ${colors.tescoBlue}`,
  borderRadius: '20px',
  cursor: 'pointer',
  position: 'relative',
  '& > span': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const pieChartWrapper: Rule = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};
const leftColumn: Rule = {
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  flex: 4,
  flexBasis: '400px',
};
const rightColumn: Rule = {
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  flex: 6,
  flexBasis: '550px',
};

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'space-between',
  height: '116px',
};

const spaceBetween: CreateRule<{ quantity: number }> = ({ quantity }) => {
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    flexWrap: medium ? 'wrap' : 'nowrap',
    ...(medium && { flexBasis: '250px' }),
    justifyContent: quantity ? 'space-between' : 'flex-end',
    alignItems: 'center',
  };
};

const iconStyle: Rule = {
  marginRight: '10px',
};

const yearLabel: Rule = ({ theme }) => ({
  margin: '0px 0px 8px 0px',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  color: theme.colors.link,
});

export default Report;
