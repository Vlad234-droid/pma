import React, { FC, HTMLProps, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ObjectiveModal } from '../ObjectiveModal';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'components/Translation';
import {
  currentUserSelector,
  FormType,
  getNextReviewNumberSelector,
  getReviewPropertiesSelector,
  ReviewsActions,
  reviewsMetaSelector,
} from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { ReviewType, Status } from 'config/enum';
import useReviewSchema from '../../hooks/useReviewSchema';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

export type CreateUpdateObjectiveModalProps = {
  onClose: () => void;
  editNumber?: number;
};

type Props = HTMLProps<HTMLInputElement> & CreateUpdateObjectiveModalProps;

const CreateUpdateObjective: FC<Props> = ({ onClose, editNumber = null }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const { info } = useSelector(currentUserSelector);

  const pathParams = { colleagueUuid: info.colleagueUUID, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };

  const objectives = useSelector(getReviewPropertiesSelector(ReviewType.OBJECTIVE));
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE);

  const nextNumber = useSelector(getNextReviewNumberSelector(ReviewType.OBJECTIVE));
  const currentObjectiveNumber = editNumber ? editNumber : nextNumber;

  const { components = [], display: newSchemaVersion } = schema;
  const formElements = newSchemaVersion
    ? components
        .flatMap((e) => e?.components || e)
        .filter((e) => [FormType.TEXT_FIELD, FormType.TEXT_AREA, FormType.SELECT].includes(e?.type))
    : components.filter((component) => component.type != 'text');
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});
  const stateObjective = objectives[currentObjectiveNumber]
    ? objectives[currentObjectiveNumber]
    : formElementsFilledEmpty;

  const yepSchema = formElements.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });
  const { getValues, handleSubmit, reset } = methods;
  const formValues = getValues();

  const onSubmit = async (data) => {
    const currentObjective = {
      number: currentObjectiveNumber,
      status: Status.WAITING_FOR_APPROVAL,
      properties: { ...data },
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
  const onSaveDraft = () => {
    const data = getValues();
    const currentObjective = {
      number: currentObjectiveNumber,
      status: Status.DRAFT,
      properties: { ...data },
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

export default CreateUpdateObjective;
