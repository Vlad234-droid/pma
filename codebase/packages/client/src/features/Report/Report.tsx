import React, { FC, useState } from 'react';
import { useStyle, useBreakpoints, Rule, colors, Styles, CreateRule } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import { FilterOption } from 'features/Shared';
import { PieChart } from 'components/PieChart';
import { View } from 'components/PieChart/PieChart';
import { GenericItemField } from 'components/GenericForm';
import { Item, Select } from 'components/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createYearSchema } from './config';
import { InfoTable, FilterModal } from './components';
import { DonwloadReportModal } from './Modals';
import { Rating } from 'config/enum';

const Report: FC = () => {
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

  const { css } = useStyle();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createYearSchema),
  });
  const field_options = [
    { value: 'id_1', label: '2222' },
    { value: 'id_2', label: '2022' },
    { value: 'id_3', label: '2021' },
    { value: 'id_4', label: '2020' },
  ];

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
      <div className={css({ margin: '22px 42px 0px 40px' })}>
        <div className={css(spaceBeetweenStyled({ quantity }))}>
          {!!getAppliedReport().length && (
            <div className={css({ height: '92px' })}>
              <div className={css(appliedWrapperFilters)}>
                <span>Filtered applied:</span>
                <div className={css(flexStyle)}>
                  {getAppliedReport().map((item) => (
                    <div key={item} className={css(filterAppliedStyle)}>
                      <span className={css(filteredTitle)}>{item}</span>
                      <IconButton
                        graphic='decline'
                        iconStyles={iconDeclineStyle}
                        onPress={() => {
                          clearAppliedFilters(item);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <span className={css(countStyle)}>Colleagues: 43</span>
            </div>
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
            <PieChart title='Objectives submitted' data={[{ percent: 67 }]} display={View.CHART} />
            <PieChart
              title='Mid-year forms due Mar 2022'
              display={View.CHART}
              data={[
                { percent: 82, title: 'Submitted' },
                { percent: 82, title: 'Approved' },
              ]}
            />
            <PieChart
              title='End-year forms due Sep 2022'
              display={View.CHART}
              data={[
                { percent: 82, title: 'Submitted' },
                { percent: 82, title: 'Approved' },
              ]}
            />
            <PieChart
              title='In the moment feedback'
              display={View.CHART}
              data={[
                { percent: 38, title: 'Requested' },
                { percent: 12, title: 'Given' },
              ]}
            />
            <PieChart
              title='Colleagues absences'
              display={View.QUANTITY}
              data={[
                { percent: 38, title: 'Parental leave' },
                { percent: 12, title: 'Long-term absence' },
              ]}
            />
          </div>

          <div className={css(rightColumn)}>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <div className={css({ flex: '1' })}>
                <PieChart title='Objectives approved' data={[{ percent: 67 }]} display={View.CHART} />
              </div>
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
            <InfoTable
              mainTitle='Breakdown of Mid-year ratings'
              data={[
                { percent: 4, quantity: 4, title: Rating.BELOW_EXPECTED },
                { percent: 48, quantity: 54, title: Rating.SATISFACTORY },
                { percent: 35, quantity: 39, title: Rating.GREAT },
                { percent: 13, quantity: 15, title: Rating.OUTSTANDING },
              ]}
            />
            <InfoTable
              mainTitle='Breakdown of Mid-year ratings'
              data={[
                { percent: 4, quantity: 4, title: Rating.BELOW_EXPECTED },
                { percent: 48, quantity: 54, title: Rating.SATISFACTORY },
                { percent: 35, quantity: 39, title: Rating.GREAT },
                { percent: 13, quantity: 15, title: Rating.OUTSTANDING },
              ]}
            />
            <PieChart
              title='Supporting your Performance'
              data={[
                { percent: 4, title: 'Colleagues' },
                { percent: 6, title: 'Colleagues' },
              ]}
              display={View.QUANTITY}
            />
            <InfoTable
              mainTitle='Anniversary Reviews completed per quarter'
              preTitle='Hourly paid colleagues only'
              data={[
                { percent: 4, quantity: 4, title: Rating.BELOW_EXPECTED },
                { percent: 48, quantity: 54, title: Rating.SATISFACTORY },
                { percent: 35, quantity: 39, title: Rating.GREAT },
                { percent: 13, quantity: 15, title: Rating.OUTSTANDING },
              ]}
            />
          </div>
        </div>
      </div>
      {showDownloadReportModal && <DonwloadReportModal onClose={handleCloseModal} />}
    </>
  );
};

const appliedWrapperFilters: Rule = ({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '22px',
      color: theme.colors.base,
    },
  } as Styles;
};
const countStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.colors.base,
    marginTop: '13px',
    display: 'inline-block',
  };
};

const flexStyle: Rule = {
  display: 'flex',
  gap: '10px',
  marginLeft: '12px',
};

const filteredTitle: Rule = ({ theme }) => {
  return {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.colors.base,
  };
};

const filterAppliedStyle: Rule = ({ theme }) => {
  return {
    border: `1px solid ${theme.colors.link}`,
    borderRadius: '10px',
    padding: '6px 12px',
  };
};

const iconDeclineStyle: Rule = {
  width: '15px',
  height: '15px',
  marginLeft: '10px',
  cursor: 'pointer',
};

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

const spaceBeetweenStyled: CreateRule<{ quantity: number }> = ({ quantity }) => {
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
