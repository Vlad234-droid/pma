import React, { FC } from 'react';
import { IconButton } from 'components/IconButton';
import { useStyle, useBreakpoints, Rule, Styles } from '@dex-ddl/core';

import { VideoPlayer, VideoId } from 'features/VideoPlayer';
import { Trans } from 'components/Translation';

export const MESSAGE_WRAPPER = 'message_wrapper';
export const GO_BACK = 'go_back';

type Props = {
  goBack: () => void;
};

const InfoMessage: FC<Props> = ({ goBack }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <div className={css(WrapperInfo)} data-test-id={MESSAGE_WRAPPER}>
      <h2 className={css(Title)}>
        <Trans i18nKey='need_help_with_providing_feedback'>Need help with providing feedback?</Trans>
      </h2>
      <h2 className={css(TitleVideo)}>
        <Trans i18nKey='watch_this_video_on_how_to_give_great_feedback'>
          Watch this 2-minute video on how to give great feedback
        </Trans>
      </h2>
      <div className={css(BlockVideoExplanation)}>
        <VideoPlayer videoId={VideoId.GIVE_FEEDBACK} />
      </div>
      <p className={css(PreTitle)}>
        <Trans i18nKey='here_are_some_examples_you_could_write'>
          Here are some examples of the types of things you could write:
        </Trans>
      </p>
      <ul className={css(ListInfo)}>
        <li>
          <Trans i18nKey='list_out_some_of_the_strengths'>
            List out some of the strengths your colleadue has, what makes them good collague to work with?
          </Trans>
        </li>
        <li>
          <Trans i18nKey='can_you_provide_further_detail'>
            Can you provide further detail on what they should keep doing or what they improve on?
          </Trans>
        </li>
      </ul>

      <h3 className={css(RecomendationInfo)}>
        <Trans i18nKey='face_to_face_meetings_are_recommended'>
          Face to face meetings are recommended for delivering feedback
        </Trans>
      </h3>
      <p className={css(PreRecomendationInfo)}>
        <Trans i18nKey='please_try_and_find_time'>Please try and find time to give your feedback in person.</Trans>
      </p>
      <span
        className={css({
          position: 'fixed',
          top: theme.spacing.s5,
          left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
        })}
      >
        <IconButton graphic='arrowLeft' onPress={goBack} iconProps={{ invertColors: true }} data-test-id={GO_BACK} />
      </span>
    </div>
  );
};

const WrapperInfo: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};

const PreTitle: Rule = {
  margin: '16px 0px 0px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};
const Title: Rule = {
  margin: '0px',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
};
const ListInfo: Rule = {
  marginBottom: '32px',
  '& > li': {
    fontWeight: 'normal',
    fontSize: '16px',
    '&:last-child': {
      marginTop: '10px',
    },
  },
} as Styles;

const TitleVideo: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '16px 0px 16px 0px',
};
const BlockVideoExplanation: Rule = {
  width: '100%',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'contain',
  },
} as Styles;

const RecomendationInfo: Rule = {
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  marginBottom: '16px',
};

const PreRecomendationInfo: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px',
};

export default InfoMessage;
