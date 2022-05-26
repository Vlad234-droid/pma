import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Component,
  ExpressionValueType,
  getExpressionRequestKey,
  getReviewByTypeSelector,
  getReviewSchema,
  reviewsMetaSelector,
} from '@pma/store';

import ReviewComponents from 'features/Objectives/components/Modal/ReviewFormModal/ReviewComponents';
import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';

import { createYupSchema } from 'utils/yup';
import { ReviewType } from 'config/enum';

export const ReviewForm: FC<{ reviewType: ReviewType; id: number }> = ({ reviewType, id }) => {
  const { t } = useTranslation();
  const [review] = useSelector(getReviewByTypeSelector(reviewType));

  const formValues = review || {};
  const { loaded: reviewLoaded, updated: reviewUpdated } = useSelector(reviewsMetaSelector);

  const schema = useSelector(getReviewSchema(reviewType));

  const overallRatingRequestKey: string = useSelector(
    getExpressionRequestKey(reviewType)(ExpressionValueType.OVERALL_RATING),
  );
  const { components = [] as Component[] } = schema;

  const yepSchema = components.reduce(createYupSchema(t), {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues: formValues,
  });
  const { reset, setValue } = methods;

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
    <TileWrapper
      boarder={true}
      //TODO: Temporary solution, need check accordion items height
      customStyle={{ padding: '16px', marginBottom: '20px', minHeight: !id ? '600px' : '800px' }}
    >
      <ReviewComponents components={components} review={formValues} methods={methods} readonly={true} />
    </TileWrapper>
  );
};
