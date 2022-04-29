import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  colleagueUUIDSelector,
  ConfigEntriesActions,
  PerformanceCycleActions,
  performanceCycleByUuidSelector,
  performanceCycleFormsByUuidSelector,
  performanceCycleMetaSelector,
  Status,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';
import { buildPath } from 'features/Routes';
import { useToast, Variant } from 'features/Toast';
import Spinner from 'components/Spinner';
import PerformanceCycleForm from './components/PerformanceCycleForm';
import { Status as PerformanceCycleStatus } from './type';

const CreatePerformanceCycle: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { performanceCycleUuid } = useParams<{ performanceCycleUuid: string }>();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const cycle = useSelector(performanceCycleByUuidSelector(performanceCycleUuid as string));
  const cycleForms = useSelector(performanceCycleFormsByUuidSelector(performanceCycleUuid as string));
  const { loaded: performanceCycleLoaded, status, error } = useSelector(performanceCycleMetaSelector);

  const getConfigEntriesByUuid = (uuid: string) => dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid }));

  const canEdit = useMemo(() => {
    return cycle?.status === PerformanceCycleStatus.DRAFT || cycle?.status === PerformanceCycleStatus.REGISTERED;
  }, [cycle]);

  useEffect(() => {
    if (status === Status.SUCCEEDED) {
      navigate({
        pathname: buildPath(Page.PERFORMANCE_CYCLE),
        search: new URLSearchParams({ status: cycle.status }).toString(),
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
