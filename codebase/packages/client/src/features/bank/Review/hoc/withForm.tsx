import React, { useEffect, useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Component,
  currentUserSelector,
  getReviewByTypeSelector,
  getReviewSchema,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
} from '@pma/store';
import { createYupSchema } from 'utils/yup';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'components/Translation';
import { useSelector } from 'react-redux';
import { Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';
import { USER } from 'config/constants';
import { ReviewFormType } from '../type';
import { Timeline } from 'config/types';

export type FormPropsType = {
  reviewLoading: boolean;
  schemaLoading: boolean;
  successModal: boolean;
  readonly: boolean;
  timelineReview: Timeline;
  methods: UseFormReturn;
  components: any[];
  review: Record<string, string>;
  handleSaveDraft: () => void;
  handleSubmit: () => void;
};

export function withForm<P extends ReviewFormType>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const { reviewType, onClose } = props;

    const { t } = useTranslation();
    const [successModal, setSuccessModal] = useState(false);
    const { info } = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const [review] = useSelector(getReviewByTypeSelector(reviewType));
    const formValues = review || {};
    const { loading: reviewLoading, loaded: reviewLoaded, updated: reviewUpdated } = useSelector(reviewsMetaSelector);
    const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
    const schema = useSelector(getReviewSchema(reviewType));
    // todo hardcoded. rewrite overallRatingRequestKey after merge
    const overallRatingListeners: string[] = ['what_rating', 'how_rating'];
    // todo hardcoded. rewrite getExpressionRequestKey after merge
    const overallRatingRequestKey = 'overall_rating';

    const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType, USER.current));
    const readonly = [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(timelineReview.summaryStatus);

    const { components = [] as Component[] } = schema;

    const yepSchema = components.reduce(createYupSchema(t), {});
    const methods = useFormWithCloseProtection({
      mode: 'onChange',
      resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
      defaultValues: formValues,
    });

    const { getValues, handleSubmit, reset, watch, setValue } = methods;

    const handleSaveDraft = () => {
      const data = getValues();
      dispatch(
        ReviewsActions.updateReviews({
          pathParams: { colleagueUuid: info.colleagueUUID, code: timelineReview.code, cycleUuid: 'CURRENT' },
          data: [
            {
              status: Status.DRAFT,
              properties: { ...data },
            },
          ],
        }),
      );
      onClose();
    };
    const onSubmit = async (data) => {
      dispatch(
        ReviewsActions.updateReviews({
          pathParams: { colleagueUuid: info.colleagueUUID, code: timelineReview.code, cycleUuid: 'CURRENT' },
          data: [
            {
              status: Status.WAITING_FOR_APPROVAL,
              properties: { ...data },
            },
          ],
        }),
      );
      reset();
      setSuccessModal(true);
    };

    const updateRatingReviewRequest = useCallback(
      (review) => {
        const permitToOverallRatingRequest = overallRatingListeners?.length
          ? overallRatingListeners?.every((listener) => review[listener])
          : false;
        if (permitToOverallRatingRequest) {
          const filteredData = Object.fromEntries(
            Object.entries(review).filter(([key]) => overallRatingListeners?.includes(key)),
          );
          dispatch(ReviewsActions.updateRatingReview({ type: reviewType, number: 1, fields: filteredData }));
        }
      },
      [overallRatingListeners],
    );

    useEffect(() => {
      dispatch(
        ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: info.colleagueUUID, cycleUuid: 'CURRENT' } }),
      );
      dispatch(SchemaActions.getSchema({ colleagueUuid: info.colleagueUUID }));
    }, []);

    useEffect(() => {
      const subscription = watch((review, { name = '' }) => {
        if (overallRatingListeners?.includes(name)) {
          updateRatingReviewRequest(review);
        }
      });
      return () => subscription.unsubscribe();
    }, [watch, reviewLoaded, schemaLoaded, overallRatingListeners]);

    useEffect(() => {
      if (overallRatingRequestKey && review?.[overallRatingRequestKey]) {
        setValue(overallRatingRequestKey, review[overallRatingRequestKey]);
      }
    }, [reviewUpdated, review, overallRatingRequestKey]);

    useEffect(() => {
      if (reviewLoaded && review) {
        reset(review);
      }
    }, [reviewLoaded]);

    return (
      <WrappedComponent
        {...props}
        reviewLoading={reviewLoading}
        schemaLoading={schemaLoading}
        timelineReview={timelineReview}
        successModal={successModal}
        readonly={readonly}
        methods={methods}
        components={components}
        review={formValues}
        handleSaveDraft={handleSaveDraft}
        handleSubmit={handleSubmit(onSubmit)}
      />
    );
  };
  return Component;
}
