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
import { FormStateType } from '../type';
import { useTimelineContainer } from 'contexts/timelineContext';

export function withBasicData<P extends Props>(
  WrappedComponent: React.ComponentType<
    P & { formState: FormStateType; setFormState: Dispatch<SetStateAction<FormStateType>> }
  >,
) {
  const Component = (props: P) => {
    const dispatch = useDispatch();
    const { activeTimelines } = useTimelineContainer();
    const { code: activeCode } = activeTimelines[ReviewType.QUARTER] || {};
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

    return <WrappedComponent {...props} formState={formState} setFormState={setFormState} />;
  };
  return Component;
}
