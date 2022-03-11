import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import defaultImg from 'images/default.png';
import { VideoPlayer, VideoId } from 'features/VideoPlayer';
import { Trans, useTranslation } from 'components/Translation';

export const WITH_SELECTED_TEST = 'with_selected_test';

type Props = {
  selectedPerson: any;
  onClickMore: () => void;
};

const FeedbackInfo: FC<Props> = ({ selectedPerson, onClickMore }) => {
  const { css } = useStyle();
  const { colleague } = selectedPerson || {};
  const { t } = useTranslation();

  const toneOfVoice =
    selectedPerson?.profileAttributes?.find((item) => item?.name === 'voice')?.value ?? 'Direct and simple';

  return (
    <div data-test-id={WITH_SELECTED_TEST}>
      <div className={css({ height: '1px', background: '#E5E5E5' })} />
      <div className={css({ marginTop: '16px' })}>
        <div className={css(VideoWrapper)}>
          <h2 className={css(VideoExplanationTitle)}>
            <Trans i18nKey='Trans'>Watch this 2-minute video on how to give great feedback</Trans>
          </h2>
          <VideoPlayer videoId={VideoId.GIVE_FEEDBACK} />
        </div>
        <div className={css(BlockInfo)}>
          <div className={css({ alignSelf: 'flex-start' })}>
            <img className={css(ImgStyle)} src={defaultImg} alt='photo' />
          </div>
          <div className={css({ marginLeft: '16px' })}>
            <h3 className={css(Names_Style)}>{`${colleague?.profile?.firstName} ${colleague?.profile?.lastName}`}</h3>
            <p className={css(IndustryStyle)}>
              {`${colleague?.workRelationships?.[0].job?.name}, ${colleague?.workRelationships?.[0].department?.name}`}
            </p>
            <span className={css(TreatmentStyle)}>
              {t('i_prefer_feedback_that_is', `I prefer feedback that is: ${toneOfVoice}`, { toneOfVoice })}
            </span>
          </div>
        </div>
      </div>
      <div className={css(NotificationBlockStyle)}>
        <p>
          <Trans i18nKey='fill_out_the_questions_below_to_share_your_feedback'>
            Fill out the questions below to share your feedback
          </Trans>
        </p>
      </div>
      <div className={css({ marginTop: '24px', marginBottom: '14px' })}>
        <IconButton graphic='information' onPress={() => onClickMore()}>
          <p className={css(InfohelpStyle)}>
            <Trans i18nKey='learn_more_about_how_to_give_great_feedback'>
              Learn more about how to give great feedback
            </Trans>
          </p>
        </IconButton>
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
const Names_Style: Rule = {
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

const InfohelpStyle: Rule = {
  color: '#00539F',
  fontSize: '14px',
  margin: '0px 0px 5px 8px',
};

const VideoExplanationTitle: Rule = {
  margin: '16px 0px 16px 0px',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
};
const VideoWrapper: Rule = {
  width: '100%',
  marginBottom: '56px',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
  },
} as Styles;

export default FeedbackInfo;
