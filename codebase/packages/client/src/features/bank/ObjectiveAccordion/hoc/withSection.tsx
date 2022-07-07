import React, { useEffect, useState, useCallback } from 'react';
import { ObjectiveTypes, transformReviewsToObjectives } from 'features/general/Objectives';
import {
  colleagueUUIDSelector,
  filterReviewsByTypeSelector,
  getReviewSchema,
  getTimelinesByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  schemaMetaSelector,
  timelinesMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { Review, ReviewType, Status, Timeline } from 'config/types';
import { useSelector } from 'react-redux';
import { USER } from 'config/constants';

export type PropsType = {
  objectives: ObjectiveTypes.Objective[];
  handleSelectTimelinePoint: (T) => void;
  timelinePoints: Timeline[];
  activeTimelinePoints?: Timeline;
};

export function withSection<P>(WrappedComponent: React.ComponentType<P & PropsType>) {
  const Component = (props: P) => {
    const dispatch = useDispatch();

    const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
    const { loaded: timelineLoaded } = useSelector(timelinesMetaSelector());
    const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);

    const timelinePoints: Timeline[] =
      useSelector(getTimelinesByReviewTypeSelector(ReviewType.QUARTER, USER.current)) || [];

    const visibleTimelinePoints = timelinePoints?.filter(
      (timelinePoint) => timelinePoint.summaryStatus !== Status.NOT_STARTED,
    );

    const timelinePoint = visibleTimelinePoints.find((timelinePoint) => timelinePoint.summaryStatus === Status.STARTED);
    const [selectedTimelinePoint, setTimelinePoint] = useState(timelinePoint);

    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const originObjectives: Review[] = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER));

    const objectiveSchema = useSelector(getReviewSchema(ReviewType.QUARTER));
    const { components = [] } = objectiveSchema;
    const formElements = components.filter((component) => component.type != 'text');

    const [objectives, setObjectives] = useState<ObjectiveTypes.Objective[]>([]);
    const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
    const canShowObjectives = timelineTypes[ReviewType.QUARTER];

    const handleSelectTimelinePoint = useCallback(
      (e) => {
        const uuid = e.currentTarget.dataset['uuid'];
        const timelinePointById = visibleTimelinePoints.find((timelinePoint) => timelinePoint.uuid === uuid);
        setTimelinePoint(timelinePointById);

        const filteredObjectives = originObjectives.filter(
          (objective) => objective.tlPointUuid === timelinePointById?.uuid,
        );
        setObjectives(transformReviewsToObjectives(filteredObjectives, formElements));
      },
      [visibleTimelinePoints, originObjectives],
    );

    useEffect(() => {
      if (canShowObjectives) {
        dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: 'CURRENT' } }));
      }

      return () => {
        dispatch(ReviewsActions.clearReviewData());
      };
    }, [canShowObjectives]);

    useEffect(() => {
      if (timelineLoaded) {
        setTimelinePoint(timelinePoint);
      }
    }, [timelineLoaded]);

    useEffect(() => {
      if (reviewLoaded && schemaLoaded && timelineLoaded) {
        const filteredObjectives = originObjectives.filter(
          (objective) => objective.tlPointUuid === selectedTimelinePoint?.uuid,
        );
        setObjectives(transformReviewsToObjectives(filteredObjectives, formElements));
      }
    }, [reviewLoaded, schemaLoaded, timelineLoaded]);

    return (
      <WrappedComponent
        {...props}
        objectives={objectives}
        handleSelectTimelinePoint={handleSelectTimelinePoint}
        timelinePoints={visibleTimelinePoints}
        activeTimelinePoints={selectedTimelinePoint}
      />
    );
  };
  return Component;
}
