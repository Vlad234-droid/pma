import React, { FC, useState } from 'react';

import { CreateRule, Rule, useStyle, Styles } from '@pma/dex-wrapper';

import { default as CalibrationSessionList } from 'features/general/CalibrationSessionList';
import { CreateCalibrationSession } from 'features/general/CalibrationSessionList/widgets';
import { FilterStatus } from 'features/general/CalibrationSessionList/utils/types';
import { Option, RadioGroup } from 'components/Form';
import { Filters, getEmployeesSortingOptions, useSearch, useSorting } from 'features/general/Filters';
import { useTranslation } from 'components/Translation';

const CalibrationSessionPage: FC = () => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.ACTIVE);
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const options = getEmployeesSortingOptions(t);
  const [sortValue, setSortValue] = useSorting();
  const [searchValue, setSearchValue] = useSearch();

  const fieldOptions: Option[] = [
    { value: FilterStatus.ACTIVE, label: 'Active' },
    { value: FilterStatus.COMPLETED, label: 'Completed' },
  ];

  return (
    <div>
      <div className={css(headStyle({ mobileScreen }))}>
        <div className={css(radioGroupStyle)}>
          <RadioGroup
            options={fieldOptions}
            name={'targetStatus'}
            placeholder={''}
            value={filterStatus}
            onChange={({ target: { value } }) => setFilterStatus(value)}
            customStyles={selectStyle}
          />
        </div>
        <div className={css(filtersStyle)}>
          <Filters
            infoIcon={false}
            sortValue={sortValue}
            onSort={setSortValue}
            searchValue={searchValue}
            onSearch={setSearchValue}
            sortingOptions={options}
          />
        </div>
      </div>
      <div className={css(bodyStyle)}>
        <div className={css(leftColumnStyle)}>
          <div className={css(titleStyle)}>Calibration Sessions</div>
          <CalibrationSessionList filterStatus={filterStatus} searchValue={searchValue} sortValue={sortValue} />
        </div>
        <div className={css(rightColumnStyle)}>
          <CreateCalibrationSession />
        </div>
      </div>
    </div>
  );
};

const headStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
  ...(mobileScreen && {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  }),
});

const selectStyle: Rule = { minWidth: '350px' };
const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const bodyStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gridGap: '8px',
  marginTop: '34px',
  alignItems: 'stretch',
};

const leftColumnStyle: Rule = { flex: '3 1 375px', display: 'flex', flexDirection: 'column' };

const rightColumnStyle: Rule = { flex: '1 0 216px' };

const titleStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  letterSpacing: '0px',
});

const radioGroupStyle: Rule = {
  '& > label': {
    paddingRight: '32px',
    alignItems: 'center',
  },
} as Styles;

export default CalibrationSessionPage;
