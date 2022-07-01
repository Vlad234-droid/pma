import React, { FC, useEffect } from 'react';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { VideoId, VideoPlayer } from 'features/general/VideoPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { feedbackByUuidSelector, getRespondedFeedbacksSelector, getReviewByUuidS, ReviewsActions } from '@pma/store';
import { useParams } from 'react-router-dom';
import { FeedbackStatus, Tesco } from 'config/enum';
import { NotificationTile } from 'components/NotificationTile';
import { ProfileInfo } from 'components/ProfileInfo';
import { getPropperTargetType } from 'features/general/RespondFeedbackContainer/utils';

export const INFO_WRAPPER = 'info_wrapper';
export const GIVE_FEEDBACK_VIDEO = 'give_feedback_video';

type Props = {
  onClickMore: () => void;
};

const FeedbackInfo: FC<Props> = ({ onClickMore }) => {
  const { css } = useStyle();
  const { uuid } = useParams<{ uuid: string }>();
  const pendingNotes = useSelector(getRespondedFeedbacksSelector(FeedbackStatus.PENDING)) || [];
  const { feedbackItems, targetColleagueProfile, targetType, targetId } =
    useSelector(feedbackByUuidSelector(uuid)) || {};
  const review = useSelector(getReviewByUuidS) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (pendingNotes.length) {
      for (const item of pendingNotes) {
        if (item.targetId && item.targetId !== Tesco.TescoBank) {
          dispatch(ReviewsActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [pendingNotes.length]);

  const toneOfVoice =
    targetColleagueProfile?.profileAttributes?.find((item) => item?.name === 'voice')?.value ?? 'Direct and simple';

  const getPropperCommentRequested = () =>
    feedbackItems?.find((item) => item?.code === 'comment_to_request')?.content ?? '';

  return (
    <div data-test-id={INFO_WRAPPER}>
      <div className={css({ marginTop: '30px' })}>
        <ProfileInfo
          firstName={targetColleagueProfile?.colleague?.profile?.firstName}
          lastName={targetColleagueProfile?.colleague?.profile?.lastName}
          job={targetColleagueProfile?.colleague?.workRelationships[0]?.job?.name}
          department={targetColleagueProfile?.colleague?.workRelationships[0]?.department?.name}
          toneOfVoice={toneOfVoice}
        />
      </div>

      <NotificationTile>
        <p>{`${targetColleagueProfile?.colleague?.profile?.firstName} has requested feedback on: ${getPropperTargetType(
          targetType,
          targetId,
          feedbackItems,
          review,
        )}`}</p>
        <p>{getPropperCommentRequested()}</p>
      </NotificationTile>
      <div className={css({ marginTop: '24px' })}>
        <IconButton graphic='information' onPress={() => onClickMore()}>
          <p className={css(infoHelpStyle)}>
            <Trans i18nKey='learn_more_about_how_to_give_great_feedback'>
              Learn more about how to give great feedback
            </Trans>
          </p>
        </IconButton>
      </div>
      <h2 className={css(videoExplanationTitle)}>
        <Trans i18nKey='watch_this_video_on_how_to_give_great_feedback'>
          Watch this 2-minute video on how to give great feedback
        </Trans>
      </h2>
      <div className={css(videoWrapper)} data-test-id={GIVE_FEEDBACK_VIDEO}>
        <VideoPlayer videoId={VideoId.GIVE_FEEDBACK} />
      </div>
    </div>
  );
};

const infoHelpStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontSize: theme.spacing.s3_5,
  margin: `${theme.spacing.s0} ${theme.spacing.s0} ${theme.spacing.s0} 8px`,
});

const videoExplanationTitle: Rule = ({ theme }) => ({
  margin: `${theme.spacing.s4} ${theme.spacing.s0} ${theme.spacing.s4} ${theme.spacing.s0}`,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.spacing.s5,
  lineHeight: theme.spacing.s6,
});

const videoWrapper: Rule = {
  width: '100%',
  marginBottom: '17px',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
  },
} as Styles;

export default FeedbackInfo;
