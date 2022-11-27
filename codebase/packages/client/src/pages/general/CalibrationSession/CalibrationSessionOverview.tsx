import React, { FC, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import CalibrationSessionOverview, {
  CalibrationsCompleted,
  RatingsChange,
  RatingsSubmitted,
  CreateCalibrationSession,
  CalibrationSessions,
  Widget,
} from 'features/general/CalibrationSession';
import { Filters, SortBy } from 'features/general/Filters';
import { useTranslation } from 'components/Translation';
import { Option, Select } from 'components/Form';

const CalibrationSessionPage: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const [period, setPeriod] = useState<string>('2021 - 2022');

  const fieldOptions: Option[] = [
    { value: '2021 - 2022', label: '2021 - 2022' },
    { value: '2022 - 2023', label: '2022 - 2023' },
  ];
  return (
    <div>
      <div>
        <div className={css(headStyle({ mobileScreen }))}>
          <div>
            <Select
              options={fieldOptions}
              name={'targetType'}
              placeholder={''}
              value={'2021 - 2022'}
              onChange={({ target: { value } }) => setPeriod(value)}
              customStyles={selectStyle}
            />
          </div>
          <div className={css(filtersStyle)}>
            <Filters
              sortValue={SortBy.AZ}
              onSort={console.log}
              searchValue={''}
              onSearch={console.log}
              sortingOptions={[]}
            />
          </div>
        </div>
        <div className={css(widgetContainerStyles)}>
          <Widget title={t('download_report', 'Download report')} graphics={'download'} onClick={console.log} />
          <CalibrationSessions />
          <CreateCalibrationSession />
          <RatingsSubmitted />
          <CalibrationsCompleted />
          <RatingsChange />
        </div>
      </div>
      <CalibrationSessionOverview />
    </div>
  );
};

const widgetContainerStyles: Rule = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '8px',
  marginBottom: '56px',
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

export default CalibrationSessionPage;
