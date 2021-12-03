import React, { FC, HTMLProps, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ObjectiveModal } from './ObjectiveModal';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  currentUserSelector,
  getNextReviewNumberSelector,
  getReviewPropertiesSelector,
  ReviewsActions,
  reviewsMetaSelector,
} from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { ReviewType, Status } from 'config/enum';
import useReviews from '../../hooks/useReviews';
import useReviewSchema from '../../hooks/useReviewSchema';

export type CreateUpdateObjectiveModalProps = {
  onClose: () => void;
  editNumber?: number;
};

type Props = HTMLProps<HTMLInputElement> & CreateUpdateObjectiveModalProps;

export const CreateUpdateObjective: FC<Props> = ({ onClose, editNumber = null }) => {
  const dispatch = useDispatch();
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { info } = useSelector(currentUserSelector);

  const pathParams = { colleagueUuid: info.colleagueUUID, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };

  const [origin] = useReviews({ pathParams });
  const objectives = useSelector(getReviewPropertiesSelector(ReviewType.OBJECTIVE));
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE);

  const nextNumber = useSelector(getNextReviewNumberSelector(ReviewType.OBJECTIVE));
  const currentObjectiveNumber = editNumber ? editNumber : nextNumber;

  const { components = [] } = schema;
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
    const currentObjective = {
      number: currentObjectiveNumber,
      status: Status.WAITING_FOR_APPROVAL,
      properties: {
        mapJson: data,
      },
    };
    if (objectives[currentObjectiveNumber]) {
      dispatch(
        ReviewsActions.updateReview({
          pathParams: { ...pathParams, number: currentObjectiveNumber },
          data: [currentObjective],
        }),
      );
    } else {
      dispatch(
        ReviewsActions.createReview({
          pathParams: { ...pathParams, number: currentObjectiveNumber },
          data: [currentObjective],
        }),
      );
    }
  };
  const onSaveDraft = () => {
    const data = getValues();
    const currentObjective = {
      number: currentObjectiveNumber,
      status: Status.DRAFT,
      properties: {
        mapJson: data,
      },
    };
    if (objectives[currentObjectiveNumber]) {
      dispatch(
        ReviewsActions.updateReview({
          pathParams: { ...pathParams, number: currentObjectiveNumber },
          data: [currentObjective],
        }),
      );
    } else {
      dispatch(
        ReviewsActions.createReview({
          pathParams: { ...pathParams, number: currentObjectiveNumber },
          data: [currentObjective],
        }),
      );
    }
    onClose();
  };

  useEffect(() => {
    reset(stateObjective);
  }, [currentObjectiveNumber, reviewLoaded]);

  return (
    <ObjectiveModal
      formValues={formValues}
      schemaComponents={components}
      methods={methods}
      currentObjectiveNumber={currentObjectiveNumber}
      useSingleStep={true}
      submitForm={true}
      onSaveDraft={onSaveDraft}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    />
  );
};
