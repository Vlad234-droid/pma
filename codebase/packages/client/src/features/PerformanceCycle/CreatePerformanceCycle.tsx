import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  ConfigEntriesActions,
  PerformanceCycleActions,
  performanceCycleByUuidSelector,
  performanceCycleFormsByUuidSelector,
  performanceCycleMetaSelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import PerformanceCycleForm from './components/PerformanceCycleForm';

const CreatePerformanceCycle: FC = () => {
  const dispatch = useDispatch();
  const { performanceCycleUuid } = useParams<{ performanceCycleUuid: string }>();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const cycle = useSelector(performanceCycleByUuidSelector(performanceCycleUuid as string));
  const cycleForms = useSelector(performanceCycleFormsByUuidSelector(performanceCycleUuid as string));
  const { loaded: performanceCycleLoaded } = useSelector(performanceCycleMetaSelector);

  const getConfigEntriesByUuid = (uuid: string) => dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid }));

  useEffect(() => {
    if (performanceCycleUuid !== 'new')
      dispatch(PerformanceCycleActions.getPerformanceCycleByUuid({ performanceCycleUuid, includeForms: true }));
  }, [performanceCycleUuid]);

  function buildData(data) {
    const { metadata, name, template, entryConfigKey } = data;
    const startTime = new Date(metadata.cycle.properties.pm_cycle_start_time);
    const endTime = new Date(metadata.cycle.properties.pm_cycle_end_time);
    return {
      uuid: performanceCycleUuid !== 'new' ? performanceCycleUuid : undefined,
      template,
      name,
      entryConfigKey,
      createdBy: {
        uuid: colleagueUuid,
      },
      properties: {
        mapJson: {},
      },
      type: 'FISCAL',
      metadata: {
        ...metadata,
        cycle: {
          ...metadata.cycle,
          properties: { ...metadata.cycle.properties, pm_cycle_start_time: startTime, pm_cycle_end_time: endTime },
        },
      },
      startTime,
      endTime,
    };
  }

  const handleSaveDraft = (data) => {
    if (performanceCycleUuid === 'new') {
      dispatch(PerformanceCycleActions.createPerformanceCycle({ ...data, status: 'DRAFT' }));
      return;
    }
    dispatch(PerformanceCycleActions.updatePerformanceCycle({ ...data, status: 'DRAFT' }));
  };

  const handlePublish = (data) => {
    if (performanceCycleUuid === 'new') {
      dispatch(
        PerformanceCycleActions.createPerformanceCycle({
          ...data,
          status: 'REGISTERED',
          uuid: performanceCycleUuid === 'new' ? undefined : performanceCycleUuid,
        }),
      );
    } else {
      dispatch(
        PerformanceCycleActions.updatePerformanceCycle({
          ...data,
          status: 'REGISTERED',
          uuid: performanceCycleUuid === 'new' ? undefined : performanceCycleUuid,
        }),
      );
    }
  };

  const handleSubmit = ({ mode, ...data }) => {
    if (mode === 'PUBLISH') {
      handlePublish(buildData(data));
      return;
    }
    handleSaveDraft(buildData(data));
  };

  const defaultValues = useMemo(() => {
    if (performanceCycleUuid === 'new' || !cycle) {
      return {};
    }

    return {
      name: cycle?.name,
      metadata: cycle?.metadata,
      entryConfigKey: cycle?.entryConfigKey,
    };
  }, [performanceCycleUuid, cycle]);

  if (
    performanceCycleUuid !== 'new' &&
    (!performanceCycleLoaded || Object.values(defaultValues).some((value) => !value))
  )
    return null;

  return (
    <PerformanceCycleForm
      onSubmit={handleSubmit}
      getConfigEntriesByUuid={getConfigEntriesByUuid}
      defaultValues={defaultValues}
      forms={cycleForms || []}
    />
  );
};

export default CreatePerformanceCycle;
