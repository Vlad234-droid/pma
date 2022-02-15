import React, { FC } from 'react';
import { IconButton } from '../../../components/IconButton';
import { useStyle, useBreakpoints, Rule, Styles } from '@dex-ddl/core';
import { Info360ModalProps } from '../type';
import { VideoPlayer, VideoId } from 'features/VideoPlayer';

export const INFO_360_MODAL = 'info_360_modal';

const Info360Modal: FC<Info360ModalProps> = ({ setInfo360Modal }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return (
    <div className={css(WrapperInfo)} data-test-id={INFO_360_MODAL}>
      <div className={css({ height: '100%' })}>
        <h2 className={css(Title)}>What is the difference between “in the moment” and “360 Feedback”?</h2>
        <p className={css(PreTitle)}>
          You can give and receive feedback with your colleagues using Everyday feedback or 360 feedback. <br />
          <br />
          Everyday feedback lets you share your feedback with your colleagues across any work level and function in real
          time. This type of feedback lets a colleague know what they&apos;re doing great at, the opportunities they
          have to be even better and how to make improvements continuously, meaning they can take the feedback onboard
          and start to make changes straight away. It can and should relate to any part of their full contribution:
          someone&apos;s personal development, their impact on others, their day job or strategic objectives. Colleagues
          have the option to request Everyday feedback, focusing on any area of interest. <br />
          <br />
          360 feedback is more structured. The questionnaire of pre-set questions provides an in-depth view of
          someone&apos;s performance against our Win Together behaviours or our values. Usually, 360 feedback would be
          used once a year to gather a detailed understanding on your decisions and how they impact others from a group
          of self-selected colleagues, including your line manager, direct reports and other people you work with
          regularly, for example project stakeholders. <br />
          <br />
          You will find supporting videos to guide you when giving and receiving feedback on the giving and receiving
          feedback pages.
        </p>

        <h2 className={css(TitleVideo)}>Watch this 2-minute video on the importance of feedback:</h2>
        <div className={css(BlockVideoExplanation)}>
          <VideoPlayer videoId={VideoId.LEARN_FEEDBACK} />
        </div>
        <h3 className={css(RecomendationInfo)}>Face to face conversations are best for giving feedback.</h3>
        <p className={css(PreRecomendationInfo)}>
          Sharing feedback face to face gives you the space to have a two-way conversation, building trust and working
          together on what the colleague could do next. Where this isn&apos;t possible, you can use the feedback
          function in the Your Contribution system.
        </p>
        <h3 className={css(RecomendationInfo)}>Want to say “thank you” to a colleague?</h3>
        <p className={css(PreRecomendationInfo)}>
          Recognition is just as important as all other feedback. We need to remember to celebrate our successes, share
          praise or say &apos;thank you&apos; to our colleagues when things have gone well. You can share recognition
          with your colleagues during face to face conversations and using Values Awards. Where this isn&apos;t
          possible, you can use the feedback function in the Your Contribution system.
        </p>
      </div>
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
        <IconButton
          graphic='arrowLeft'
          onPress={() => setInfo360Modal(() => false)}
          iconProps={{ invertColors: true }}
        />
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

const TitleVideo: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '32px 0px 16px 0px',
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

export default Info360Modal;
