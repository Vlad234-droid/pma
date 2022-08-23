import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import {
  colleagueUUIDSelector,
  FormType,
  getReviewPropertiesSelector,
  isReviewsNumberInStatuses,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
} from '@pma/store';
import { ReviewType, Status } from 'config/enum';
import Spinner from 'components/Spinner';
import ObjectiveForm from './components/ObjectiveForm';
import useReviewSchema from './hooks/useReviewSchema';

export type Props = {
  onClose: () => void;
  editNumber: number;
  useSingleStep?: boolean;
};

const CreateUpdateObjectives: FC<Props> = ({ onClose, editNumber, useSingleStep }) => {
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [currentNumber, setCurrentNumber] = useState(editNumber);
  const { loaded: schemaLoaded, loading: schemaLoading } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);

  const pathParams = { colleagueUuid, code: 'OBJECTIVE', cycleUuid: 'CURRENT' };
  const isApproved = useSelector(isReviewsNumberInStatuses(ReviewType.OBJECTIVE)([Status.APPROVED], currentNumber));
  const isDeclined = useSelector(isReviewsNumberInStatuses(ReviewType.OBJECTIVE)([Status.DECLINED], currentNumber));

  const objectives = useSelector(getReviewPropertiesSelector(ReviewType.OBJECTIVE));
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE);

  const { components = [], display: newSchemaVersion, markup } = schema;
  const markupMin = markup?.min;

  useEffect(() => {
    if (editNumber !== currentNumber) setCurrentNumber(editNumber);
  }, [editNumber]);

  const formElements = newSchemaVersion
    ? components
        .flatMap((e) => e?.components || e)
        .filter((e) => [FormType.TEXT_FIELD, FormType.TEXT_AREA, FormType.SELECT].includes(e?.type))
    : components.filter((component) => component.type != 'text');

  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});

  const defaultValues = objectives[currentNumber] || formElementsFilledEmpty;
  const titles = [...Array(markupMin).keys()].map((key) => `Objective ${key + 1}`);

  const handleSuccess = () => {
    if (useSingleStep || markupMin <= currentNumber) {
      onClose();
    } else {
      setCurrentNumber((current) => ++current);
    }
  };

  const buildData = (data, status, single?: boolean) => {
    const currentObjective = {
      status,
      properties: { ...data },
    };
    if (single) {
      return [{ number: currentNumber, ...currentObjective }];
    }

    if (objectives[currentNumber]) {
      return [
        ...Object.values(objectives).map((properties: any, _, list) =>
          list.length === currentNumber ? currentObjective : { properties, status },
        ),
      ];
    }

    return [...Object.values(objectives).map((properties: any) => ({ properties, status })), currentObjective];
  };

  const saveData = (data: Array<any>) => {
    if (data.length > 1) {
      dispatch(
        ReviewsActions.updateReviews({
          pathParams,
          data,
        }),
      );
      return;
    }

    if (objectives[currentNumber]) {
      dispatch(
        ReviewsActions.updateReview({
          pathParams: { ...pathParams, number: currentNumber },
          data,
        }),
      );
    } else {
      dispatch(
        ReviewsActions.createReview({
          pathParams: { ...pathParams, number: currentNumber },
          data,
        }),
      );
    }
  };

  const handleSubmit = async (data) => {
    saveData(
      buildData(
        data,
        currentNumber >= markupMin || isApproved || isDeclined ? Status.WAITING_FOR_APPROVAL : Status.DRAFT,
        useSingleStep || markupMin !== currentNumber || isApproved || isDeclined,
      ),
    );
    handleSuccess();
  };

  const handleSaveDraft = (data: any) => {
    saveData(buildData(data, Status.DRAFT, true));
    onClose();
  };

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams }));
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, []);

  const handlePrev = () => setCurrentNumber((current) => Math.max(--current, 1));

  if (!schemaLoaded || !reviewLoaded) return null;
  if (schemaLoading || reviewLoading) return <Spinner fullHeight />;

  return (
    <ObjectiveForm
      key={currentNumber}
      formElements={formElements}
      schemaComponents={components}
      currentId={currentNumber}
      editMode={isApproved || isDeclined}
      multiply={!useSingleStep && markupMin >= currentNumber}
      isLastStep={currentNumber === markupMin}
      defaultValues={defaultValues}
      onSaveDraft={handleSaveDraft}
      onSubmit={handleSubmit}
      titles={titles}
      onClose={onClose}
      onPrev={handlePrev}
    />
  );
};

export default CreateUpdateObjectives;
