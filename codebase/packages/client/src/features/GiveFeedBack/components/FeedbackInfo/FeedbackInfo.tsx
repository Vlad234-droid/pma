import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { VideoId, VideoPlayer } from 'features/VideoPlayer';
import { Trans } from 'components/Translation';
import { NotificationTile } from 'components/NotificationTile';
import { ProfileInfo } from 'components/ProfileInfo';

export const INFO_WRAPPER = 'info-wrapper';
export const TONE_VOICE = 'tone-voice';

type Props = {
  selectedPerson: any;
  onClickMore: () => void;
};

const FeedbackInfo: FC<Props> = ({ selectedPerson, onClickMore }) => {
  const { css } = useStyle();
  const { colleague } = selectedPerson || {};

  const toneOfVoice =
    selectedPerson?.profileAttributes?.find((item) => item?.name === 'voice')?.value ?? 'Direct and simple';

  return (
    <div data-test-id={INFO_WRAPPER}>
      <div className={css({ height: '2px', background: '#E5E5E5' })} />
      <div className={css({ marginTop: '16px' })}>
        <div className={css(videoWrapper)}>
          <h2 className={css(videoExplanationTitle)}>
            <Trans i18nKey='Trans'>Watch this 2-minute video on how to give great feedback</Trans>
          </h2>
          <VideoPlayer videoId={VideoId.GIVE_FEEDBACK} />
        </div>
        <ProfileInfo
          firstName={colleague?.profile?.firstName}
          lastName={colleague?.profile?.lastName}
          job={colleague?.workRelationships?.[0]?.job?.name}
          department={colleague?.workRelationships?.[0]?.department?.name}
          toneOfVoice={toneOfVoice}
        />
      </div>
      <NotificationTile>
        <p>
          <Trans i18nKey='fill_out_the_questions_below_to_share_your_feedback'>
            Fill out the questions below to share your feedback
          </Trans>
        </p>
      </NotificationTile>

      <div className={css({ marginTop: '24px', marginBottom: '14px' })}>
        <IconButton graphic='information' onPress={() => onClickMore()}>
          <p className={css(infoHelpStyle)}>
            <Trans i18nKey='learn_more_about_how_to_give_great_feedback'>
              Learn more about how to give great feedback
            </Trans>
          </p>
        </IconButton>
      </div>
    </div>
  );
};

const infoHelpStyle: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontSize: theme.spacing.s3_5,
  margin: `${theme.spacing.s0} ${theme.spacing.s0} 5px 8px`,
});

const videoExplanationTitle: Rule = ({ theme }) => ({
  margin: `${theme.spacing.s4} ${theme.spacing.s0} ${theme.spacing.s4} ${theme.spacing.s0}`,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.spacing.s5,
  lineHeight: theme.spacing.s6,
});
const videoWrapper: Rule = {
  width: '100%',
  marginBottom: '56px',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
  },
} as Styles;

export default FeedbackInfo;
