import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, fontWeight, useStyle } from '@dex-ddl/core';
import { colleagueUUIDSelector, ReviewsActions, reviewsMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';

import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Trans } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import { ReviewType, Status } from 'config/enum';
import { Employee } from 'config/types';

import ApproveModal from '../ApproveModal';
import DeclineModal from '../DeclineModal';
import { filterApprovedFn } from '../../utils';
import SuccessModal from '../SuccessModal/SuccessModal';

export type WidgetObjectiveApprovalProps = {
  isDisabled?: boolean;
  reviewsForApproval: Employee[];
  onSave: () => void;
};

export const WidgetObjectiveApproval: FC<WidgetObjectiveApprovalProps> = ({
  isDisabled = false,
  reviewsForApproval,
  onSave,
}) => {
  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);
  const [declines, setDeclines] = useState<(string | null)[]>([]);
  const [currentReview, setCurrentReview] = useState<Employee | null>(null);
  const currentTimeline = currentReview?.timeline.filter(filterApprovedFn);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loaded } = useSelector(reviewsMetaSelector);
  const [reviewSubmitted, setReviewSubmitted] = useState<Status | null>(null);
  const [reviewType, setReviewType] = useState<ReviewType | null>(null);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
  const [allReviewsProcessed, setAllReviewsProcessed] = useState<boolean>(false);

  const { css, theme } = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviewSubmitted && loaded && allReviewsProcessed) {
      setIsOpenSuccessModal(true);
    }
  }, [loaded, reviewSubmitted, allReviewsProcessed]);

  useEffect(() => {
    if (declines.length && declines.length === reviewsForApproval.length) {
      // if there is at least one declined entity
      if (declines.some((decline) => decline !== null)) {
        declineColleagues(declines);
      } else {
        // in other case, clear declines to start again
        setDeclines([]);
      }
    }
  }, [declines, reviewsForApproval]);

  const handleDeclineBtnClick = () => {
    setIsOpenDeclinePopup(true);
    setCurrentReview(reviewsForApproval[0]);
  };

  const handleApproveBtnClick = () => {
    setIsOpenApprovePopup(true);
    setCurrentReview(reviewsForApproval[0]);
  };

  const handleDeclineSubmit = useCallback(
    (hasReason?: boolean, reason?: string) => {
      if (declines.length + 1 < reviewsForApproval.length) {
        setCurrentReview(reviewsForApproval[declines.length + 1]);
        setIsOpenDeclinePopup(false);
        setIsOpenDeclinePopup(true);
      } else {
        setIsOpenDeclinePopup(false);
      }

      !hasReason && setDeclines((declines) => [...declines, '']);

      hasReason && reason && setDeclines((declines) => [...declines, reason]);
    },
    [reviewsForApproval, declines],
  );

  const handleDeclineClose = useCallback(() => {
    if (reviewsForApproval.length === declines.length + 1) {
      // if all reviews were opened already, close popup
      setIsOpenDeclinePopup(false);
      setCurrentReview(null);
    } else {
      // update currentReview with next one
      setCurrentReview(reviewsForApproval[declines.length + 1]);
    }

    setDeclines((declines) => [...declines, null]); // set empty decline
  }, [reviewsForApproval, declines]);

  const handleApproveSubmit = () => {
    approveColleagues();
    setIsOpenApprovePopup(false);
  };

  const updateReviewStatus = useCallback(
    (status: Status) => (reasons?: (string | null)[]) => {
      reviewsForApproval?.forEach((colleague, index) => {
        const currentTimeline = colleague?.timeline.filter(filterApprovedFn);

        if ((reasons && !reasons[index] && currentTimeline![0].reviewType === ReviewType.OBJECTIVE) || !currentTimeline)
          return;

        const [timeline] = currentTimeline || [];
        const update = {
          pathParams: {
            colleagueUuid: colleague.uuid,
            approverUuid: colleagueUuid,
            type: timeline.reviewType,
            cycleUuid: 'CURRENT',
            status,
          },
          ...(timeline.reviewType !== ReviewType.MYR  ? {
            data: {
              ...(reasons ? { reason: reasons[index] as string } : {}),
              status,
              colleagueUuid: colleague.uuid,
              reviews: colleague.reviews.filter(({ status }) => status === Status.WAITING_FOR_APPROVAL),
            }
          } : {}),
        };

        dispatch(ReviewsActions.updateReviewStatus(update));
        setReviewSubmitted(status);
        setReviewType(currentTimeline![0].reviewType);

        onSave();
        // clean declines after submit
        setDeclines([]);
        setCurrentReview(null);
      });

      setAllReviewsProcessed(true);
    },
    [reviewsForApproval],
  );

  const approveColleagues = updateReviewStatus(Status.APPROVED);
  const declineColleagues = updateReviewStatus(Status.DECLINED);

  const handleCloseSuccessModal = () => {
    setReviewSubmitted(null);
    setReviewType(null);
    setIsOpenSuccessModal(false);
  };

  return (
    <>
      <TileWrapper>
        <div className={css({ textAlign: 'center', padding: '24px' }, isDisabled ? { opacity: '0.4' } : {})}>
          <div
            className={css({
              display: 'block',
              fontSize: '20px',
              lineHeight: '24px',
              paddingBottom: '10px',
              fontWeight: fontWeight.bold,
            })}
          >
            Approve or decline colleague’s objectives or reviews
          </div>
          <div
            className={css({
              justifyContent: 'center',
              display: 'flex',
            })}
          >
            <div className={css({ display: 'inline-block' })}>
              <Button
                isDisabled={isDisabled}
                styles={[
                  {
                    background: theme.colors.white,
                    border: `1px solid ${theme.colors.tescoBlue}`,
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: 'bold',
                    color: `${theme.colors.tescoBlue}`,
                    margin: '0px 4px',
                  },
                  isDisabled ? { opacity: '0.6' } : {},
                ]}
                onPress={handleDeclineBtnClick}
              >
                <Icon graphic='decline' iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='decline'>Decline</Trans>
              </Button>
            </div>
            <div className={css({ display: 'inline-block' })}>
              <Button
                isDisabled={isDisabled}
                styles={[
                  {
                    background: `${theme.colors.tescoBlue}`,
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: 'bold',
                    margin: '0px 4px 1px 4px',
                  },
                ]}
                onPress={handleApproveBtnClick}
              >
                <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='approve'>Approve</Trans>
              </Button>
            </div>
            {isOpenDeclinePopup && currentTimeline && (
              <DeclineModal
                onSave={handleDeclineSubmit}
                onClose={handleDeclineClose}
                review={currentReview || undefined}
                reviewType={currentTimeline[0].reviewType}
              />
            )}
            {isOpenApprovePopup && (
              <ApproveModal onSave={handleApproveSubmit} onClose={() => setIsOpenApprovePopup(false)} />
            )}
          </div>
        </div>
      </TileWrapper>
      {isOpenSuccessModal && (
        <SuccessModal
          status={reviewSubmitted as Status.DECLINED | Status.APPROVED}
          review={reviewType as ReviewType}
          onClose={handleCloseSuccessModal}
        />
      )}
    </>
  );
};
