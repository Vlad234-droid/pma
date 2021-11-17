import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { schemaMetaSelector } from '@pma/store/src/selectors/schema';
import { isObjectivesNumberInStatus, ObjectiveActions, objectivesMetaSelector } from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { Status } from 'config/enum';
import { SuccessModal } from '../Modal/SuccessModal';
import useObjectives from '../../hooks/useObjectives';
import useObjectivesSchema from '../../hooks/useObjectiveSchema';
import { ObjectiveModal } from './ObjectiveModal';

export type CreateUpdateObjectivesModalProps = {
  onClose: () => void;
  editNumber?: number;
};

type Props = HTMLProps<HTMLInputElement> & CreateUpdateObjectivesModalProps;

export const CreateUpdateObjectives: FC<Props> = ({ onClose, editNumber = null }) => {
  const dispatch = useDispatch();
  const [origin, objectives] = useObjectives();
  const [schema] = useObjectivesSchema();

  const [currentObjectiveNumber, setObjectiveNumber] = useState(editNumber ? editNumber : 1);

  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const markupMin = markup.min > origin.length ? markup.min : origin.length;
  const titles = [...Array(markupMin).keys()].map((key) => `Objective ${key + 1}`);
  const formElements = components.filter((component) => component.type != 'text');
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});
  const stateObjective = objectives[currentObjectiveNumber]
    ? objectives[currentObjectiveNumber]
    : formElementsFilledEmpty;

  const yepSchema = formElements.reduce(createYupSchema, {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });
  const { getValues, handleSubmit, reset } = methods;
  const formValues = getValues();
  const isAllObjectivesByNumberPending = useSelector(
    isObjectivesNumberInStatus(
      Status.WAITING_FOR_APPROVAL,
      Array.from(Array(markup.min), (_, i) => i + 1),
    ),
  );

  const onSubmit = async (data) => {
    if (!origin[currentObjectiveNumber - 1]) {
      origin[currentObjectiveNumber - 1] = { number: currentObjectiveNumber, status: Status.WAITING_FOR_APPROVAL };
    }
    const updatedObjectives = origin.map((objective) => {
      if (currentObjectiveNumber === Number(objective.number)) {
        return {
          ...objective,
          status: Status.WAITING_FOR_APPROVAL,
          properties: {
            mapJson: data,
          },
        };
      }
      return { ...objective, status: Status.WAITING_FOR_APPROVAL };
    });
    dispatch(
      ObjectiveActions.updateObjectives({
        performanceCycleUuid: '',
        colleagueUuid: '',
        origin: updatedObjectives,
      }),
    );
  };
  const onSaveDraft = () => {
    const data = getValues();
    if (!origin[currentObjectiveNumber - 1]) {
      origin[currentObjectiveNumber - 1] = { number: currentObjectiveNumber, status: Status.DRAFT };
    }

    const updatedObjectives = origin.map((objective) => {
      if (currentObjectiveNumber === objective.number) {
        return {
          ...objective,
          status: Status.DRAFT,
          properties: {
            mapJson: data,
          },
        };
      }
      return { ...objective, status: Status.DRAFT };
    });
    dispatch(
      ObjectiveActions.updateObjectives({
        performanceCycleUuid: '',
        colleagueUuid: '',
        origin: updatedObjectives,
      }),
    );
  };
  const setNextObjectiveNumber = async (data) => {
    if (!origin[currentObjectiveNumber - 1]) {
      origin[currentObjectiveNumber - 1] = { number: currentObjectiveNumber, status: Status.DRAFT };
    }
    const updatedObjectives = origin.map((objective) => {
      if (currentObjectiveNumber === Number(objective.number)) {
        return {
          ...objective,
          number: currentObjectiveNumber,
          status: Status.DRAFT,
          properties: {
            mapJson: data,
          },
        };
      }
      return { ...objective, status: Status.DRAFT };
    });
    dispatch(
      ObjectiveActions.updateObjectives({
        performanceCycleUuid: '',
        colleagueUuid: '',
        origin: updatedObjectives,
      }),
    );

    setObjectiveNumber(currentObjectiveNumber + 1);
  };
  const setPrevObjectiveNumber = async () => {
    setObjectiveNumber(currentObjectiveNumber - 1);
  };

  useEffect(() => {
    reset(stateObjective);
  }, [currentObjectiveNumber]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: objectivesLoaded } = useSelector(objectivesMetaSelector);
  if (isAllObjectivesByNumberPending && schemaLoaded && objectivesLoaded) {
    return <SuccessModal onClose={onClose} />;
  }

  return (
    <ObjectiveModal
      titles={titles}
      formValues={formValues}
      schemaComponents={components}
      methods={methods}
      currentObjectiveNumber={currentObjectiveNumber}
      useSingleStep={false}
      submitForm={markupMin === currentObjectiveNumber}
      setPrevObjectiveNumber={setPrevObjectiveNumber}
      onSaveDraft={onSaveDraft}
      onSubmit={handleSubmit(onSubmit)}
      setNextObjectiveNumber={() => handleSubmit(setNextObjectiveNumber)()}
      onClose={onClose}
    />
  );
};
