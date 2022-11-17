import React, { FC, useRef } from 'react';

import { CalibrationSession as CalibrationSessionDetails } from 'features/general/CalibrationSession';
import { StartCalibrationSession, EditCalibrationSession, Widget } from 'features/general/CalibrationSession/widgets';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { Filters, SortBy } from 'features/general/Filters';

const CalibrationSessionPage: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const { t } = useTranslation();
  const bottomPanelRef = useRef<HTMLDivElement>();

  return (
    <div>
      <div className={css(contentBlockStyle({ height: bottomPanelRef?.current?.clientHeight }))}>
        <div>
          <div className={css(headStyle)}>
            <div></div>
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
          <div className={css(widgetContainerStyles({ mobileScreen }))}>
            <StartCalibrationSession />
            <EditCalibrationSession />
            <Widget
              graphics={'download'}
              title={t('download_report', 'Download report')}
              onClick={console.log}
              isDisabled={true}
            />
          </div>
        </div>
        <CalibrationSessionDetails />
      </div>
    </div>
  );
};

const widgetContainerStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  flexDirection: mobileScreen ? 'column' : 'row',
  gap: '8px',
  marginBottom: '56px',
});
const contentBlockStyle: CreateRule<{ height: number | undefined }> = ({ height }) => {
  if (height) {
    return { paddingBottom: `${height}px` };
  }

  return {};
};

const headStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
};

const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};

export default CalibrationSessionPage;
