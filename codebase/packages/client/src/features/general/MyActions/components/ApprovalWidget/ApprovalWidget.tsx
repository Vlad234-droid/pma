import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, ReviewsActions } from '@pma/store';
import { Employee, ReviewType, Status } from 'config/types';
import { getEmployeeTimeline } from 'features/general/MyActions/utils';
import { useTranslation } from 'components/Translation';
import Approval from 'components/Approval';
import { useTenant } from 'features/general/Permission';
import useDispatch from 'hooks/useDispatch';
import { ApproveModal, DeclineModal } from '../Modal';
import { useSuccessModalContext } from '../../context/successModalContext';
import { Tenant } from 'utils';

type Props = {
  isDisabled: boolean;
  reviews: any;
  onSave: () => void;
};

const ApprovalWidget: FC<Props> = ({ isDisabled, reviews, onSave }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tenant = useTenant();
  const { setOpened: setIsOpenSuccessModal } = useSuccessModalContext();

  const [isOpenDecline, toggleOpenDecline] = useState(false);
  const [isOpenApprove, toggleOpenApprove] = useState(false);
  const [declines, setDeclines] = useState<(string | null)[]>([]);
  const [currentReview, setCurrentReview] = useState<Employee | null>(null);
  const currentTimeline = currentReview ? getEmployeeTimeline(currentReview) : [];

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [allReviewsProcessed, setAllReviewsProcessed] = useState<boolean>(false);

  useEffect(() => {
    if (allReviewsProcessed) {
      setIsOpenSuccessModal(true);
    }
  }, [allReviewsProcessed]);

  useEffect(() => {
    if (declines.length && declines.length === reviews.length) {
      // if there is at least one declined entity
      if (declines.some((decline) => decline !== null)) {
        declineColleagues(declines);
      } else {
        // in other case, clear declines to start again
        setDeclines([]);
      }
    }
  }, [declines, reviews]);

  const handleDecline = () => {
    toggleOpenDecline(true);
    setCurrentReview(reviews[0]);
  };

  const handleApprove = () => {
    toggleOpenApprove(true);
    setCurrentReview(reviews[0]);
  };

  const handleDeclineSubmit = useCallback(
    (hasReason?: boolean, reason?: string) => {
      if (declines.length + 1 < reviews.length) {
        setCurrentReview(reviews[declines.length + 1]);
        toggleOpenDecline(true);
      } else {
        toggleOpenDecline(false);
      }

      !hasReason && setDeclines((declines) => [...declines, '']);

      hasReason && reason && setDeclines((declines) => [...declines, reason]);
    },
    [reviews, declines],
  );

  const handleDeclineClose = useCallback(() => {
    if (reviews.length === declines.length + 1) {
      // if all reviews were opened already, close popup
      toggleOpenDecline(false);
      setCurrentReview(null);
    } else {
      // update currentReview with next one
      setCurrentReview(reviews[declines.length + 1]);
    }

    setDeclines((declines) => [...declines, null]); // set empty decline
  }, [reviews, declines]);

  const handleApproveSubmit = () => {
    approveColleagues();
    toggleOpenApprove(false);
  };

  const updateReviewStatus = useCallback(
    (status: Status) => (reasons?: (string | null)[]) => {
      reviews?.forEach((colleague, index) => {
        const currentTimeline = getEmployeeTimeline(colleague);

        if ((reasons && !reasons[index] && currentTimeline![0].reviewType === ReviewType.OBJECTIVE) || !currentTimeline)
          return;

        const [timeline] = currentTimeline || [];
        const update = {
          pathParams: {
            colleagueUuid: colleague.uuid,
            approverUuid: colleagueUuid,
            code: timeline.code,
            cycleUuid: 'CURRENT',
            status,
          },
          data: {
            ...(reasons ? { reason: reasons[index] as string } : {}),
            status,
            colleagueUuid: colleague.uuid,
            reviews: colleague.reviews.filter(
              ({ status, type }) => status === Status.WAITING_FOR_APPROVAL && type === timeline.reviewType,
            ),
          },
        };

        // @ts-ignore
        dispatch(ReviewsActions.updateReviewStatus(update));

        onSave();
        // clean declines after submit
        setDeclines([]);
        setCurrentReview(null);
      });

      setAllReviewsProcessed(true);
    },
    [reviews],
  );

  const approveColleagues = updateReviewStatus(Status.APPROVED);
  const declineColleagues = updateReviewStatus(Status.DECLINED);

  return (
    <>
      <Approval
        text={t(
          'approve_or_decline_review',
          tenant === Tenant.GENERAL
            ? 'Approve or decline colleague’s objectives or reviews'
            : "Approve or request amend colleague's priorities or reviews",
          {
            ns: tenant,
          },
        )}
        onApprove={handleApprove}
        onDecline={handleDecline}
        isActive={!isDisabled}
      />
      {isOpenDecline && (
        <DeclineModal
          onSave={handleDeclineSubmit}
          onClose={handleDeclineClose}
          review={currentReview || undefined}
          code={currentTimeline?.[0]?.code}
        />
      )}
      {isOpenApprove && <ApproveModal onSave={handleApproveSubmit} onClose={() => toggleOpenApprove(false)} />}
    </>
  );
};

export default ApprovalWidget;
