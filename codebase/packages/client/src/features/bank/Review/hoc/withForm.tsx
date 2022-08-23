import React, { useEffect, useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  colleagueUUIDSelector,
  Component,
  filterReviewsByTypeSelector,
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
import { Review, Timeline } from 'config/types';
import { useUploadReviewFiles } from '../hook';
import { FileMetadata, ReviewFormType } from '../type';

export type FormPropsType = {
  reviewLoading: boolean;
  schemaLoading: boolean;
  successModal: boolean;
  readonly: boolean;
  timelineReview: Timeline;
  methods: UseFormReturn;
  components: any[];
  review: Review;
  handleSaveDraft: () => void;
  handleSubmit: () => void;
  metadata: FileMetadata[];
  handleAddFiles: (file: File) => void;
  handleDeleteFiles: (name: string) => void;
};

export function withForm<P extends ReviewFormType>(WrappedComponent: React.ComponentType<P & FormPropsType>) {
  const Component = (props: P) => {
    const { reviewType, onClose } = props;

    const { t } = useTranslation();
    const [successModal, setSuccessModal] = useState(false);
    const colleagueUuid = useSelector(colleagueUUIDSelector);
    const dispatch = useDispatch();
    const [review]: Review[] = useSelector(filterReviewsByTypeSelector(reviewType));
    const reviewUuid = review?.uuid;
    const reviewProperties = review?.properties || {};

    const { files, metadata, handleDeleteFiles, handleAddFiles } = useUploadReviewFiles({ colleagueUuid, reviewUuid });

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
      defaultValues: reviewProperties,
    });

    const { getValues, handleSubmit, reset, watch, setValue } = methods;

    const handleSaveDraft = () => {
      const data = getValues();
      if (review?.uuid) {
        dispatch(
          ReviewsActions.updateReviews({
            pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: 'CURRENT' },
            data: [
              {
                status: Status.DRAFT,
                properties: { ...data },
              },
            ],
            files,
            metadata: { uploadMetadataList: metadata },
          }),
        );
      } else {
        dispatch(
          ReviewsActions.createReview({
            pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: 'CURRENT', number: 1 },
            data: [
              {
                status: Status.DRAFT,
                properties: { ...data },
              },
            ],
            files,
            metadata: { uploadMetadataList: metadata },
          }),
        );
      }
      onClose();
    };

    const onSubmit = async (data) => {
      if (review?.uuid) {
        dispatch(
          ReviewsActions.updateReviews({
            pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: 'CURRENT' },
            data: [
              {
                status: Status.WAITING_FOR_APPROVAL,
                properties: { ...data },
              },
            ],
            files,
            metadata: { uploadMetadataList: metadata },
          }),
        );
      } else {
        dispatch(
          ReviewsActions.createReview({
            pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: 'CURRENT', number: 1 },
            data: [
              {
                status: Status.WAITING_FOR_APPROVAL,
                properties: { ...data },
              },
            ],
            files,
            metadata: { uploadMetadataList: metadata },
          }),
        );
      }
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
      dispatch(ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid, cycleUuid: 'CURRENT' } }));
      dispatch(SchemaActions.getSchema({ colleagueUuid, includeForms: true }));
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
      if (overallRatingRequestKey && reviewProperties?.[overallRatingRequestKey]) {
        setValue(overallRatingRequestKey, reviewProperties[overallRatingRequestKey]);
      }
    }, [reviewUpdated, reviewProperties, overallRatingRequestKey]);

    useEffect(() => {
      if (reviewLoaded && schemaLoaded && reviewProperties) {
        reset(reviewProperties);
      }
    }, [reviewLoaded, schemaLoaded]);

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
        review={review}
        handleSaveDraft={handleSaveDraft}
        handleSubmit={handleSubmit(onSubmit)}
        metadata={metadata}
        handleDeleteFiles={handleDeleteFiles}
        handleAddFiles={handleAddFiles}
      />
    );
  };
  return Component;
}
