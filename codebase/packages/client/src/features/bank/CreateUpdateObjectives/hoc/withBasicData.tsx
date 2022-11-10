import { Props } from '../CreateObjectives';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueCurrentCycleSelector,
  colleagueUUIDSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  timelinesMetaSelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { ReviewType } from 'config/types';
import Spinner from 'components/Spinner';
import { FormStateType, Objective } from '../type';
import { useTimelineContainer } from 'contexts/timelineContext';

export function withBasicData<P extends Props>(
  WrappedComponent: React.ComponentType<
    P & {
      formState: FormStateType;
      setFormState: Dispatch<SetStateAction<FormStateType>>;
      localObjectives: Objective[];
      setLocalObjectives: Dispatch<SetStateAction<Objective[]>>;
      currentPriorityIndex: number;
      setPriorityIndex: Dispatch<SetStateAction<number>>;
    }
  >,
) {
  const Component = (props: P) => {
    const dispatch = useDispatch();
    const [localObjectives, setLocalObjectives] = useState<Objective[]>([]);
    const [currentPriorityIndex, setPriorityIndex] = useState<number>(0);
    const { currentTimelines } = useTimelineContainer();
    const { code: activeCode } = currentTimelines[ReviewType.QUARTER] || {};
    const colleagueUuid = useSelector(colleagueUUIDSelector);

    const defaultFormState = props.useSingleStep ? FormStateType.SINGLE_MODIFY : FormStateType.MODIFY;
    const [formState, setFormState] = useState<FormStateType>(defaultFormState);
    const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));

    const { loading: schemaLoading } = useSelector(schemaMetaSelector);
    const {
      loading: reviewLoading,
      saved: reviewSaved,
      saving: reviewSaving,
      error: reviewError,
    } = useSelector(reviewsMetaSelector);
    const { loading: timelineLoading } = useSelector(timelinesMetaSelector);

    useEffect(() => {
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
    }, []);

    useEffect(() => {
      if (activeCode) {
        const pathParams = { colleagueUuid, code: activeCode, cycleUuid: currentCycle };
        dispatch(ReviewsActions.getReviews({ pathParams }));
      }
    }, [activeCode, currentCycle]);

    useEffect(() => {
      if (reviewError !== null) {
        setFormState(defaultFormState);
        props.onClose();
      }
    }, [reviewError]);

    useEffect(() => {
      if (formState === FormStateType.SAVED_AS_DRAFT && reviewSaved) {
        props.onClose();
      }
    }, [formState, reviewSaved]);

    if (schemaLoading || reviewLoading || reviewSaving || timelineLoading) return <Spinner fullHeight />;

    return (
      <WrappedComponent
        {...props}
        formState={formState}
        setFormState={setFormState}
        localObjectives={localObjectives}
        setLocalObjectives={setLocalObjectives}
        currentPriorityIndex={currentPriorityIndex}
        setPriorityIndex={setPriorityIndex}
      />
    );
  };
  return Component;
}
