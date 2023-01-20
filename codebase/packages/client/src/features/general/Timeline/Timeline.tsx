import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueCurrentCycleSelector,
  colleaguePerformanceCyclesSelector,
  getTimelineSelector,
  ReviewsActions,
  TimelineActions,
  timelinesMetaSelector,
  UserActions,
} from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { TileWrapper as Tile } from 'components/Tile/TileWrapper';
import StepIndicator from 'components/StepIndicator/StepIndicator';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import useDispatch from 'hooks/useDispatch';
import { Option, Select } from 'components/Form';
import { formatDateStringFromISO, MONTH_FORMAT } from 'utils';
import { Status } from 'config/enum';

const Timeline: FC<{ colleagueUuid: string }> = ({ colleagueUuid }) => {
  const [value, setValue] = useState<string | undefined>();
  const { t } = useTranslation();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const { loading } = useSelector(timelinesMetaSelector);
  const cycles = useSelector(colleaguePerformanceCyclesSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const { descriptions, startDates, summaryStatuses, types, currentStep } =
    useSelector(getTimelineSelector(colleagueUuid, currentCycle)) || {};

  const options: Option[] = useMemo(() => {
    return cycles.map(({ endTime, startTime, uuid }) => ({
      value: uuid,
      label: `${formatDateStringFromISO(startTime, MONTH_FORMAT)} - ${formatDateStringFromISO(endTime, MONTH_FORMAT)}`,
    }));
  }, [cycles]);

  useEffect(() => {
    dispatch(TimelineActions.getTimeline({ colleagueUuid, cycleUuid: currentCycle }));
  }, [currentCycle]);

  useEffect(() => {
    if (currentCycle !== 'CURRENT') {
      setValue(currentCycle);
    } else {
      const startedCycles = cycles.find(({ status }) => status === Status.STARTED);
      setValue(options.find(({ value }) => value === startedCycles.uuid)?.value as string);
    }
  }, [options]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    dispatch(ReviewsActions.clearReviewData());
    dispatch(UserActions.changeCurrentCycles(value));
  };

  useEffect(() => {
    if (value) dispatch(UserActions.getColleagueCycles({ colleagueUuid, cycleUuid: value }));
  }, [value]);

  return (
    <div className={css(timelineWrapperStyles)}>
      <div>
        <Tile>
          <div className={css(wrapperStyle)}>
            <div className={css(headerStyle)}>
              <h2 className={css(titleStyle)}>{t('performance_timeline_title', 'Your Contribution timeline')}</h2>
              <div className={css(selectStyle)}>
                <Select options={options} onChange={handleChange} name={'period'} placeholder={''} value={value} />
              </div>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <StepIndicator
                activeStep={currentStep}
                titles={descriptions}
                descriptions={startDates}
                statuses={summaryStatuses}
                types={types}
              />
            )}
          </div>
        </Tile>
      </div>
    </div>
  );
};

export default Timeline;

const headerStyle: Rule = {
  display: 'flex',
  gap: '15px',
  justifyContent: 'space-between',
};

const titleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  marginBottom: '30px',
});

const wrapperStyle = {
  padding: '20px',
};

const selectStyle: Rule = {
  zIndex: 9,
};

const timelineWrapperStyles: Rule = {
  flex: '3 1 70%',
  display: 'flex',
  flexDirection: 'column',
};
