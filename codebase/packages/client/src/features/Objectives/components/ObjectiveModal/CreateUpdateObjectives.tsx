import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { TFunction, useTranslation } from 'components/Translation';
import { schemaMetaSelector } from '@pma/store/src/selectors/schema';
import {
  currentUserSelector,
  filterReviewsByTypeSelector,
  getReviewPropertiesSelector,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
} from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { ReviewType, Status } from 'config/enum';
import SuccessModal from 'components/SuccessModal';
import useReviewSchema from '../../hooks/useReviewSchema';
import { ObjectiveModal } from './ObjectiveModal';

type ObjectivesProps = {
  onClose: () => void;
  schema: any;
  objectives: any;
  origin: any;
  colleagueUUID: string;
  editNumber?: number;
};

const Objectives: FC<ObjectivesProps> = ({ colleagueUUID, schema, objectives, origin, onClose, editNumber = null }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pathParams = { colleagueUuid: colleagueUUID, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };

  const [currentObjectiveNumber, setObjectiveNumber] = useState(editNumber ? editNumber : 1);
  const [objectivesHashMap, setObjectiveHashMap] = useState(objectives);

  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const markupMin = markup.min;
  const titles = [...Array(markupMin).keys()].map((key) => `Objective ${key + 1}`);
  const formElements = components.filter((component) => component.type != 'text');
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});

  const stateObjective = objectivesHashMap[currentObjectiveNumber]
    ? objectivesHashMap[currentObjectiveNumber]
    : formElementsFilledEmpty;

  const yepSchema = formElements.reduce(createYupSchema(t), {});
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

    objectivesHashMap[currentObjectiveNumber] = getValues();
    setObjectiveHashMap(objectivesHashMap);
    dispatch(ReviewsActions.updateReviews({ pathParams, data: updatedObjectives }));
    setObjectiveNumber(currentObjectiveNumber + 1);
  };
  const setPrevObjectiveNumber = async () => {
    objectivesHashMap[currentObjectiveNumber] = getValues();
    setObjectiveHashMap(objectivesHashMap);
    setObjectiveNumber(currentObjectiveNumber - 1);
  };

  useEffect(() => {
    reset(stateObjective);
  }, [currentObjectiveNumber, origin.length]);

  useEffect(() => {
    if (objectives[currentObjectiveNumber] && !objectivesHashMap[currentObjectiveNumber]) {
      setObjectiveHashMap(objectives);
      reset(objectives[currentObjectiveNumber]);
    }
  }, [objectives, objectivesHashMap]);

  if (objectives[currentObjectiveNumber] && !objectivesHashMap[currentObjectiveNumber]) {
    return null;
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

export type CreateUpdateObjectivesModalProps = {
  onClose: () => void;
  editNumber?: number;
  t: TFunction;
};

const CreateUpdateObjectives: FC<CreateUpdateObjectivesModalProps> = ({ onClose, editNumber, t }) => {
  const dispatch = useDispatch();
  const { loaded: schemaLoaded, loading: schemaLoading } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { info } = useSelector(currentUserSelector);
  const pathParams = { colleagueUuid: info.colleagueUUID, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' };

  const origin = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE)) || [];
  const objectives = useSelector(getReviewPropertiesSelector(ReviewType.OBJECTIVE));
  const [schema] = useReviewSchema(ReviewType.OBJECTIVE);
  const timelineObjective = useSelector(getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE, 'me'));

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams }));
  }, []);

  if (timelineObjective?.status === Status.WAITING_FOR_APPROVAL && schemaLoaded && reviewLoaded) {
    return (
      <SuccessModal
        title={t('objectives_sent', 'Objectives sent')}
        onClose={onClose}
        description={t(
          'your_objectives_has_been_sent_to_your_line_manager',
          'Your objectives has been sent to your line manager.',
        )}
      />
    );
  }

  if ((!schemaLoaded && !reviewLoaded) || (reviewLoading && schemaLoading)) {
    return null;
  }

  return (
    <Objectives
      onClose={onClose}
      editNumber={editNumber}
      schema={schema}
      colleagueUUID={info.colleagueUUID}
      origin={origin}
      objectives={objectives}
    />
  );
};

export { CreateUpdateObjectives };
