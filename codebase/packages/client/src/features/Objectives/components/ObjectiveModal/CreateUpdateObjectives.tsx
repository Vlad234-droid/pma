import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Page } from 'pages';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { schemaMetaSelector } from '@pma/store/src/selectors/schema';
import {
  currentUserSelector,
  getReviewPropertiesSelector,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
} from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { ReviewType, Status } from 'config/enum';
import { SuccessModal } from '../Modal';
import useReviewSchema from '../../hooks/useReviewSchema';
import useReviews from '../../hooks/useReviews';
import { ObjectiveModal } from './ObjectiveModal';

export type CreateUpdateObjectivesModalProps = {
  onClose: () => void;
  editNumber?: number;
};

type Props = HTMLProps<HTMLInputElement> & CreateUpdateObjectivesModalProps;

export const CreateUpdateObjectives: FC<Props> = ({ onClose, editNumber = null }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { info } = useSelector(currentUserSelector);
  const pathParams = { colleagueUuid: info.colleagueUUID, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };

  const [origin] = useReviews({ pathParams });
  const objectives = useSelector(getReviewPropertiesSelector(ReviewType.OBJECTIVE));
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE);
  const timelineObjective = useSelector(getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE));

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
    dispatch(ReviewsActions.updateReviews({ pathParams, data: updatedObjectives }));
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
    dispatch(ReviewsActions.updateReviews({ pathParams, data: updatedObjectives }));
    onClose();
    history.push(Page.OBJECTIVES_VIEW);
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
    dispatch(ReviewsActions.updateReviews({ pathParams, data: updatedObjectives }));

    setObjectiveNumber(currentObjectiveNumber + 1);
  };
  const setPrevObjectiveNumber = async () => {
    setObjectiveNumber(currentObjectiveNumber - 1);
  };

  useEffect(() => {
    reset(stateObjective);
  }, [currentObjectiveNumber, reviewLoaded]);

  if (timelineObjective?.status === Status.WAITING_FOR_APPROVAL && schemaLoaded && reviewLoaded) {
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
