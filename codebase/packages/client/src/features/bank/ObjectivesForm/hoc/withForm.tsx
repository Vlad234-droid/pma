import React, { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  colleagueUUIDSelector,
  Component,
  filterReviewsByTypeSelector,
  getReviewSchema,
  ReviewsActions,
  SchemaActions,
} from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'components/Translation';
import { FormStateType, Objective } from '../type';
import { useSelector } from 'react-redux';
import { ReviewType, Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

export type FormPropsType = {
  currentNumber: number;
  components: Component[];
  objective: Objective;
  objectives: Objective[];
  methods: UseFormReturn;
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
    const { t } = useTranslation();
    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
    const pathParams = { colleagueUuid, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };
    const { components = [] as Component[], markup = { max: 1, min: 15 } } = schema;
    const objectives: Objective[] = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE)) || [];

    // todo wait for design. could start from diff number
    const draftObjectives = useMemo(
      () => objectives.filter((objective) => objective.status === Status.DRAFT),
      [objectives],
    );
    const startFromNumber = draftObjectives?.length + 1;
    const [currentNumber, setNumber] = useState<number>(startFromNumber);
    const [objective, setObjective] = useState<Objective>({});

    const defaultFormState = useMemo(
      () => (objectives.length < markup.max ? FormStateType.MODIFY : FormStateType.PREVIEW),
      [objectives, markup],
    );
    const [formState, setFormState] = useState<FormStateType>(defaultFormState);

    // @ts-ignore
    const yepSchema = components?.reduce(createYupSchema(t), {});
    const methods = useFormWithCloseProtection({
      mode: 'onChange',
      resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    });
    const { reset } = methods;

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
        setNumber(draftObjectives?.length);
      } else if (currentNumber > 1) {
        setNumber(currentNumber - 1);
      }
    };

    useEffect(() => {
      dispatch(ReviewsActions.getReviews({ pathParams }));
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
    }, []);
    useEffect(() => {
      reset(objective?.properties || { title: '', description: '' });
    }, [objective]);
    useEffect(() => {
      setObjective(objectives?.find(({ number }) => number === currentNumber) || {});
    }, [objectives?.length, currentNumber]);

    return (
      <WrappedComponent
        {...props}
        currentNumber={currentNumber}
        components={components}
        objective={objective}
        objectives={objectives}
        methods={methods}
        formState={formState}
        setFormState={setFormState}
        onSaveAsDraft={methods.handleSubmit(handleSaveAsDraft)}
        onSubmit={handleSubmit}
        onPreview={methods.handleSubmit(handlePreview)}
        onNext={methods.handleSubmit(handleNext)}
        onBack={handleBack}
      />
    );
  };
  return Component;
}
