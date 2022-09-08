import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  ObjectiveSharingActions,
  SchemaActions,
  TimelineActions,
  timelinesExistSelector,
  timelinesMetaSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';

import ObjectiveAccordion from './components/ObjectivesSection';

export const TEST_ID = 'my-objectives-page';
const CURRENT = 'CURRENT';

const MyObjectives: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelinesExist = useSelector(timelinesExistSelector(colleagueUuid));
  const { loaded: timelinesLoaded } = useSelector(timelinesMetaSelector);

  useEffect(() => {
    colleagueUuid && dispatch(ObjectiveSharingActions.checkSharing({ colleagueUuid, cycleUuid: CURRENT }));
    colleagueUuid && dispatch(ObjectiveSharingActions.getSharings({ colleagueUuid, cycleUuid: CURRENT }));
  }, [colleagueUuid]);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }
  }, [colleagueUuid]);

  useEffect(() => {
    if (timelinesLoaded && !timelinesExist) {
      navigate(`/${Page.NOT_FOUND}`);
    }
  }, [timelinesLoaded, timelinesExist]);

  useEffect(() => {
    dispatch(SchemaActions.getSchema({ colleagueUuid }));

    // return () => {
    //   dispatch(SchemaActions.clearSchemaData());
    // };
  }, [colleagueUuid]);

  return (
    <div data-test-id={TEST_ID}>
      <ObjectiveAccordion />
    </div>
  );
};

export default MyObjectives;
