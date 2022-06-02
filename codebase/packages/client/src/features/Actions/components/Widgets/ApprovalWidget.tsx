import React, { FC, useCallback, useEffect, useState } from 'react';
import { useStyle, Rule, CreateRule, Button } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, ReviewsActions } from '@pma/store';
import { Trans } from 'components/Translation/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Employee, ReviewType, Status } from 'config/types';
import { filterApprovedFn } from 'features/Actions/utils';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import { DeclineModal, ApproveModal } from '../Modal';
import { useSuccessModalContext } from '../../context/successModalContext';

type Props = {
  isDisabled: boolean;
  reviews: any;
  onSave: () => void;
};

export const ApprovalWidget: FC<Props> = ({ isDisabled, reviews, onSave }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const { setOpened: setIsOpenSuccessModal, reviewStatus, setReviewStatus, setReviewType } = useSuccessModalContext();

  const [isOpenDeclinePopup, setIsOpenDeclinePopup] = useState(false);
  const [isOpenApprovePopup, setIsOpenApprovePopup] = useState(false);
  const [declines, setDeclines] = useState<(string | null)[]>([]);
  const [currentReview, setCurrentReview] = useState<Employee | null>(null);
  const currentTimeline = currentReview?.timeline?.filter(filterApprovedFn);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [allReviewsProcessed, setAllReviewsProcessed] = useState<boolean>(false);

  useEffect(() => {
    if (reviewStatus && allReviewsProcessed) {
      setIsOpenSuccessModal(true);
    }
  }, [reviewStatus, allReviewsProcessed]);

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

  const handleDeclineBtnClick = () => {
    setIsOpenDeclinePopup(true);
    setCurrentReview(reviews[0]);
  };

  const handleApproveBtnClick = () => {
    setIsOpenApprovePopup(true);
    setCurrentReview(reviews[0]);
  };

  const handleDeclineSubmit = useCallback(
    (hasReason?: boolean, reason?: string) => {
      if (declines.length + 1 < reviews.length) {
        setCurrentReview(reviews[declines.length + 1]);
        setIsOpenDeclinePopup(false);
        setIsOpenDeclinePopup(true);
      } else {
        setIsOpenDeclinePopup(false);
      }

      !hasReason && setDeclines((declines) => [...declines, '']);

      hasReason && reason && setDeclines((declines) => [...declines, reason]);
    },
    [reviews, declines],
  );

  const handleDeclineClose = useCallback(() => {
    if (reviews.length === declines.length + 1) {
      // if all reviews were opened already, close popup
      setIsOpenDeclinePopup(false);
      setCurrentReview(null);
    } else {
      // update currentReview with next one
      setCurrentReview(reviews[declines.length + 1]);
    }

    setDeclines((declines) => [...declines, null]); // set empty decline
  }, [reviews, declines]);

  const handleApproveSubmit = () => {
    approveColleagues();
    setIsOpenApprovePopup(false);
  };

  const updateReviewStatus = useCallback(
    (status: Status) => (reasons?: (string | null)[]) => {
      reviews?.forEach((colleague, index) => {
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
          data: {
            ...(reasons ? { reason: reasons[index] as string } : {}),
            status,
            colleagueUuid: colleague.uuid,
            reviews: colleague.reviews.filter(
              ({ status, type }) => status === Status.WAITING_FOR_APPROVAL && type === timeline.reviewType,
            ),
          },
        };

        dispatch(ReviewsActions.updateReviewStatus(update));
        setReviewStatus(status);
        setReviewType(currentTimeline![0].reviewType);

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
      <TileWrapper>
        <div className={css(wrapperStyle({ isDisabled }))}>
          <div className={css(titleStyle)}>
            <Trans i18nKey={'approve_or_decline_review'}>Approve or decline colleague’s objectives or reviews</Trans>
          </div>
          <div className={css(buttonsWrapperStyle)}>
            <div>
              <Button
                isDisabled={isDisabled}
                styles={[buttonStyle({ inverse: true }), isDisabled ? { opacity: '0.6' } : {}]}
                onPress={handleDeclineBtnClick}
              >
                <Icon graphic='cancel' iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='decline'>Decline</Trans>
              </Button>
            </div>
            <div className={css({ display: 'inline-block' })}>
              <Button
                isDisabled={isDisabled}
                styles={[buttonStyle({ inverse: false })]}
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
    </>
  );
};

const wrapperStyle: CreateRule<{ isDisabled: boolean }> = ({ isDisabled }) => ({
  textAlign: 'center',
  padding: '24px',
  ...(isDisabled ? { opacity: '0.4' } : {}),
});

const titleStyle: Rule = ({ theme }) => ({
  display: 'block',
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0px',
  paddingBottom: '10px',
  fontWeight: theme.font.weight.bold,
});

const buttonsWrapperStyle: Rule = {
  justifyContent: 'center',
  display: 'flex',
};

const buttonStyle: CreateRule<{ inverse: boolean }> =
  ({ inverse }) =>
  ({ theme }) => ({
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: theme.font.weight.bold,
    margin: '0px 4px',
    ...(inverse
      ? {
          background: theme.colors.white,
          color: `${theme.colors.tescoBlue}`,
          border: `2px solid ${theme.colors.tescoBlue}`,
        }
      : {}),
  });
