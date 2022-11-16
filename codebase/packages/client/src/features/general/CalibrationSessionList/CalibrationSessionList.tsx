import React, { useEffect, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import useDispatch from 'hooks/useDispatch';

import { Filter } from './components/Filter';
import { SessionAccordion } from './components/SessionAccordion';
import { CreateCalibrationSession } from './widgets';
import { CalibrationSessionsAction, calibrationSessionsMetaSelector, getCalibrationSessionsSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { Trans } from 'components/Translation';
import Spinner from 'components/Spinner';

import { FilterStatus } from './utils/types';

const CalibrationSessionList = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.ACTIVE);
  const activeStatuses = [
    CalibrationSessionStatusEnum.Created,
    CalibrationSessionStatusEnum.Started,
    CalibrationSessionStatusEnum.Updated,
  ];
  const completedStatuses = [CalibrationSessionStatusEnum.Completed];

  const { loading: calibrationSessionLoading, loaded: calibrationSessionLoaded } = useSelector(
    calibrationSessionsMetaSelector,
  );
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];
  const calibrationSessionsByStatus = calibrationSessions.filter((calibrationSession) => {
    if (calibrationSession.status) {
      return filterStatus === FilterStatus.ACTIVE
        ? activeStatuses.includes(calibrationSession?.status)
        : completedStatuses.includes(calibrationSession.status);
    }
    return false;
  });

  useEffect(() => {
    dispatch(CalibrationSessionsAction.getCalibrationSessions({}));
  }, []);

  const handleDeleteCalibrationSession = (uuid: string | null) => {
    if (uuid) {
      dispatch(CalibrationSessionsAction.deleteCalibrationSession({ uuid }));
    }
  };

  if (!calibrationSessionLoaded) {
    return <Spinner fullHeight />;
  }

  return (
    <div>
      <Filter status={filterStatus} setStatus={setFilterStatus} />
      <div className={css(bodyStyle)}>
        <div className={css(leftColumnStyle)}>
          <div className={css(titleStyle)}>Calibration Sessions</div>
          {calibrationSessionLoading ? (
            <Spinner fullHeight />
          ) : (
            <>
              {calibrationSessionsByStatus?.length ? (
                calibrationSessionsByStatus.map((calibrationSession, index) => (
                  <SessionAccordion
                    key={calibrationSession.uuid}
                    isFirst={index === 0}
                    calibrationSession={calibrationSession}
                    onDeleteCalibrationSession={handleDeleteCalibrationSession}
                  />
                ))
              ) : (
                <div className={css(emptyBlockStyle)}>
                  <Trans i18nKey='no_calibration_session'>You do not have calibration sessions</Trans>
                </div>
              )}
            </>
          )}
        </div>
        <div className={css(rightColumnStyle)}>
          <CreateCalibrationSession />
        </div>
      </div>
    </div>
  );
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

const emptyBlockStyle: Rule = ({ theme }) => ({
  paddingBottom: '20px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

export default CalibrationSessionList;
