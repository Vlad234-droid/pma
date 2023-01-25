import React, { Dispatch, SetStateAction, useMemo } from 'react';
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

import { FormStateType, FormValues, Objective } from '../type';
import { Props } from '../CreateObjectives';

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
  onPreview: (T) => void;
  onNext: (T) => void;
  onPrev: (withConfirmation: boolean) => void;
  onSelectStep: (index: number) => void;
  lastStep: boolean;
};

export function withForm<
  P extends Props & {
    formState: FormStateType;
    setFormState: Dispatch<SetStateAction<FormStateType>>;
    localObjectives: Objective[];
    setLocalObjectives: Dispatch<SetStateAction<Objective[]>>;
    currentPriorityIndex: number;
    setPriorityIndex: Dispatch<SetStateAction<number>>;
  },
>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const {
      editNumber,
      useSingleStep,
      onClose,
      formState,
      setFormState,
      localObjectives,
      setLocalObjectives,
      currentPriorityIndex,
      setPriorityIndex,
    } = props;
    const dispatch = useDispatch();
    const { currentTimelines } = useTimelineContainer();
    const { code: activeCode } = currentTimelines[ReviewType.QUARTER] || {};
    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const schema = useSelector(getReviewSchema(activeCode));
    const pathParams = { colleagueUuid, code: activeCode, cycleUuid: 'CURRENT' };
    const { components = [] as Component[], markup = { max: 15, min: 1 } } = schema;
    const allObjectives: Objective[] = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER)) || [];
    const { number: lastCreatedNumber = 0 } = useMemo(
      () => (allObjectives.length ? allObjectives[allObjectives.length - 1] : {}),
      [allObjectives],
    );

    const getObjectivesUuid = (number) => allObjectives.find((o) => o.number === number)?.uuid || null;

    const minCreatePrioritiesIndex = 0;
    const maxCreatePrioritiesIndex: number = Number(markup.max) - Number(allObjectives.length);
    const lastStep = Number(markup.max) === Number(allObjectives.length) + 1;

    const formElements: Array<any> = components.filter((component) => component.type != 'text');

    const saveDraftData = (priority: Objective) => {
      const uuid = getObjectivesUuid(priority.number);
      if (!uuid) {
        dispatch(
          ReviewsActions.createReview({
            pathParams: { ...pathParams, number: priority.number },
            data: [{ number: priority.number, properties: priority.properties, status: Status.DRAFT }],
          }),
        );
        setLocalObjectives((current) => [
          ...current,
          { number: priority.number, properties: priority.properties, status: Status.DRAFT },
        ]);
      } else {
        dispatch(
          ReviewsActions.updateReview({
            pathParams: { ...pathParams, number: priority.number },
            data: [{ number: priority.number, properties: priority.properties, status: Status.DRAFT }],
          }),
        );
        setLocalObjectives((current) => {
          return current.map((objective) => {
            if (objective.number === priority.number) {
              return { ...objective, properties: priority.properties };
            }
            return objective;
          });
        });
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
      setPriorityIndex((current) => Math.min(++current, Number(markup.max) - 1));
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

    const handlePreview = (data: FormValues) => {
      if (data.data?.length) saveDraftData(data.data[currentPriorityIndex]);
      setFormState(FormStateType.PREVIEW);
    };

    const handleSelectStep = (index: number) => setPriorityIndex(index);

    const defaultValues = useMemo(() => {
      const emptyProperties = formElements.reduce((acc, current) => {
        acc[current.key] = '';
        return acc;
      }, {});

      if (!useSingleStep) {
        const defaultPriorities = localObjectives.map((priority) => ({
          uuid: priority.uuid,
          number: priority.number,
          properties: priority.properties,
        }));

        if (minCreatePrioritiesIndex <= maxCreatePrioritiesIndex && ![FormStateType.PREVIEW].includes(formState)) {
          defaultPriorities.push({
            uuid: undefined,
            number: lastCreatedNumber + 1,
            properties: emptyProperties,
          });
        }

        return defaultPriorities;
      } else if (useSingleStep && editNumber) {
        const objective = allObjectives.find((objective) => objective.number === editNumber) || {};
        return [objective];
      }
    }, [localObjectives, lastCreatedNumber, editNumber]);

    return (
      <WrappedComponent
        {...props}
        lastStep={lastStep}
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
