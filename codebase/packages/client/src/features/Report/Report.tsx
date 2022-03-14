import React, { FC, useState, useEffect, useCallback } from 'react';
import { ReportActions, approvedObjectivesSelector, notApprovedObjectivesSelector } from '@pma/store';
import { Button, colors, CreateRule, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from 'components/IconButton';
import { FilterOption } from 'features/Shared';
import { PieChart } from 'components/PieChart';
import { View } from 'components/PieChart/PieChart';

import { Select } from 'components/Form';
import FilterModal from './components/FilterModal';
import InfoTable from './components/InfoTable';
import { DonwloadReportModal } from './Modals';
import { Trans, useTranslation } from 'components/Translation';
import { Rating, TitlesReport } from 'config/enum';
import AppliedFilters from './components/AppliedFilters';
import { getFieldOptions, listOfStatuses, metaStatuses } from './config';
import { downloadCsvFile } from './utils';
import { getCurrentYear } from 'utils/date';
import useStatisticsReport from './hooks';
import { useToast } from 'features/Toast';

export const REPORT_WRAPPER = 'REPORT_WRAPPER';

const Report: FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();

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
    colleaguesCount,
  } = useStatisticsReport([...metaStatuses]);

  const getReportData = useCallback((year = getCurrentYear()) => {
    dispatch(ReportActions.getObjectivesStatistics({ year }));
    dispatch(
      ReportActions.getObjectivesReport({
        year: year,
        statuses_in: [...listOfStatuses],
      }),
    );
  }, []);

  useEffect(() => {
    getReportData();
  }, []);

  const { css } = useStyle();

  const changeYearHandler = (value) => {
    if (!value) return;
    getReportData(value);
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
            <AppliedFilters
              clearAppliedFilters={clearAppliedFilters}
              getAppliedReport={getAppliedReport()}
              colleaguesCount={colleaguesCount}
            />
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
              title={t(TitlesReport.OBJECTIVES_SUBMITTED, 'Objectives submitted')}
              data={[{ percent: objectivesSubmittedPercentage }]}
              display={View.CHART}
            />
          </div>
          <div className={css(rightColumn)}>
            <PieChart
              title={t(TitlesReport.OBJECTIVES_APPROVED, 'Objectives approved')}
              data={[{ percent: objectivesApprovedPercentage }]}
              display={View.CHART}
            />
            <div className={css(downloadWrapperStyle)}>
              <Button
                styles={[buttonCoreStyled]}
                onPress={() => {
                  downloadCsvFile(t, addToast);
                }}
              >
                <Trans>WL4-5 report</Trans>
              </Button>
              <form>
                <h2 className={css(yearLabel)}>
                  <Trans i18nKey='view_previous_years'>View previous years</Trans>
                </h2>

                <Select
                  options={getFieldOptions(getCurrentYear())}
                  name={'year_options'}
                  placeholder={t('choose_an_area', 'Choose an area')}
                  //@ts-ignore
                  onChange={({ target: { value } }) => {
                    changeYearHandler(value);
                  }}
                />
              </form>
            </div>
          </div>
        </div>

        <div className={css(pieChartWrapper)}>
          <div className={css(leftColumn)}>
            <PieChart
              title={t(TitlesReport.MYR, 'Mid-year review')}
              display={View.CHART}
              data={[
                { percent: myrSubmittedPercentage, title: t(TitlesReport.SUBMITTED, 'Submitted') },
                { percent: myrApprovedPercentage, title: t(TitlesReport.APPROVED, 'Approved') },
              ]}
            />
          </div>
          <div className={css(rightColumn)}>
            <InfoTable
              mainTitle={t(TitlesReport.MYR_BREAKDOWN, 'Breakdown of Mid-year ratings')}
              data={[
                {
                  percent: myrRatingBreakdownBelowExpectedPercentage,
                  quantity: myrRatingBreakdownBelowExpectedCount,
                  title: t(Rating.BELOW_EXPECTED, 'Below expected'),
                },
                {
                  percent: myrRatingBreakdownSatisfactoryPercentage,
                  quantity: myrRatingBreakdownSatisfactoryCount,
                  title: t(Rating.SATISFACTORY, 'Satisfactory'),
                },
                {
                  percent: myrRatingBreakdownGreatPercentage,
                  quantity: myrRatingBreakdownGreatCount,
                  title: t(Rating.GREAT, 'Great'),
                },
                {
                  percent: myrRatingBreakdownOutstandingPercentage,
                  quantity: myrRatingBreakdownOutstandingCount,
                  title: t(Rating.OUTSTANDING, 'Outstanding'),
                },
              ]}
            />
          </div>
        </div>
        <div className={css(pieChartWrapper)}>
          <div className={css(leftColumn)}>
            <PieChart
              title={t(TitlesReport.EYR, 'Year-end review')}
              display={View.CHART}
              data={[
                { percent: eyrSubmittedPercentage, title: t(TitlesReport.SUBMITTED, 'Submitted') },
                { percent: eyrApprovedPercentage, title: t(TitlesReport.APPROVED, 'Approved') },
              ]}
            />
          </div>
          <div className={css(rightColumn)}>
            <InfoTable
              mainTitle={t(TitlesReport.EYR_BREAKDOWN, 'Breakdown of End-year ratings')}
              data={[
                {
                  percent: eyrRatingBreakdownBelowExpectedPercentage,
                  quantity: eyrRatingBreakdownBelowExpectedCount,
                  title: t(Rating.BELOW_EXPECTED, 'Below expected'),
                },
                {
                  percent: eyrRatingBreakdownSatisfactoryPercentage,
                  quantity: eyrRatingBreakdownSatisfactoryCount,
                  title: t(Rating.SATISFACTORY, 'Satisfactory'),
                },
                {
                  percent: eyrRatingBreakdownGreatPercentage,
                  quantity: eyrRatingBreakdownGreatCount,
                  title: t(Rating.GREAT, 'Great'),
                },
                {
                  percent: eyrRatingBreakdownOutstandingPercentage,
                  quantity: eyrRatingBreakdownOutstandingCount,
                  title: t(Rating.OUTSTANDING, 'Outstanding'),
                },
              ]}
            />
          </div>
        </div>
        <div className={css(pieChartWrapper)}>
          <div className={css(leftColumn)}>
            <PieChart
              title={t(TitlesReport.WL4And5, 'Wl4 & 5 Objectives submitted')}
              display={View.CHART}
              data={[
                { percent: approvedObjPercent, title: approvedObjTitle },
                { percent: notApprovedObjPercent, title: notApprovedObjTitle },
              ]}
            />
          </div>
          <div className={css(rightColumn)}>
            <PieChart
              title={t(TitlesReport.BUSINESS, 'New to business')}
              data={[{ percent: newToBusinessCount, title: t(Rating.COLLEAGUES, 'Colleagues') }]}
              display={View.QUANTITY}
            />
          </div>
        </div>
        <div className={css(pieChartWrapper)}>
          <div className={css(leftColumn)}>
            <PieChart
              title={t(TitlesReport.MOMENT_FEEDBACK, 'In the moment feedback')}
              display={View.CHART}
              data={[
                { percent: feedbackRequestedPercentage, title: t(TitlesReport.REQUESTED, 'Requested') },
                { percent: feedbackGivenPercentage, title: t(TitlesReport.GIVEN, 'Given') },
              ]}
            />
          </div>
          <div className={css(rightColumn)}>
            <InfoTable
              mainTitle={t(TitlesReport.ANNIVERSARY_REVIEWS, 'Anniversary Reviews completed per quarter')}
              preTitle={t(TitlesReport.HOURLY_PAID, 'Hourly paid colleagues only')}
              data={[
                {
                  percent: anniversaryReviewPerQuarter1Percentage,
                  quantity: anniversaryReviewPerQuarter1Count,
                  title: t(Rating.QUARTER_1, 'Quarter 1'),
                },
                {
                  percent: anniversaryReviewPerQuarter2Percentage,
                  quantity: anniversaryReviewPerQuarter2Count,
                  title: t(Rating.QUARTER_2, 'Quarter 2'),
                },
                {
                  percent: anniversaryReviewPerQuarter3Percentage,
                  quantity: anniversaryReviewPerQuarter3Count,
                  title: t(Rating.QUARTER_3, 'Quarter 3'),
                },
                {
                  percent: anniversaryReviewPerQuarter4Percentage,
                  quantity: anniversaryReviewPerQuarter4Count,
                  title: t(Rating.QUARTER_4, 'Quarter 4'),
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
  margin: '0px auto 20px auto',
});

const iconDownloadStyle: Rule = {
  width: '22px',
  height: '22px',
  position: 'relative',
  top: '2px',
  left: '2px',
};
const downloadWrapperStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
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
  marginTop: '8px',
};
const leftColumn: Rule = {
  display: 'flex',
  gap: '8px',
  flex: 4,
  flexBasis: '400px',
};
const rightColumn: Rule = {
  display: 'flex',
  gap: '8px',
  flexDirection: 'row',
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
