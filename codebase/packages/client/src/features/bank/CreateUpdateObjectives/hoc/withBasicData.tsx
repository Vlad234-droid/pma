import { Props } from '../CreateObjectives';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getTimelinesByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  TimelineActions,
  timelinesMetaSelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { ReviewType, Status, Timeline } from 'config/types';
import { USER } from 'config/constants';
import Spinner from 'components/Spinner';
import { FormStateType } from '../type';

export function withBasicData<P extends Props>(
  WrappedComponent: React.ComponentType<
    P & { formState: FormStateType; setFormState: Dispatch<SetStateAction<FormStateType>> }
  >,
) {
  const Component = (props: P) => {
    const dispatch = useDispatch();

    const defaultFormState = props.useSingleStep ? FormStateType.SINGLE_MODIFY : FormStateType.MODIFY;
    const [formState, setFormState] = useState<FormStateType>(defaultFormState);

    const timelinePoints: Timeline[] =
      useSelector(getTimelinesByReviewTypeSelector(ReviewType.QUARTER, USER.current)) || [];

    const visibleTimelinePoints = timelinePoints?.filter(
      (timelinePoint) => timelinePoint.status !== Status.NOT_STARTED,
    );

    const timelinePoint: Timeline = visibleTimelinePoints.find(
      (timelinePoint) => timelinePoint.status === Status.STARTED,
    ) as Timeline;

    const { loading: schemaLoading } = useSelector(schemaMetaSelector);
    const {
      loading: reviewLoading,
      saved: reviewSaved,
      saving: reviewSaving,
      error: reviewError,
    } = useSelector(reviewsMetaSelector);
    const { loading: timelineLoading } = useSelector(timelinesMetaSelector());
    const colleagueUuid = useSelector(colleagueUUIDSelector);

    useEffect(() => {
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }, []);

    useEffect(() => {
      if (timelinePoint?.code) {
        const pathParams = { colleagueUuid, code: timelinePoint?.code, cycleUuid: 'CURRENT' };
        dispatch(ReviewsActions.getReviews({ pathParams }));
      }
    }, [timelinePoint]);

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
