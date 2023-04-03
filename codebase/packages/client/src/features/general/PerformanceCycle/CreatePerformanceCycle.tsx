import React, { FC, useEffect, useMemo } from 'react';
import {
  colleagueUUIDSelector,
  ConfigEntriesActions,
  PerformanceCycleActions,
  performanceCycleByUuidSelector,
  performanceCycleFormsByUuidSelector,
  performanceCycleMetaSelector,
  Status,
} from '@pma/store';

import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { buildPath } from 'features/general/Routes';
import { useToast, Variant } from 'features/general/Toast';
import PerformanceCycleForm from './components/PerformanceCycleForm';
import Spinner from 'components/Spinner';
import { CycleType, Status as PerformanceCycleStatus } from 'config/enum';
import { formatDate, DATE_FORMAT, getISODateStringWithTimeFromDateString, checkExistedValue } from 'utils';
import useDispatch from 'hooks/useDispatch';
import useLocation from 'hooks/useLocation';

import { Page } from 'pages/general/types';

const CreatePerformanceCycle: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation<{ isViewing?: boolean }>();
  const { isViewing } = state || {};

  const { addToast } = useToast();
  const { performanceCycleUuid } = useParams<{ performanceCycleUuid: string }>();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const cycle = useSelector(performanceCycleByUuidSelector(performanceCycleUuid as string));

  const cycleForms = useSelector(performanceCycleFormsByUuidSelector(performanceCycleUuid as string));
  const { loaded: performanceCycleLoaded, status, error } = useSelector(performanceCycleMetaSelector);

  const getConfigEntriesByUuid = (uuid: string) => dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid }));

  const canEdit = useMemo(() => {
    return (
      !isViewing &&
      cycle?.status !== PerformanceCycleStatus.INACTIVE &&
      cycle?.status !== PerformanceCycleStatus.COMPLETED
    );
  }, [cycle]);

  useEffect(() => {
    if (status === Status.SUCCEEDED) {
      navigate({
        pathname: buildPath(Page.PERFORMANCE_CYCLE),
        search: new URLSearchParams({ status: cycle?.status || PerformanceCycleStatus.STARTED }).toString(),
      });
      dispatch(PerformanceCycleActions.resetMetaStatusRequest());
    }
    if (status === Status.FAILED) {
      error
        ?.filter(({ message }) => message)
        ?.forEach(({ message }) => {
          addToast({
            id: uuid(),
            title: 'Error',
            variant: Variant.ERROR,
            description: message,
          });
        });
    }
  }, [status]);

  useEffect(() => {
    if (performanceCycleUuid !== 'new')
      dispatch(PerformanceCycleActions.getPerformanceCycleByUuid({ performanceCycleUuid, includeForms: true }));
  }, [performanceCycleUuid]);

  function buildData(data) {
    const { metadata, name, template, entryConfigKey, status, type, cycleType = CycleType.FISCAL } = data;
    const startTime = getISODateStringWithTimeFromDateString(
      formatDate(metadata.cycle.properties.pm_cycle_start_time, DATE_FORMAT),
    );
    const endTime = getISODateStringWithTimeFromDateString(
      formatDate(metadata.cycle.properties.pm_cycle_end_time, DATE_FORMAT),
    );

    const properties = checkExistedValue(metadata.cycle.properties);

    const timelinePoints = metadata.cycle.timelinePoints.map(({ properties, ...rest }) => ({
      ...rest,
      properties: checkExistedValue(properties),
    }));

    return {
      uuid: performanceCycleUuid !== 'new' ? performanceCycleUuid : undefined,
      template,
      name,
      status,
      entryConfigKey,
      createdBy: {
        uuid: colleagueUuid,
      },
      type: type || cycleType,
      metadata: {
        ...metadata,
        cycle: {
          ...metadata.cycle,
          timelinePoints,
          properties: { ...properties, pm_cycle_start_time: startTime, pm_cycle_end_time: endTime },
        },
      },
      startTime,
      endTime,
    };
  }

  const handleSave = (data) => {
    if (performanceCycleUuid === 'new') {
      dispatch(PerformanceCycleActions.createPerformanceCycle({ ...data, status: 'DRAFT' }));
      return;
    }
    dispatch(PerformanceCycleActions.updatePerformanceCycle({ ...data, status: 'DRAFT' }));
  };

  const handlePublish = (data, status) => {
    const newData = {
      ...data,
      status: status && status !== PerformanceCycleStatus.DRAFT ? status : PerformanceCycleStatus.REGISTERED,
      uuid: performanceCycleUuid === 'new' ? undefined : performanceCycleUuid,
    };
    if (performanceCycleUuid === 'new') {
      dispatch(PerformanceCycleActions.createPerformanceCycle(newData));
    } else {
      dispatch(PerformanceCycleActions.updatePerformanceCycle(newData));
    }
  };

  const handleSubmit = ({ mode, status, ...data }) => {
    if (mode === 'PUBLISH') {
      handlePublish(buildData(data), status);
      return;
    }
    handleSave(buildData(data));
  };

  const defaultValues = useMemo(() => {
    if (performanceCycleUuid === 'new' || !cycle) {
      return {};
    }

    return {
      name: cycle?.name,
      metadata: cycle?.metadata,
      entryConfigKey: cycle?.entryConfigKey,
      status: cycle?.status,
      template: cycle?.template,
      forms: cycleForms || [],
    };
  }, [performanceCycleUuid, cycle]);

  if (
    performanceCycleUuid !== 'new' &&
    (!performanceCycleLoaded || Object.values(defaultValues).some((value) => !value))
  )
    return <Spinner fullHeight />;

  return (
    <PerformanceCycleForm
      onSubmit={handleSubmit}
      getConfigEntriesByUuid={getConfigEntriesByUuid}
      defaultValues={defaultValues}
      canEdit={performanceCycleUuid === 'new' || canEdit}
    />
  );
};

export default CreatePerformanceCycle;
