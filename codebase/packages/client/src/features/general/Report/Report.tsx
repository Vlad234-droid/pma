import React, { FC, useCallback, useState, useMemo } from 'react';
import { colors, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { colleaguesCountSelector, getReportMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';

import { buildPath, buildPathWithParams } from 'features/general/Routes';
import { CanPerform, role } from 'features/general/Permission';
import { FilterOption } from 'features/general/Shared';
import InfoTable from 'components/InfoTable';
import { HoverMessage } from 'components/HoverMessage';
import { IconButton } from 'components/IconButton';
import Spinner from 'components/Spinner';
import { PieChart } from 'components/PieChart';
import { Select } from 'components/Form';
import { Trans, useTranslation } from 'components/Translation';
import { ColleaguesCount } from 'components/ColleaguesCount';
import { HoverContainer } from 'components/HoverContainer';

import ChartWidget from './widgets/ChartWidget';
import TableWidget from './widgets/TableWidget';
import FilterModal from './components/FilterModal';
import { ReportModal } from './Modals';
import { paramsReplacer } from 'utils';
import useQueryString from 'hooks/useQueryString';
import { getReportData } from './hooks';
import { convertToLink, getCurrentValue, getFieldOptions, initialValues, IsReportTiles, View } from './config';
import { ReportPage, TitlesReport } from 'config/enum';
import { isStartPeriod, getCurrentYearWithStartDate } from './utils';
import { Page } from 'pages';
import { getCurrentYear, getNextYear, getPrevYear } from 'utils/date';

export enum ModalStatus {
  DOWNLOAD = 'DOWNLOAD',
  EDIT = 'EDIT',
}

export const REPORT_WRAPPER = 'REPORT_WRAPPER';

const Report: FC = () => {
  const query = useQueryString() as Record<string, string | number>;
  const { t } = useTranslation();
  const { css, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const [focus, setFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<null | ModalStatus>(null);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [year, setYear] = useState<string>('');
  const [tiles, setTiles] = useState<Array<string>>([]);

  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);
  const { loaded } = useSelector(getReportMetaSelector);

  getReportData(query, year);

  const colleaguesCount = useSelector(colleaguesCountSelector) || 0;

  const changeYearHandler = (value) => {
    if (!value) return;
    setYear(value);
  };

  //TODO: attach this with Marius
  // const getAppliedReport = () => [...new Set(checkedItems.map((item) => item.split('-')[0]))];
  // const clearAppliedFilters = (filterTitle) => {
  //   if (isCheckAll.length) setIsCheckAll((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
  //   setCheckedItems((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
  // };
  // const quantity = getAppliedReport().length;

  const getYear = useMemo(
    () => ({
      year:
        !year && !query?.year
          ? getCurrentYearWithStartDate()
          : query?.year && year
          ? year
          : !query.year
          ? year
          : query.year,
    }),
    [query.year, year],
  );

  const isDisplayTile = useCallback(
    (name) => {
      if (!tiles.length) return true;
      return !!(tiles.length && tiles.includes(name));
    },
    [tiles],
  );

  return (
    <div className={css({ margin: '22px 42px 110px 40px' })} data-test-id={REPORT_WRAPPER}>
      <div className={css(spaceBetween({ mobileScreen }))}>
        {/*//Todo in future move active filters to another place */}
        {/*{!!getAppliedReport().length && (*/}
        {/*  <AppliedFilters*/}
        {/*    clearAppliedFilters={clearAppliedFilters}*/}
        {/*    getAppliedReport={getAppliedReport()}*/}
        {/*    colleaguesCount={colleaguesCount}*/}
        {/*  />*/}
        {/*)}*/}
        <div className={css(downloadWrapperStyle)}>
          <form>
            <h2 className={css(yearLabel)}>
              <Trans i18nKey='select_financial_year'>Select financial year</Trans>
            </h2>

            <Select
              options={[
                {
                  value: getCurrentYearWithStartDate(),
                  label: isStartPeriod()
                    ? `${getCurrentYear()}-${getNextYear(1)}`
                    : `${getPrevYear(1)}-${getCurrentYear()}`,
                },
                ...getFieldOptions(),
              ]}
              name={'year_options'}
              placeholder={t('choose_an_area', 'Choose an area')}
              onChange={({ target: { value } }) => {
                changeYearHandler(value);
              }}
              value={getCurrentValue(query, year)}
            />
          </form>
          <ColleaguesCount count={colleaguesCount} countStyles={countStyles} />
        </div>

        <div className={css(flexCenterStyled)}>
          <HoverContainer
            isActive={!small}
            message={
              <HoverMessage
                text={t(
                  'this_report_will_show_you_high_level_information',
                  'This report will show you high level information for your population regarding their performance cycle. Please filter and edit the page to show the most relevant information for your population',
                )}
                customStyles={hoverContainer}
              />
            }
          >
            <IconButton graphic='information' iconStyles={iconStyle} />
          </HoverContainer>

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
            isDisabledSearch={false}
            isVisibleEdit={true}
            onEditPress={() => {
              setModalStatus(ModalStatus.EDIT);
              setShowModal(true);
            }}
          />
          <FilterModal
            initialValues={initialValues}
            filterModal={filterModal}
            setFilterModal={setFilterModal}
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
              setModalStatus(ModalStatus.DOWNLOAD);
              setShowModal(true);
            }}
          />
        </div>
      </div>
      {!loaded ? (
        <Spinner />
      ) : (
        <>
          <div className={css(pieChartWrapper)}>
            {isDisplayTile(IsReportTiles.OBJECTIVES_SUBMITTED) && (
              <div className={css(leftColumn)}>
                <HoverContainer
                  isActive={!small}
                  customStyles={{ width: '100%' }}
                  message={
                    <HoverMessage
                      text={t(
                        'percentage_of_objectives_submitted_by_colleagues',
                        'Percentage of objectives submitted by colleagues, prior to being reviewed and approved by their line manager.',
                      )}
                      customStyles={reportHoverMessage}
                    />
                  }
                >
                  <ChartWidget
                    configKey={ReportPage.REPORT_SUBMITTED_OBJECTIVES}
                    link={buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPage.REPORT_SUBMITTED_OBJECTIVES),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    )}
                  >
                    {({ data }) => (
                      <PieChart
                        title={t(TitlesReport.OBJECTIVES_SUBMITTED, 'Objectives submitted')}
                        data={data}
                        display={View.CHART}
                      />
                    )}
                  </ChartWidget>
                </HoverContainer>
              </div>
            )}
            {isDisplayTile(IsReportTiles.OBJECTIVES_APPROVED) && (
              <div className={css(rightColumn)}>
                <HoverContainer
                  customStyles={{ width: '100%' }}
                  message={
                    <HoverMessage
                      text={t(
                        'percentage_of_objectives_approved_by_colleagues',
                        'Percentage of objectives submitted by colleagues that have been approved by their line managers.',
                      )}
                      customStyles={reportHoverMessage}
                    />
                  }
                  isActive={!small}
                >
                  <ChartWidget
                    configKey={ReportPage.REPORT_APPROVED_OBJECTIVES}
                    link={buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPage.REPORT_APPROVED_OBJECTIVES),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    )}
                  >
                    {({ data }) => (
                      <PieChart
                        title={t(TitlesReport.OBJECTIVES_APPROVED, 'Objectives approved')}
                        data={data}
                        display={View.CHART}
                      />
                    )}
                  </ChartWidget>
                </HoverContainer>
              </div>
            )}
          </div>

          <div className={css(pieChartWrapper)}>
            {isDisplayTile(IsReportTiles.MID_YEAR_FORMS) && (
              <div className={css(leftColumn)}>
                <HoverContainer
                  customStyles={{ width: '100%' }}
                  message={
                    <HoverMessage
                      text={t(
                        'when_a_colleague_has_completed_their_mid_year_review',
                        'Submitted: When a colleague completes their mid-year review submission prior to approval by a line manager. Approval: After approval by a line manager.',
                      )}
                      customStyles={reportHoverMessage}
                    />
                  }
                  isActive={!small}
                >
                  <ChartWidget
                    configKey={ReportPage.REPORT_MID_YEAR_REVIEW}
                    link={buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPage.REPORT_MID_YEAR_REVIEW),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    )}
                  >
                    {({ data }) => (
                      <PieChart title={t(TitlesReport.MYR, 'Mid-year review')} data={data} display={View.CHART} />
                    )}
                  </ChartWidget>
                </HoverContainer>
              </div>
            )}
            {isDisplayTile(IsReportTiles.BREAKDOWN_MID_YEAR_REVIEW) && (
              <div className={css(rightColumn)}>
                <TableWidget
                  configKey={ReportPage.REPORT_MYR_BREAKDOWN}
                  link={buildPathWithParams(
                    buildPath(
                      paramsReplacer(Page.REPORT_STATISTICS, {
                        ':type': convertToLink(ReportPage.REPORT_MYR_BREAKDOWN),
                      }),
                    ),
                    {
                      ...getYear,
                    },
                  )}
                >
                  {({ data }) => (
                    <InfoTable mainTitle={t(TitlesReport.MYR_BREAKDOWN, 'Breakdown of Mid-year review')} data={data} />
                  )}
                </TableWidget>
              </div>
            )}
          </div>
          <div className={css(pieChartWrapper)}>
            {isDisplayTile(IsReportTiles.YEAR_END_FORMS) && (
              <div className={css(leftColumn)}>
                <HoverContainer
                  customStyles={{ width: '100%' }}
                  message={
                    <HoverMessage
                      customStyles={reportHoverMessage}
                      text={t(
                        'when_a_colleague_has_completed_their_year_end_review',
                        'Submitted: When a colleague has completed their year-end review submission prior to approval by a line manager. Approved: After approval by a line manager.',
                      )}
                    />
                  }
                  isActive={!small}
                >
                  <ChartWidget
                    configKey={ReportPage.REPORT_END_YEAR_REVIEW}
                    link={buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPage.REPORT_END_YEAR_REVIEW),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    )}
                  >
                    {({ data }) => (
                      <PieChart title={t(TitlesReport.EYR, 'Year-end review')} data={data} display={View.CHART} />
                    )}
                  </ChartWidget>
                </HoverContainer>
              </div>
            )}
            {isDisplayTile(IsReportTiles.BREAKDOWN_YEAR_END_REVIEW) && (
              <div className={css(rightColumn)}>
                <TableWidget
                  configKey={ReportPage.REPORT_EYR_BREAKDOWN}
                  link={buildPathWithParams(
                    buildPath(
                      paramsReplacer(Page.REPORT_STATISTICS, {
                        ':type': convertToLink(ReportPage.REPORT_EYR_BREAKDOWN),
                      }),
                    ),
                    {
                      ...getYear,
                    },
                  )}
                >
                  {({ data }) => (
                    <InfoTable mainTitle={t(TitlesReport.EYR_BREAKDOWN, 'Breakdown of End-year review')} data={data} />
                  )}
                </TableWidget>
              </div>
            )}
          </div>
          <div className={css(pieChartWrapper)}>
            {isDisplayTile(IsReportTiles.WL4And5) && (
              <CanPerform
                perform={[role.TALENT_ADMIN]}
                yes={() => (
                  <div className={css(leftColumn)}>
                    <ChartWidget
                      configKey={ReportPage.REPORT_WORK_LEVEL}
                      link={buildPathWithParams(
                        buildPath(
                          paramsReplacer(Page.REPORT_STATISTICS, {
                            ':type': convertToLink(ReportPage.REPORT_WORK_LEVEL),
                          }),
                        ),
                        {
                          ...getYear,
                        },
                      )}
                    >
                      {({ data }) => (
                        <PieChart
                          title={t(TitlesReport.WL4And5, 'WL4 & 5 Objectives submitted')}
                          data={data}
                          display={View.CHART}
                        />
                      )}
                    </ChartWidget>
                  </div>
                )}
              />
            )}

            {isDisplayTile(IsReportTiles.NEW_TO_BUSINESS) && (
              <div className={css(rightColumn)}>
                <HoverContainer
                  customStyles={{ width: '100%' }}
                  message={
                    <HoverMessage
                      text={t(
                        'colleagues_who_have_joined_the_business',
                        'Colleagues who have joined the business in the last 90 days.',
                      )}
                      customStyles={reportHoverMessage}
                    />
                  }
                  isActive={!small}
                >
                  <ChartWidget
                    configKey={ReportPage.REPORT_NEW_TO_BUSINESS}
                    link={buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPage.REPORT_NEW_TO_BUSINESS),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    )}
                  >
                    {({ data }) => (
                      <PieChart
                        title={t(TitlesReport.BUSINESS, 'New to business')}
                        data={data}
                        display={View.QUANTITY}
                      />
                    )}
                  </ChartWidget>
                </HoverContainer>
              </div>
            )}
          </div>
          <div className={css(pieChartWrapper)}>
            {isDisplayTile(IsReportTiles.MOMENT_FEEDBACK) && (
              <div className={css(leftColumn)}>
                <HoverContainer
                  customStyles={{ width: '100%' }}
                  message={
                    <HoverMessage
                      text={t(
                        'percentage_of_colleagues_who_have_requested_or_given_feedback_this_year',
                        'Percentage of colleagues who have requested or given feedback this year.',
                      )}
                      customStyles={reportHoverMessage}
                    />
                  }
                  isActive={!small}
                >
                  <ChartWidget
                    configKey={ReportPage.REPORT_FEEDBACK}
                    link={buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPage.REPORT_FEEDBACK),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    )}
                  >
                    {({ data }) => (
                      <PieChart
                        title={t(TitlesReport.MOMENT_FEEDBACK, 'In the moment feedback')}
                        data={data}
                        display={View.CHART}
                      />
                    )}
                  </ChartWidget>
                </HoverContainer>
              </div>
            )}
            {isDisplayTile(IsReportTiles.ANNIVERSARY_REVIEWS) && (
              <div className={css(rightColumn)}>
                <HoverContainer
                  customStyles={{ width: '100%' }}
                  message={
                    <HoverMessage
                      text={t(
                        'the_number_of_annual_reviews_a_line_manager_has_undertaken',
                        'The number of annual reviews a line manager has undertaken per quarter based on the number of direct reports they have. This is just indicative assuming a line manager will space reviews out equally during the year.',
                      )}
                      customStyles={reportHoverMessage}
                    />
                  }
                  isActive={!small}
                >
                  <TableWidget
                    configKey={ReportPage.REPORT_ANNIVERSARY_REVIEWS}
                    link={buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPage.REPORT_ANNIVERSARY_REVIEWS),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    )}
                  >
                    {({ data }) => (
                      <InfoTable
                        mainTitle={t(TitlesReport.ANNIVERSARY_REVIEWS, 'Anniversary Reviews completed per quarter')}
                        preTitle={t(TitlesReport.HOURLY_PAID, 'Hourly paid colleagues only')}
                        data={data}
                      />
                    )}
                  </TableWidget>
                </HoverContainer>
              </div>
            )}
          </div>
        </>
      )}
      {showModal && (
        <ReportModal
          tiles={tiles}
          modalStatus={modalStatus}
          onClose={(selectedCheckboxes = []) => {
            if (modalStatus === ModalStatus.EDIT && selectedCheckboxes.length) {
              setTiles(selectedCheckboxes.map((item) => item.label));
            }
            setModalStatus(null);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

const iconDownloadStyle: Rule = () => ({
  height: '22px',
  position: 'relative',
});

const countStyles: Rule = ({ theme }) => ({
  position: 'absolute',
  bottom: '-30px',
  left: 0,
  fontWeight: theme.font.weight.regular,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.base,
});
const downloadWrapperStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  marginBottom: '29px',
  position: 'relative',
} as Styles;

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

const pieChartWrapper: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flexWrap: 'wrap',
  marginTop: theme.spacing.s2,
});
const leftColumn: Rule = ({ theme }) => {
  return {
    display: 'flex',
    gap: theme.spacing.s2,
    flex: 4,
    flexBasis: '400px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f12.lineHeight,
  };
};
const rightColumn: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flexDirection: 'row',
  flex: 6,
  flexBasis: '550px',
});

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'space-between',
  height: '116px',
};

const spaceBetween: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    display: 'flex',
    flexWrap: mobileScreen ? 'wrap' : 'nowrap',
    ...(mobileScreen && { flexBasis: '250px' }),
    // Todo replace it in future due to applied filters
    // justifyContent: quantity ? 'space-between' : 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
};

const iconStyle: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
  marginTop: '5px',
});

const yearLabel: Rule = ({ theme }) => ({
  margin: `${theme.spacing.s0} ${theme.spacing.s0} 8px ${theme.spacing.s0}`,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.link,
});

const hoverContainer: Rule = () => ({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-95%, 100%)',
});

const reportHoverMessage: Rule = ({ theme }) => ({
  zIndex: '2',
  background: theme.colors.link,
  padding: theme.spacing.s4,
  width: '294px',
  maxWidth: '294px',
  color: theme.colors.white,
  borderRadius: theme.spacing.s2_5,
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-50%, 100%)',
});

export default Report;
