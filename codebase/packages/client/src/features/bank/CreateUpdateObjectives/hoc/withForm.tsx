import React, { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';

import {
  colleagueUUIDSelector,
  Component,
  filterReviewsByTypeSelector,
  getReviewSchema,
  getTimelinesByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  TimelineActions,
  timelinesMetaSelector,
} from '@pma/store';
import { FormStateType, Objective } from '../type';
import { useSelector } from 'react-redux';
import { ReviewType, Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';
import { Timeline } from 'config/types';
import { USER } from 'config/constants';
import Spinner from 'components/Spinner';

export type FormPropsType = {
  currentNumber: number;
  timelineCode: string;
  defaultValues: Record<string, any>;
  components: Component[];
  objective: Objective;
  objectives: Objective[];
  formState: FormStateType;
  setFormState: Dispatch<SetStateAction<FormStateType>>;
  onSaveAsDraft: (T) => void;
  onSubmit: () => void;
  onPreview: (T) => void;
  onNext: (T) => void;
  onBack: () => void;
};

export function withForm<P>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const dispatch = useDispatch();
    const { loading: schemaLoading } = useSelector(schemaMetaSelector);
    const { loading: reviewLoading } = useSelector(reviewsMetaSelector);
    const { loading: timelineLoading } = useSelector(timelinesMetaSelector());
    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const timelinePoints: Timeline[] =
      useSelector(getTimelinesByReviewTypeSelector(ReviewType.QUARTER, USER.current)) || [];

    const visibleTimelinePoints = timelinePoints?.filter(
      (timelinePoint) => timelinePoint.status !== Status.NOT_STARTED,
    );

    const timelinePoint: Timeline = visibleTimelinePoints.find(
      (timelinePoint) => timelinePoint.status === Status.STARTED, // todo not handle overdue
    ) as Timeline;

    const schema = useSelector(getReviewSchema(timelinePoint?.code));
    const pathParams = { colleagueUuid, code: timelinePoint?.code, cycleUuid: 'CURRENT' };
    const { components = [] as Component[], markup = { max: 1, min: 15 } } = schema;
    const objectives: Objective[] = useSelector(filterReviewsByTypeSelector(ReviewType.QUARTER)) || [];

    const startFromNumber = objectives?.length < markup.max ? objectives?.length + 1 : objectives?.length;

    const [currentNumber, setNumber] = useState<number>(startFromNumber);
    const [objective, setObjective] = useState<Objective>({});

    const defaultFormState = useMemo(
      () => (objectives.length < markup.max ? FormStateType.MODIFY : FormStateType.PREVIEW),
      [objectives, markup],
    );
    const [formState, setFormState] = useState<FormStateType>(defaultFormState);

    const formElementsFilledEmpty = components
      ?.filter((component) => component.type != 'text')
      .reduce((acc, current) => {
        if (current.key) {
          acc[current.key] = '';
        }
        return acc;
      }, {});

    const defaultValues = objectives[currentNumber - 1]?.properties || formElementsFilledEmpty;

    const handleSaveAsDraft = (data) => {
      const currentObjectiveIndex = objectives.findIndex((objective) => objective.number === currentNumber);

      if (!objectives[currentObjectiveIndex]) {
        objectives[objectives.length] = { number: currentNumber, status: Status.DRAFT };
      }

      const updatedObjectives = objectives.map((objective) => {
        if (currentNumber === objective.number) {
          return {
            ...objective,
            status: Status.DRAFT,
            properties: { ...data },
          };
        }
        return { ...objective, status: Status.DRAFT };
      });
      console.log('{ pathParams, data: updatedObjectives }', { pathParams, data: updatedObjectives });
      dispatch(ReviewsActions.updateReviews({ pathParams, data: updatedObjectives }));

      // @ts-ignore
      props.onClose();
    };

    const handleNext = (data) => {
      setObjective({ ...objective, properties: data });
      const currentObjectiveIndex = objectives.findIndex((objective) => objective.number === currentNumber);

      if (!objectives[currentObjectiveIndex]) {
        objectives[objectives.length] = { number: currentNumber, status: Status.DRAFT };
      }
      const updatedObjectives: Objective[] = objectives.map((objective) => {
        if (currentNumber === Number(objective.number)) {
          return {
            ...objective,
            number: currentNumber,
            status: Status.DRAFT,
            properties: { ...data },
          };
        }
        return { ...objective, status: Status.DRAFT };
      });

      dispatch(
        ReviewsActions.updateReviews({
          pathParams,
          data: updatedObjectives,
        }),
      );
      setNumber(currentNumber + 1);
    };

    const handleSubmit = () => {
      const updatedObjectives = objectives.map((objective) => {
        if (currentNumber === Number(objective.number)) {
          return {
            ...objective,
            status: Status.WAITING_FOR_APPROVAL,
          };
        }
        return { ...objective, status: Status.WAITING_FOR_APPROVAL };
      });

      dispatch(ReviewsActions.updateReviews({ pathParams, data: updatedObjectives }));
      setFormState(FormStateType.SUBMITTED);
    };

    const handlePreview = (data) => {
      const currentObjectiveIndex = objectives.findIndex((objective) => objective.number === currentNumber);
      if (!objectives[currentObjectiveIndex]) {
        objectives[objectives.length] = { number: currentNumber, status: Status.DRAFT };
      }
      const updatedObjectives = objectives.map((objective) => {
        if (currentNumber === Number(objective.number)) {
          return {
            ...objective,
            status: Status.DRAFT,
            properties: { ...data },
          };
        }
        return { ...objective, status: Status.DRAFT };
      });

      dispatch(ReviewsActions.updateReviews({ pathParams, data: updatedObjectives }));
      setFormState(FormStateType.PREVIEW);
    };

    const handleBack = () => {
      if (formState !== FormStateType.MODIFY) {
        setFormState(FormStateType.MODIFY);
        setNumber(objectives?.length);
      } else if (currentNumber > 1) {
        setNumber(currentNumber - 1);
      }
    };

    useEffect(() => {
      dispatch(ReviewsActions.getReviews({ pathParams }));
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }, []);

    useEffect(() => {
      setObjective(objectives?.find(({ number }) => number === currentNumber) || {});
    }, [objectives?.length, currentNumber]);

    useEffect(() => {
      setNumber(startFromNumber);
    }, [startFromNumber]);

    if (schemaLoading || reviewLoading || timelineLoading) return <Spinner fullHeight />;

    return (
      <WrappedComponent
        {...props}
        defaultValues={defaultValues}
        timelineCode={timelinePoint?.code}
        currentNumber={currentNumber}
        components={components}
        objective={objective}
        objectives={objectives}
        formState={formState}
        setFormState={setFormState}
        onSaveAsDraft={handleSaveAsDraft}
        onSubmit={handleSubmit}
        onPreview={handlePreview}
        onNext={handleNext}
        onBack={handleBack}
      />
    );
  };
  return Component;
}
