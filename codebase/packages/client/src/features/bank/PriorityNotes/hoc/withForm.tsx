import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Page } from 'pages';
import {
  colleagueUUIDSelector,
  getAllReviews,
  getPriorityNoteByUuid,
  priorityNotesMetaSelector,
  getReviewsWithoutPriorityNote,
  PriorityNotesActions,
  ReviewsActions,
  reviewsMetaSelector,
} from '@pma/store';
import { useTranslation } from 'components/Translation';
import { NotesStatus } from 'features/general/Notes/configs';
import { buildPath } from 'features/general/Routes';
import useDispatch from 'hooks/useDispatch';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { createSchemmaPriorityNote } from '../config/schema';
import { Priority } from '../config/types';
import { Status } from 'config/enum';

export enum FormState {
  SELECT_PRIORITY = 'SELECT_PRIORITY',
  PROVIDE_NOTE = 'PROVIDE_NOTE',
}

export enum FormType {
  NEW = 'NEW',
  EDIT = 'EDIT',
}

export type Props = {
  formType: FormType;
};

export type FormPropsType = {
  methods: UseFormReturn;
  success: boolean;
  loading: boolean;
  formState: FormState;
  formType: FormType;
  priorities: Priority[];
  priority?: Priority;
  onSubmit: (T) => void;
  onNext: (T) => void;
  onPrevious: () => void;
  onClose: () => void;
};

export function withForm<P extends Props>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { formType } = props;
    const { uuid, noteUuid } = useParams<{ uuid: string; noteUuid: string }>();
    const { loading: reviewLoading } = useSelector(reviewsMetaSelector);
    const { loading: noteLoading, success } = useSelector(priorityNotesMetaSelector);
    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const reviews = useSelector(getAllReviews) || [];
    const note = useSelector((state) => getPriorityNoteByUuid(state, noteUuid));
    const schema = useMemo(() => createSchemmaPriorityNote(t), [t]);
    const loading = reviewLoading || noteLoading;

    const [formState, setFormState] = useState<FormState>(FormState.SELECT_PRIORITY);
    const [timelinePointFilter, setTimelinePointFilter] = useState<string>('');
    const [priorityUuid, setPriorityUuid] = useState<string>('');

    const filteredReviews: Priority[] = useMemo(
      () =>
        reviews.filter(
          (review) =>
            (!timelinePointFilter || review.tlPointUuid === timelinePointFilter) &&
            (review.status === Status.APPROVED || review.status === Status.COMPLETED),
        ),
      [reviews],
    );

    const priorities: Priority[] = useSelector((state) => getReviewsWithoutPriorityNote(state, filteredReviews));
    const priority: Priority | undefined = useMemo(
      () => reviews.find((priority) => priority.uuid === priorityUuid),
      [reviews, priorityUuid],
    );

    const methods = useFormWithCloseProtection({
      mode: 'onChange',
      resolver: yupResolver<Yup.AnyObjectSchema>(schema),
      defaultValues: { content: note?.content } as Record<string, string>,
    });

    const { reset } = methods;

    useEffect(() => {
      if (note) reset(note);
    }, [note]);

    useEffect(() => {
      dispatch(PriorityNotesActions.clearPriorityNoteMeta());
      dispatch(ReviewsActions.clearReviewData());
      if (uuid && formType === FormType.EDIT) {
        dispatch(ReviewsActions.getReviewByUuid({ uuid: uuid }));
        dispatch(
          PriorityNotesActions.getPriorityNoteByOwnerUuid({ reviewUuid: uuid, ownerColleagueUuid: colleagueUuid }),
        );
        setPriorityUuid(uuid);
        setFormState(FormState.PROVIDE_NOTE);
      }
      if (uuid && formType === FormType.NEW) {
        dispatch(ReviewsActions.getReviewsWithNotes({ pathParams: { colleagueUuid, cycleUuid: 'CURRENT' } }));
        if (uuid !== 'new') setTimelinePointFilter(uuid);
      }
    }, [uuid, formType]);

    const handlePrevious = () => {
      if (formType === FormType.NEW) {
        setFormState(FormState.SELECT_PRIORITY);
        reset();
      } else {
        handleClose();
      }
    };

    const handleNext = (checked: string) => {
      setPriorityUuid(checked);
      setFormState(FormState.PROVIDE_NOTE);
    };

    const handleClose = () => {
      navigate(buildPath(Page.REVIEWS_VIEW));
    };

    const handleCreate = (data) => {
      const note = {
        reviewUuid: priorityUuid,
        ownerColleagueUuid: colleagueUuid,
        updateTime: new Date(),
        status: NotesStatus.CREATED,
        title: reviews.find((review) => review.uuid === priorityUuid)?.properties?.title,
        ...data,
      };
      dispatch(PriorityNotesActions.createPriorityNote(note));
    };

    const handleUpdate = (data) => {
      const note = {
        reviewUuid: priorityUuid,
        ownerColleagueUuid: colleagueUuid,
        updateTime: new Date(),
        status: NotesStatus.CREATED,
        title: reviews.find((review) => review.uuid === priorityUuid)?.properties?.tile,
        ...data,
      };
      dispatch(PriorityNotesActions.updatePriorityNote(note));
    };

    const handleSubmit = useCallback(formType === FormType.NEW ? handleCreate : handleUpdate, [formType, priorityUuid]);

    return (
      <WrappedComponent
        {...props}
        methods={methods}
        loading={loading}
        success={success}
        formState={formState}
        formType={formType}
        priorities={priorities}
        priority={priority}
        onSubmit={handleSubmit}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onClose={handleClose}
      />
    );
  };

  return Component;
}
