import React, { useCallback, useEffect, useState } from 'react';
import { useTimelineContainer } from 'contexts/timelineContext';
import { ObjectiveTypes, transformReviewsToObjectives } from 'features/general/Reviews';
import {
  colleagueUUIDSelector,
  filterReviewsByTypeSelector,
  getReviewSchema,
  getTimelinesByReviewTypeSelector,
  priorityNotesMetaSelector,
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
import { ConfirmModal } from 'components/ConfirmModal';
import { Trans, useTranslation } from 'components/Translation';

export type PropsType = {
  objectives: ObjectiveTypes.Objective[];
  handleCompletion: (number: number) => void;
  handleDelete: (number: number) => void;
  handleSelectTimelinePoint: (T) => void;
  timelinePoints: Timeline[];
  activeTimelinePoints?: Timeline;
};

export function withSection<P>(WrappedComponent: React.ComponentType<P & PropsType>) {
  const Component = (props: P) => {
    const dispatch = useDispatch();
    const { activeCode, setActiveCode } = useTimelineContainer();
    const { t } = useTranslation();
    const [removedPriority, setPriority] = useState<string>('');

    const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
    const { loaded: timelineLoaded } = useSelector(timelinesMetaSelector);
    const { loaded: reviewLoaded, saved: reviewSaved } = useSelector(reviewsMetaSelector);
    const { loaded: notesLoaded } = useSelector(priorityNotesMetaSelector);

    const timelinePoints: Timeline[] =
      useSelector(getTimelinesByReviewTypeSelector(ReviewType.QUARTER, USER.current)) || [];

    const visibleTimelinePoints = timelinePoints?.filter(
      (timelinePoint) => timelinePoint.status !== Status.NOT_STARTED,
    );

    const timelinePoint = visibleTimelinePoints.find(
      (timelinePoint) => timelinePoint.code === activeCode[ReviewType.QUARTER],
    );

    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const originObjectives: Review[] = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER));

    const objectiveSchema = useSelector(getReviewSchema(timelinePoint?.code || 'Q1'));
    const { components = [] } = objectiveSchema;
    const formElements = components.filter((component) => component.type != 'text');

    const [objectives, setObjectives] = useState<ObjectiveTypes.Objective[]>([]);
    const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
    const canShowObjectives = timelineTypes[ReviewType.QUARTER];

    const handleSelectTimelinePoint = useCallback(
      (e) => {
        const code = e.currentTarget.dataset['code'];
        const timelinePointById = visibleTimelinePoints.find((timelinePoint) => timelinePoint.code === code);
        setActiveCode(ReviewType.QUARTER, code);

        const filteredObjectives = originObjectives.filter(
          (objective) => objective.tlPointUuid === timelinePointById?.uuid,
        );
        setObjectives(transformReviewsToObjectives(filteredObjectives, formElements));
      },
      [visibleTimelinePoints, originObjectives],
    );

    const handleCompletion = (number) => {
      const pathParams = { colleagueUuid, code: activeCode[ReviewType.QUARTER], cycleUuid: 'CURRENT' };
      const objective = originObjectives.find((objective) => objective.number == number);
      dispatch(
        ReviewsActions.updateReview({
          pathParams: { ...pathParams, number },
          data: [{ number, properties: objective?.properties, status: Status.WAITING_FOR_COMPLETION }],
        }),
      );
    };

    const handleDelete = (number) => {
      const pathParams = { colleagueUuid, code: activeCode[ReviewType.QUARTER], cycleUuid: 'CURRENT' };
      dispatch(
        ReviewsActions.deleteReview({
          pathParams: { ...pathParams, number },
        }),
      );
      const objective = objectives.find((objective) => objective.id == number);
      setPriority(objective?.subTitle || number);
    };
    const handleClearRemovedPriority = () => setPriority('');

    useEffect(() => {
      if (canShowObjectives && activeCode[ReviewType.QUARTER]) {
        dispatch(
          ReviewsActions.getReviewsWithNotes({
            pathParams: { colleagueUuid, code: activeCode[ReviewType.QUARTER], cycleUuid: 'CURRENT' },
          }),
        );
      }
    }, [canShowObjectives, activeCode[ReviewType.QUARTER]]);

    useEffect(() => {
      if ((reviewLoaded || reviewSaved) && schemaLoaded && timelineLoaded && notesLoaded) {
        const filteredObjectives = originObjectives.filter(
          (objective) => objective.tlPointUuid === timelinePoint?.uuid,
        );
        setObjectives(transformReviewsToObjectives(filteredObjectives, formElements));
      }
    }, [reviewLoaded, reviewSaved, schemaLoaded, timelineLoaded, notesLoaded]);

    return (
      <>
        <WrappedComponent
          {...props}
          objectives={objectives}
          handleCompletion={handleCompletion}
          handleDelete={handleDelete}
          handleSelectTimelinePoint={handleSelectTimelinePoint}
          timelinePoints={visibleTimelinePoints}
          activeTimelinePoints={timelinePoint}
        />
        {removedPriority && reviewLoaded && (
          <ConfirmModal
            title={t('priority_deleted', 'Priority deleted')}
            description={removedPriority}
            visibleCancelBtn={false}
            onSave={handleClearRemovedPriority}
            submitBtnTitle={<Trans i18nKey='ok'>Ok</Trans>}
            onCancel={handleClearRemovedPriority}
            onOverlayClick={handleClearRemovedPriority}
          />
        )}
      </>
    );
  };
  return Component;
}
