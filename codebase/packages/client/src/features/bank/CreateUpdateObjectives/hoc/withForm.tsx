import React, { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

import { Page } from 'pages';
import { ReviewType, Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';
import { Timeline } from 'config/types';
import { USER } from 'config/constants';

import Spinner from 'components/Spinner';

import { FormStateType, Objective } from '../type';
import { Props } from '../CreateObjectives';

export type FormPropsType = {
  currentNumber: number;
  timelineCode: string;
  defaultValues: Record<string, any>;
  components: Component[];
  objectives: Objective[];
  formState: FormStateType;
  setFormState: Dispatch<SetStateAction<FormStateType>>;
  onSaveAsDraft: (T) => void;
  onSubmit: (T?) => void;
  onPreview: (T) => void;
  onNext: (T) => void;
  onBack: () => void;
};

export function withForm<P extends Props>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const { editNumber, useSingleStep, onClose } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading: schemaLoading } = useSelector(schemaMetaSelector);
    const { loading: reviewLoading, loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
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

    const [defaultValues, setDefaultValues] = useState<Objective>({});

    const defaultFormState = useMemo(() => {
      if (useSingleStep) {
        return FormStateType.SINGLE_MODIFY;
      }
      return objectives.length < markup.max ? FormStateType.MODIFY : FormStateType.PREVIEW;
    }, [objectives, markup, useSingleStep]);
    const [formState, setFormState] = useState<FormStateType>(defaultFormState);

    const formElementsFilledEmpty = components
      ?.filter((component) => component.type != 'text')
      .reduce((acc, current) => {
        if (current.key) {
          acc[current.key] = '';
        }
        return acc;
      }, {});

    const handleSaveAsDraft = (data) => {
      const currentObjectiveIndex = objectives.findIndex((objective) => objective.number === currentNumber);
      if (!objectives[currentObjectiveIndex]) {
        dispatch(
          ReviewsActions.createReview({
            pathParams: { ...pathParams, number: currentNumber },
            data: [{ number: currentNumber, properties: data, status: Status.DRAFT }],
          }),
        );
      } else {
        dispatch(
          ReviewsActions.updateReview({
            pathParams: { ...pathParams, number: currentNumber },
            data: [{ number: currentNumber, properties: data, status: Status.DRAFT }],
          }),
        );
      }

      onClose();
    };

    const handleNext = (data) => {
      const currentObjectiveIndex = objectives.findIndex((objective) => objective.number === currentNumber);
      if (!objectives[currentObjectiveIndex]) {
        dispatch(
          ReviewsActions.createReview({
            pathParams: { ...pathParams, number: currentNumber },
            data: [{ number: currentNumber, properties: data, status: Status.DRAFT }],
          }),
        );
      } else {
        dispatch(
          ReviewsActions.updateReview({
            pathParams: { ...pathParams, number: currentNumber },
            data: [{ number: currentNumber, properties: data, status: Status.DRAFT }],
          }),
        );
      }
      const nextNumber = currentNumber + 1;
      setNumber(nextNumber);
      const currentObjective = objectives.find((objective) => objective.number === nextNumber);
      setDefaultValues(currentObjective?.properties || formElementsFilledEmpty);
    };

    const handleSubmit = (data) => {
      if (useSingleStep && editNumber) {
        dispatch(
          ReviewsActions.updateReview({
            pathParams: { ...pathParams, number: editNumber },
            data: [{ number: editNumber, properties: data, status: Status.WAITING_FOR_APPROVAL }],
          }),
        );
      } else {
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
      }

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
        const prevNumber = currentNumber - 1;
        setNumber(prevNumber);
        const currentObjective = objectives.find((objective) => objective.number === prevNumber);
        setDefaultValues(currentObjective?.properties || formElementsFilledEmpty);
      }
    };

    useEffect(() => {
      dispatch(ReviewsActions.getReviews({ pathParams }));
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }, []);

    useEffect(() => {
      if (useSingleStep && editNumber) {
        setNumber(editNumber);
        const currentObjective = objectives.find((objective) => objective.number === editNumber);
        setDefaultValues(currentObjective?.properties || formElementsFilledEmpty);
        if (reviewLoaded && !currentObjective?.properties) {
          navigate(`/${Page.NOT_FOUND}`);
        }
      } else {
        setNumber(startFromNumber);
        const currentObjective = objectives.find((objective) => objective.number === startFromNumber);
        setDefaultValues(currentObjective?.properties || formElementsFilledEmpty);
      }
    }, [startFromNumber]);

    if (schemaLoading || reviewLoading || timelineLoading) return <Spinner fullHeight />;

    return (
      <WrappedComponent
        {...props}
        defaultValues={defaultValues}
        timelineCode={timelinePoint?.code}
        currentNumber={currentNumber}
        components={components}
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
