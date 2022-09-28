import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, ReviewsActions } from '@pma/store';
import { Employee, ReviewType, Status } from 'config/types';
import { getEmployeeTimeline } from 'features/general/MyActions/utils';
import { useTranslation } from 'components/Translation';
import Approval from 'components/Approval';
import { useTenant } from 'features/general/Permission';
import useDispatch from 'hooks/useDispatch';
import { ApproveModal, DeclineModal, SavingModal } from '../Modal';
import { useSuccessModalContext } from '../../context/successModalContext';
import { Tenant } from 'utils';

type Props = {
  isDisabled: boolean;
  reviews: any;
  onSave: () => void;
};

enum Action {
  APPROVE = 'APPROVE',
  DECLINE = 'DECLINE',
}

const statusMap: Record<Action, Record<Status.WAITING_FOR_APPROVAL | Status.WAITING_FOR_COMPLETION, Status>> = {
  [Action.APPROVE]: {
    [Status.WAITING_FOR_APPROVAL]: Status.APPROVED,
    [Status.WAITING_FOR_COMPLETION]: Status.COMPLETED,
  },
  [Action.DECLINE]: {
    [Status.WAITING_FOR_APPROVAL]: Status.DECLINED,
    [Status.WAITING_FOR_COMPLETION]: Status.APPROVED,
  },
};

const ApprovalWidget: FC<Props> = ({ isDisabled, reviews, onSave }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tenant = useTenant();
  const { setOpened: setIsOpenSuccessModal, setStatusHistory } = useSuccessModalContext();

  const [isOpenDecline, toggleOpenDecline] = useState(false);
  const [isOpenApprove, toggleOpenApprove] = useState(false);
  const [declines, setDeclines] = useState<(string | null)[]>([]);
  const [currentReview, setCurrentReview] = useState<Employee | null>(null);
  const currentTimeline = currentReview ? getEmployeeTimeline(currentReview) : [];

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (processing && reviews.length === 0) {
      setProcessing(false);
      setIsOpenSuccessModal(true);
      onSave();
    }
  }, [processing, reviews]);

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
    (action: Action) => (reasons?: (string | null)[]) => {
      for (const [index, colleague] of reviews.entries()) {
        const timelines = getEmployeeTimeline(colleague);

        if ((reasons && !reasons[index] && timelines![0].reviewType === ReviewType.OBJECTIVE) || !timelines) break;

        for (const timeline of timelines) {
          const allowedStatuses = [Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_COMPLETION].filter(
            (status) => timeline?.statistics?.[status],
          );
          for (const allowedStatus of allowedStatuses) {
            const update = {
              pathParams: {
                colleagueUuid: colleague.uuid,
                approverUuid: colleagueUuid,
                code: timeline.code,
                cycleUuid: 'CURRENT',
                status: statusMap[action][allowedStatus],
              },
              data: {
                ...(reasons ? { reason: reasons[index] as string } : {}),
                status: statusMap[action][allowedStatus],
                colleagueUuid: colleague.uuid,
                reviews: colleague.reviews.filter(
                  ({ status, tlPointUuid }) => allowedStatus === status && tlPointUuid === timeline.uuid,
                ),
              },
            };
            // @ts-ignore
            dispatch(ReviewsActions.updateReviewStatus(update));
          }
        }
        // clean declines after submit
        setDeclines([]);
        setCurrentReview(null);
      }

      setStatusHistory({
        prevStatus: Status.WAITING_FOR_APPROVAL,
        status: statusMap[action][Status.WAITING_FOR_APPROVAL],
        type: null,
      });
      setProcessing(true);
    },
    [reviews],
  );

  const approveColleagues = updateReviewStatus(Action.APPROVE);
  const declineColleagues = updateReviewStatus(Action.DECLINE);

  return (
    <>
      <Approval
        text={t(
          'approve_or_decline_review',
          tenant === Tenant.GENERAL
            ? 'Approve or decline colleague’s objectives or reviews'
            : 'Agree, complete or request amend colleague’s priorities or reviews',
          {
            ns: tenant,
          },
        )}
        onApprove={handleApprove}
        onDecline={handleDecline}
        isActive={!isDisabled}
      />
      {processing && <SavingModal />}
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
