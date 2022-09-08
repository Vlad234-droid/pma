import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  colleagueUUIDSelector,
  Component,
  filterReviewsByTypeSelector,
  getReviewSchema,
  ReviewsActions,
} from '@pma/store';

import { ReviewType, Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

import { FormStateType, Objective, FormValues } from '../type';
import { Props } from '../CreateObjectives';

import { prioritiesInStatuses, prioritiesNotInStatuses } from '../utils';
import { useTimelineContainer } from 'contexts/timelineContext';

export type FormPropsType = {
  formElements: Array<any>;
  currentPriorityIndex: number;
  defaultValues: FormValues;
  components: Component[];
  formState: FormStateType;
  setFormState: Dispatch<SetStateAction<FormStateType>>;
  onSaveAsDraft: (T) => void;
  onSubmit: (T) => void;
  onPreview: () => void;
  onNext: (T) => void;
  onPrev: (withConfirmation: boolean) => void;
  onSelectStep: (index: number) => void;
  lastStep: boolean;
};

export function withForm<
  P extends Props & { formState: FormStateType; setFormState: Dispatch<SetStateAction<FormStateType>> },
>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const { editNumber, useSingleStep, onClose, formState, setFormState } = props;
    const dispatch = useDispatch();
    const { activeCode } = useTimelineContainer();
    const [currentPriorityIndex, setPriorityIndex] = useState<number>(0);

    const colleagueUuid = useSelector(colleagueUUIDSelector);

    const schema = useSelector(getReviewSchema(activeCode[ReviewType.QUARTER]));
    const pathParams = { colleagueUuid, code: activeCode[ReviewType.QUARTER], cycleUuid: 'CURRENT' };
    const { components = [] as Component[], markup = { max: 1, min: 15 } } = schema;
    const objectives: Objective[] = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER)) || [];

    const { number: lastCreatedNumber = 0 } = useMemo(
      () => (objectives.length ? objectives[objectives.length - 1] : {}),
      [objectives],
    );

    const prioritiesInStatusDraft = prioritiesInStatuses([Status.DRAFT])(objectives);
    const prioritiesNotInStatusDraft = prioritiesNotInStatuses([Status.DRAFT])(objectives);

    const minCreatePrioritiesIndex = 0;
    const maxCreatePrioritiesIndex: number = Number(markup.max) - Number(prioritiesNotInStatusDraft.length) - 1;

    const formElements: Array<any> = components.filter((component) => component.type != 'text');

    const saveDraftData = (priority: Objective) => {
      if (!priority?.uuid) {
        dispatch(
          ReviewsActions.createReview({
            pathParams: { ...pathParams, number: priority.number },
            data: [{ number: priority.number, properties: priority.properties, status: Status.DRAFT }],
          }),
        );
      } else {
        dispatch(
          ReviewsActions.updateReview({
            pathParams: { ...pathParams, number: priority.number },
            data: [{ number: priority.number, properties: priority.properties, status: Status.DRAFT }],
          }),
        );
      }
    };

    const saveData = (priorities: Objective[]) => {
      if (useSingleStep && editNumber) {
        const [priority] = priorities;
        if (priority.number === editNumber) {
          dispatch(
            ReviewsActions.updateReview({
              pathParams: { ...pathParams, number: priority.number },
              data: [{ number: priority.number, properties: priority.properties, status: Status.WAITING_FOR_APPROVAL }],
            }),
          );
          setFormState(FormStateType.SUBMITTED);
        }
      } else {
        dispatch(
          ReviewsActions.updateReviews({
            pathParams: { ...pathParams },
            queryParams: { modes: ['CREATE', 'UPDATE'] },
            data: priorities.map((priority) => ({ ...priority, status: Status.WAITING_FOR_APPROVAL })),
          }),
        );
        setFormState(FormStateType.SUBMITTED);
      }
    };

    const handleSaveAsDraft = (data: FormValues) => {
      if (data.data?.length) saveDraftData(data.data[currentPriorityIndex]);
      setFormState(FormStateType.SAVED_AS_DRAFT);
    };

    const handleNext = (data: FormValues) => {
      if (data.data?.length) saveDraftData(data.data[currentPriorityIndex]);
      setPriorityIndex((current) => Math.min(++current, maxCreatePrioritiesIndex));
    };
    const handlePrev = (withConfirmation) => {
      if (currentPriorityIndex === 0 && withConfirmation) {
        if (confirm('Changes that you made may not be saved.')) onClose();
      } else if (currentPriorityIndex === 0) {
        onClose();
      } else {
        setPriorityIndex((current) => Math.max(--current, 0));
      }
    };

    const handleSubmit = (data: FormValues) => {
      if (data.data?.length) saveData(data.data);
    };

    const handlePreview = () => setFormState(FormStateType.PREVIEW);

    const handleSelectStep = (index: number) => setPriorityIndex(index);

    useEffect(() => {
      if (!useSingleStep && minCreatePrioritiesIndex < maxCreatePrioritiesIndex) {
        setPriorityIndex(prioritiesInStatusDraft.length);
      }
      if (!useSingleStep && minCreatePrioritiesIndex === maxCreatePrioritiesIndex) {
        setPriorityIndex(Math.max(prioritiesInStatusDraft.length - 1, 0));
      }
    }, []);

    const defaultValues = useMemo(() => {
      const emptyProperties = formElements.reduce((acc, current) => {
        acc[current.key] = '';
        return acc;
      }, {});

      if (!useSingleStep) {
        const defaultPriorities = prioritiesInStatusDraft.map((priority) => ({
          uuid: priority.uuid,
          number: priority.number,
          properties: priority.properties,
        }));

        if (minCreatePrioritiesIndex <= maxCreatePrioritiesIndex) {
          defaultPriorities.push({
            uuid: undefined,
            number: lastCreatedNumber + 1,
            properties: emptyProperties,
          });
        }

        return defaultPriorities;
      } else if (useSingleStep && editNumber) {
        const objective = objectives.find((objective) => objective.number === editNumber) || {};
        return [objective];
      }
    }, [prioritiesInStatusDraft]);

    return (
      <WrappedComponent
        {...props}
        lastStep={maxCreatePrioritiesIndex === currentPriorityIndex}
        formElements={formElements}
        defaultValues={{ data: defaultValues }}
        currentPriorityIndex={currentPriorityIndex}
        components={components}
        formState={formState}
        setFormState={setFormState}
        onSaveAsDraft={handleSaveAsDraft}
        onSubmit={handleSubmit}
        onPreview={handlePreview}
        onNext={handleNext}
        onPrev={handlePrev}
        onSelectStep={handleSelectStep}
      />
    );
  };
  return Component;
}
