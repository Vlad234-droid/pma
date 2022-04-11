import React, { FC, useState, useCallback } from 'react';

import { getReportMetaSelector } from '@pma/store';
import { Button, colors, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from 'components/IconButton';
import { FilterOption } from 'features/Shared';
import { PieChart } from 'components/PieChart';
import { Select } from 'components/Form';
import FilterModal from './components/FilterModal';
import InfoTable from 'components/InfoTable';
import { DonwloadReportModal } from './Modals';
import { Trans, useTranslation } from 'components/Translation';
import AppliedFilters from './components/AppliedFilters';
import { getCurrentYear } from 'utils/date';
import { useToast } from 'features/Toast';
import { View } from 'components/PieChart/config';
import Spinner from 'components/Spinner';

import { getFieldOptions, metaStatuses, initialValues, convertToLink } from './config';
import { downloadCsvFile } from './utils';
import { useStatisticsReport, getReportData, getData } from './hooks';
import useQueryString from 'hooks/useQueryString';
import { ReportPage, TitlesReport } from 'config/enum';

import { Page } from 'pages';

export const REPORT_WRAPPER = 'REPORT_WRAPPER';

const Report: FC = () => {
  const query = useQueryString() as Record<string, string>;
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { css, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [showDownloadReportModal, setShowDownloadReportModal] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [year, setYear] = useState<string>('');
  const { loaded } = useSelector(getReportMetaSelector);

  const [filterData, setFilterData] = useState<any>(initialValues);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);
  const { colleaguesCount } = useStatisticsReport([...metaStatuses]);

  getReportData(query);

  const changeYearHandler = (value) => {
    if (!value) return;
    setYear(value);
    getData(dispatch, { year: value });
  };

  const getAppliedReport = () => [...new Set(checkedItems.map((item) => item.split('-')[0]))];

  const clearAppliedFilters = (filterTitle) => {
    if (isCheckAll.length) setIsCheckAll((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
    setCheckedItems((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
  };

  const quantity = getAppliedReport().length;

  const getYear = useCallback(
    () => ({
      year: !year && !query?.year ? getCurrentYear() : query?.year && year ? year : !query.year ? year : query.year,
    }),
    [query.year, year],
  );

  return (
    <div className={css({ margin: '22px 42px 30px 40px' })} data-test-id={REPORT_WRAPPER}>
      <div className={css(spaceBetween({ quantity, mobileScreen }))}>
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
      {!loaded ? (
        <Spinner />
      ) : (
        <>
          <div className={css(pieChartWrapper)}>
            <div className={css(leftColumn)}>
              <PieChart
                title={t(TitlesReport.OBJECTIVES_SUBMITTED, 'Objectives submitted')}
                data={ReportPage.REPORT_SUBMITTED_OBJECTIVES}
                display={View.CHART}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
                type={convertToLink(ReportPage.REPORT_SUBMITTED_OBJECTIVES)}
                hoverVisibility={!small}
                hoverMessage={t(
                  'percentage_of_objectives_submitted_by_colleagues',
                  'Percentage of objectives submitted by colleagues, prior to being reviewed and approved by their line manager.',
                )}
              />
            </div>
            <div className={css(rightColumn)}>
              <PieChart
                title={t(TitlesReport.OBJECTIVES_APPROVED, 'Objectives approved')}
                data={ReportPage.REPORT_APPROVED_OBJECTIVES}
                display={View.CHART}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
                type={convertToLink(ReportPage.REPORT_APPROVED_OBJECTIVES)}
                hoverMessage={t(
                  'percentage_of_objectives_approved_by_colleagues',
                  'Percentage of objectives submitted by colleagues that have been approved by their line managers.',
                )}
                hoverVisibility={!small}
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
                    value={year || query.year}
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
                data={ReportPage.REPORT_MID_YEAR_REVIEW}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
                type={convertToLink(ReportPage.REPORT_MID_YEAR_REVIEW)}
                hoverMessage={t(
                  'when_a_colleague_has_completed_their_mid_year_review',
                  'Submitted: When a colleague completes their mid-year review submission prior to approval by a line manager. Approval: After approval by a line manager.',
                )}
                hoverVisibility={!small}
              />
            </div>
            <div className={css(rightColumn)}>
              <InfoTable
                mainTitle={t(TitlesReport.MYR_BREAKDOWN, 'Breakdown of Mid-year review')}
                data={ReportPage.REPORT_MYR_BREAKDOWN}
                type={convertToLink(ReportPage.REPORT_MYR_BREAKDOWN)}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
              />
            </div>
          </div>
          <div className={css(pieChartWrapper)}>
            <div className={css(leftColumn)}>
              <PieChart
                title={t(TitlesReport.EYR, 'Year-end review')}
                display={View.CHART}
                data={ReportPage.REPORT_END_YEAR_REVIEW}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
                type={convertToLink(ReportPage.REPORT_END_YEAR_REVIEW)}
                hoverMessage={t(
                  'when_a_colleague_has_completed_their_year_end_review',
                  'Submitted: When a colleague has completed their year-end review submission prior to approval by a line manager. Approved: After approval by a line manager.',
                )}
                hoverVisibility={!small}
              />
            </div>
            <div className={css(rightColumn)}>
              <InfoTable
                mainTitle={t(TitlesReport.EYR_BREAKDOWN, 'Breakdown of End-year review')}
                data={ReportPage.REPORT_EYR_BREAKDOWN}
                type={convertToLink(ReportPage.REPORT_EYR_BREAKDOWN)}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
              />
            </div>
          </div>
          <div className={css(pieChartWrapper)}>
            <div className={css(leftColumn)}>
              <PieChart
                title={t(TitlesReport.WL4And5, 'WL4 & 5 Objectives submitted')}
                display={View.CHART}
                data={ReportPage.REPORT_WORK_LEVEL}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
                type={convertToLink(ReportPage.REPORT_WORK_LEVEL)}
                hoverVisibility={false}
              />
            </div>
            <div className={css(rightColumn)}>
              <PieChart
                title={t(TitlesReport.BUSINESS, 'New to business')}
                data={ReportPage.REPORT_NEW_TO_BUSINESS}
                display={View.QUANTITY}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
                type={convertToLink(ReportPage.REPORT_NEW_TO_BUSINESS)}
                hoverMessage={t(
                  'colleagues_who_have_joined_the_business',
                  'Colleagues who have joined the business in the last 90 days.',
                )}
                hoverVisibility={!small}
              />
            </div>
          </div>
          <div className={css(pieChartWrapper)}>
            <div className={css(leftColumn)}>
              <PieChart
                title={t(TitlesReport.MOMENT_FEEDBACK, 'In the moment feedback')}
                display={View.CHART}
                data={ReportPage.REPORT_FEEDBACK}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
                type={convertToLink(ReportPage.REPORT_FEEDBACK)}
                hoverMessage={t(
                  'percentage_of_colleagues_who_have_requested_or_given_feedback_this_year',
                  'Percentage of colleagues who have requested or given feedback this year.  ',
                )}
                hoverVisibility={!small}
              />
            </div>
            <div className={css(rightColumn)}>
              <InfoTable
                mainTitle={t(TitlesReport.ANNIVERSARY_REVIEWS, 'Anniversary Reviews completed per quarter')}
                preTitle={t(TitlesReport.HOURLY_PAID, 'Hourly paid colleagues only')}
                data={ReportPage.REPORT_ANNIVERSARY_REVIEWS}
                type={convertToLink(ReportPage.REPORT_ANNIVERSARY_REVIEWS)}
                link={Page.TILE_REPORT_STATISTICS}
                params={getYear()}
              />
            </div>
          </div>
        </>
      )}
      {showDownloadReportModal && (
        <DonwloadReportModal
          onClose={() => {
            setShowDownloadReportModal(false);
          }}
        />
      )}
    </div>
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
  border: `2px solid ${colors.tescoBlue}`,
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

const spaceBetween: CreateRule<{ quantity: number; mobileScreen: boolean }> = ({ quantity, mobileScreen }) => {
  return {
    display: 'flex',
    flexWrap: mobileScreen ? 'wrap' : 'nowrap',
    ...(mobileScreen && { flexBasis: '250px' }),
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
