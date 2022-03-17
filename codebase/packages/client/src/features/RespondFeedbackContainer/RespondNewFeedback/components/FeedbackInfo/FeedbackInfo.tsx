import React, { useEffect, FC } from 'react';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import defaultImg from 'images/default.png';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { VideoPlayer, VideoId } from 'features/VideoPlayer';
import { useSelector, useDispatch } from 'react-redux';
import { feedbackByUuidSelector, getReviewByUuidS, getRespondedFeedbacksSelector, ReviewsActions } from '@pma/store';
import { useParams } from 'react-router-dom';
import { getPropperTargetType } from '../../../utils';
import { FeedbackStatus, Tesco } from 'config/enum';

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

  const getPropperToneOfVoice = () =>
    targetColleagueProfile?.profileAttributes?.find((item) => item?.name === 'voice')?.value ?? 'Direct and simple';

  const getPropperCommentRequested = () =>
    feedbackItems?.find((item) => item?.code === 'comment_to_request')?.content ?? '';

  return (
    <div data-test-id={INFO_WRAPPER}>
      <div className={css({ marginTop: '30px' })}>
        <div className={css(BlockInfo)}>
          <div className={css({ alignSelf: 'flex-start' })}>
            <img className={css(ImgStyle)} src={defaultImg} alt='photo' />
          </div>
          <div className={css({ marginLeft: '16px' })}>
            <h3
              className={css(NamesStyle)}
            >{`${targetColleagueProfile?.colleague?.profile?.firstName} ${targetColleagueProfile?.colleague?.profile?.lastName}`}</h3>
            <p
              className={css(IndustryStyle)}
            >{`${targetColleagueProfile?.colleague?.workRelationships[0].job?.name}${targetColleagueProfile?.colleague?.workRelationships[0].department?.name}`}</p>
            <span className={css(TreatmentStyle)}>I prefer feedback that is: {getPropperToneOfVoice()}</span>
          </div>
        </div>
      </div>
      <div className={css(NotificationBlockStyle)}>
        <p>{`${targetColleagueProfile?.colleague?.profile?.firstName} has requested feedback on: ${getPropperTargetType(
          targetType,
          targetId,
          feedbackItems,
          review,
        )}`}</p>
        <p>{getPropperCommentRequested()}</p>
      </div>
      <div className={css({ marginTop: '24px' })}>
        <IconButton graphic='information' onPress={() => onClickMore()}>
          <p className={css(InfoHelpStyle)}>
            <Trans i18nKey='learn_more_about_how_to_give_great_feedback'>
              Learn more about how to give great feedback
            </Trans>
          </p>
        </IconButton>
      </div>
      <h2 className={css(VideoExplanationTitle)}>
        <Trans i18nKey='watch_this_video_on_how_to_give_great_feedback'>
          Watch this 2-minute video on how to give great feedback
        </Trans>
      </h2>
      <div className={css(VideoWrapper)} data-test-id={GIVE_FEEDBACK_VIDEO}>
        <VideoPlayer videoId={VideoId.GIVE_FEEDBACK} />
      </div>
    </div>
  );
};

const BlockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const ImgStyle: Rule = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
};
const NamesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '0px',
};

const IndustryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const TreatmentStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};

const NotificationBlockStyle: Rule = {
  marginTop: '16px',
  padding: '16px 40px 16px 16px',
  background: '#F3F9FC',
  borderRadius: '10px',
  '& > p': {
    fontSize: '14px',
    lineHeight: '18px',
    margin: '0px',
  },
} as Styles;

const InfoHelpStyle: Rule = {
  color: '#00539F',
  fontSize: '14px',
  margin: '0px 0px 0px 8px',
};

const VideoExplanationTitle: Rule = {
  margin: '16px 0px 16px 0px',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
};
const VideoWrapper: Rule = {
  width: '100%',
  marginBottom: '17px',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
  },
} as Styles;

export default FeedbackInfo;
