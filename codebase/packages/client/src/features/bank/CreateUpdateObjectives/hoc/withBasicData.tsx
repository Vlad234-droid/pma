import { Props } from '../CreateObjectives';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
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
    const { activeCode } = useTimelineContainer();

    const defaultFormState = props.useSingleStep ? FormStateType.SINGLE_MODIFY : FormStateType.MODIFY;
    const [formState, setFormState] = useState<FormStateType>(defaultFormState);

    const { loading: schemaLoading } = useSelector(schemaMetaSelector);
    const {
      loading: reviewLoading,
      saved: reviewSaved,
      saving: reviewSaving,
      error: reviewError,
    } = useSelector(reviewsMetaSelector);
    const { loading: timelineLoading } = useSelector(timelinesMetaSelector);
    const colleagueUuid = useSelector(colleagueUUIDSelector);

    useEffect(() => {
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
    }, []);

    useEffect(() => {
      if (activeCode[ReviewType.QUARTER]) {
        const pathParams = { colleagueUuid, code: activeCode[ReviewType.QUARTER], cycleUuid: 'CURRENT' };
        dispatch(ReviewsActions.getReviews({ pathParams }));
      }
    }, []);

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
