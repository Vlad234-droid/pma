import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  handleSaveAsDraft: (T) => void;
  handleSubmit: () => void;
  handlePreview: (T) => void;
  handleNext: (T) => void;
};

export function withForm<P>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
    const pathParams = { colleagueUuid, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };
    const { components = [] as Component[] } = schema;
    const [formState, setFormState] = useState<FormStateType>(FormStateType.MODIFY);
    const [currentNumber, setNumber] = useState<number>(1);
    const objectives: Objective[] = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE)) || [];
    const [objective, setObjective] = useState<Objective>({});

    // @ts-ignore
    const yepSchema = components?.reduce(createYupSchema(t), {});
    const methods = useFormWithCloseProtection({
      mode: 'onChange',
      resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    });
    const { reset } = methods;

    const handleSaveAsDraft = (data) => {
      if (!objectives[currentNumber - 1]) {
        objectives[currentNumber - 1] = { number: currentNumber, status: Status.DRAFT };
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

      if (!objectives[currentNumber - 1]) {
        objectives[currentNumber - 1] = { number: currentNumber, status: Status.DRAFT };
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
      if (!objectives[currentNumber - 1]) {
        objectives[currentNumber - 1] = { number: currentNumber, status: Status.DRAFT };
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
        handleSaveAsDraft={methods.handleSubmit(handleSaveAsDraft)}
        handleSubmit={handleSubmit}
        handlePreview={methods.handleSubmit(handlePreview)}
        handleNext={methods.handleSubmit(handleNext)}
      />
    );
  };
  return Component;
}
