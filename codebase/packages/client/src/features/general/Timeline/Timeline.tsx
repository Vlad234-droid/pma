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
  uuidCompareSelector,
} from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { TileWrapper as Tile } from 'components/Tile/TileWrapper';
import StepIndicator from 'components/StepIndicator/StepIndicator';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import useDispatch from 'hooks/useDispatch';
import { Select } from 'components/Form';
import { formatDateStringFromISO } from 'utils';

const Timeline: FC<{ colleagueUuid: string }> = ({ colleagueUuid }) => {
  const [value, setValue] = useState<string | undefined>();
  const { t } = useTranslation();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const isUserView = useSelector(uuidCompareSelector(colleagueUuid));
  const { loading } = useSelector(timelinesMetaSelector);
  const cycles = useSelector(colleaguePerformanceCyclesSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const { descriptions, startDates, summaryStatuses, types, currentStep } =
    useSelector(getTimelineSelector(colleagueUuid, currentCycle)) || {};

  const options = useMemo(() => {
    return cycles.map(({ endTime, startTime, uuid }) => ({
      value: uuid,
      label: `${formatDateStringFromISO(startTime, 'yyyy')} - ${formatDateStringFromISO(endTime, 'yyyy')}`,
    }));
  }, [cycles]);

  useEffect(() => {
    dispatch(TimelineActions.getTimeline({ colleagueUuid, cycleUuid: currentCycle }));
  }, [currentCycle]);

  useEffect(() => {
    if (currentCycle !== 'CURRENT') {
      setValue(currentCycle);
    } else {
      setValue(options[0]?.value);
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
              {isUserView && (
                <div className={css(selectStyle)}>
                  <Select options={options} onChange={handleChange} name={'period'} placeholder={''} value={value} />
                </div>
              )}
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
