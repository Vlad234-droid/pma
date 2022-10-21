import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  colleagueCurrentCycleSelector,
  Component,
  currentUserSelector,
  getReviewByTypeSelector,
  getReviewSchema,
  getTimelineByReviewTypeSelector,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  uuidCompareSelector,
} from '@pma/store';

import { useTranslation } from 'components/Translation';
import { useSelector } from 'react-redux';
import { Status, ReviewType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';
import { USER } from 'config/constants';
import { Review } from 'config/types';
import { useUploadReviewFiles } from './hook';
import { FileMetadata, ReviewFormType } from './type';
import Spinner from 'components/Spinner';
import SuccessModal from 'components/SuccessModal';
import ReviewForm from './components/ReviewForm';

export type FormPropsType = {
  onSubmit: (data: any) => void;
  onSaveDraft: (data: any) => void;
  onClose: () => void;
  reviewType: ReviewType.MYR | ReviewType.EYR;
  readonly?: boolean;
  components: any;
  review: Review;
  metadata: FileMetadata[];
  handleAddFiles: (file: File) => void;
  handleDeleteFiles: (name: string) => void;
};

const MyReview: FC<ReviewFormType> = ({ reviewType, onClose }) => {
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const { info } = useSelector(currentUserSelector);
  const colleagueUuid = info.colleagueUUID;
  const isUserView = useSelector(uuidCompareSelector(uuid));

  const [successModal, setSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const review: Review = useSelector(getReviewByTypeSelector(reviewType)) || {};
  const { files, metadata, handleDeleteFiles, handleAddFiles } = useUploadReviewFiles({
    colleagueUuid,
    reviewUuid: review?.uuid,
  });
  //
  const { loading: reviewLoading, loaded: reviewLoaded, saving, saved } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const schema = useSelector(getReviewSchema(reviewType));
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType, USER.current)) || ({} as any);

  const status = Object.keys(timelineReview?.statistics || { STARTED: 1 })[0] as Status;

  const readonly = (uuid && !isUserView) || [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(status);

  const { components = [] as Component[] } = schema;

  useEffect(() => {
    if (!successModal && saved) {
      dispatch(ReviewsActions.updateReviewMeta({ saved: false }));
      onClose();
    }
  }, [saved, successModal]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: currentCycle } }));
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, [currentCycle]);

  const handleSaveDraft = (data) => {
    if (review?.uuid) {
      dispatch(
        ReviewsActions.updateReviews({
          pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: currentCycle },
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
          pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: currentCycle, number: 1 },
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
  };

  const handleSubmitData = async (data) => {
    if (review?.uuid) {
      dispatch(
        ReviewsActions.updateReviews({
          pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: currentCycle },
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
          pathParams: { colleagueUuid, code: timelineReview.code, cycleUuid: currentCycle, number: 1 },
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
    setSuccessModal(true);
  };

  if (reviewLoading || schemaLoading || saving) {
    return <Spinner fullHeight />;
  }

  if (!schemaLoaded || !reviewLoaded) return null;

  if (successModal) {
    return (
      <SuccessModal
        title='Review sent'
        onClose={onClose}
        description={t(
          `${timelineReview?.code?.toLowerCase()}_review_sent_to_manager`,
          'Your review has been sent to your line manager.',
        )}
      />
    );
  }
  return (
    <ReviewForm
      onClose={onClose}
      readonly={readonly}
      components={components}
      review={review}
      onSaveDraft={handleSaveDraft}
      onSubmit={handleSubmitData}
      reviewType={reviewType}
      metadata={metadata}
      handleDeleteFiles={handleDeleteFiles}
      handleAddFiles={handleAddFiles}
    />
  );
};

export default MyReview;
