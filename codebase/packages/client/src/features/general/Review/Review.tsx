import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
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
  TimelineActions,
  uuidCompareSelector,
} from '@pma/store';
import { useParams } from 'react-router';

import { ReviewType, Status } from 'config/enum';
import { TriggerModal } from 'features/general/Modal/components/TriggerModal';
import { useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import { Icon as IconComponent } from 'components/Icon';
import Spinner from 'components/Spinner';

import { ReviewHelpModal } from './components/ReviewHelp';
import { InfoBlock } from 'components/InfoBlock';
import { USER } from 'config/constants';
import { formTagComponents } from 'utils/schema';
import { Review } from 'config/types';
import ReviewForm from './components/ReviewForm';

type Translation = [string, string];

const TRANSLATION: Record<ReviewType.MYR | ReviewType.EYR, { title: Translation; helperText: Translation }> = {
  [ReviewType.MYR]: {
    title: ['mid_year_review_title', 'How is your year going so far?'],
    helperText: [
      'mid_year_review_help_text',
      'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your development for the year ahead.',
    ],
  },
  [ReviewType.EYR]: {
    title: ['end_year_review_title', 'What have you contributed this year and how have you gone about it?'],
    helperText: [
      'end_year_review_help_text',
      'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your priorities and development for the year ahead.',
    ],
  },
};

export type Props = {
  reviewType: ReviewType.MYR | ReviewType.EYR;
  onClose: () => void;
};

const MyReview: FC<Props> = ({ reviewType, onClose }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const isUserView = useSelector(uuidCompareSelector(uuid));

  const [successModal, setSuccessModal] = useState(false);
  const { info } = useSelector(currentUserSelector);
  const colleagueUuid = uuid || info.colleagueUUID;
  const dispatch = useDispatch();
  const review: Review = useSelector(getReviewByTypeSelector(reviewType)) || {};
  const formValues = review?.properties || {};

  const { loading: reviewLoading, saving, saved } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading } = useSelector(schemaMetaSelector);
  const schema = useSelector(getReviewSchema(reviewType));

  const timelineReview = useSelector(getTimelineByReviewTypeSelector(reviewType, USER.current)) || ({} as any);

  const readonly =
    (uuid && !isUserView) || [Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(timelineReview?.summaryStatus);

  const { components = [] as Component[] } = schema;

  useEffect(() => {
    if (!successModal && saved) {
      dispatch(ReviewsActions.updateReviewMeta({ saved: false }));
      onClose();
    }
  }, [saved, successModal]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid, cycleUuid: 'CURRENT' } }));
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    };
  }, []);

  const handleSaveDraft = (data) => {
    dispatch(
      ReviewsActions.updateReviews({
        pathParams: { colleagueUuid: info.colleagueUUID, code: reviewType, cycleUuid: 'CURRENT' },
        data: [
          {
            status: Status.DRAFT,
            properties: { ...data },
          },
        ],
      }),
    );
  };

  const handleSubmitData = async (data) => {
    dispatch(
      ReviewsActions.updateReviews({
        pathParams: { colleagueUuid: info.colleagueUUID, code: reviewType, cycleUuid: 'CURRENT' },
        data: [
          {
            status: Status.WAITING_FOR_APPROVAL,
            properties: { ...data },
          },
        ],
      }),
    );
    setSuccessModal(true);
  };

  if (reviewLoading || schemaLoading || saving) {
    return <Spinner fullHeight />;
  }

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

  // if (!timelineReview || !review) {
  //   return null;
  // }

  console.log({ review });

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <div>
          <div className={css(formTitleStyle)}>{t(...TRANSLATION[reviewType].title, { ns: 'general' })}</div>
          <div className={css(helperTextStyle)}>{t(...TRANSLATION[reviewType].helperText, { ns: 'general' })}</div>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <TriggerModal
              triggerComponent={
                <InfoBlock text={t('need_help_to_write', 'Need help with what to write?', { ns: 'general' })} />
              }
              title={t('completing_your_review', 'Completing your review')}
            >
              <ReviewHelpModal />
            </TriggerModal>
            <ReviewForm
              components={readonly ? formTagComponents(components, theme) : components}
              readonly={readonly}
              onClose={onClose}
              onSubmit={handleSubmitData}
              onSaveDraft={handleSaveDraft}
              reviewType={reviewType}
              defaultValues={formValues}
              reviewStatus={review?.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle: Rule = { height: '100%' };

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
  });

const iconLeftPositionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

const formTitleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fluid.f24.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const helperTextStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  paddingTop: theme.spacing.s2,
  paddingBottom: theme.spacing.s5,
});

export default MyReview;
