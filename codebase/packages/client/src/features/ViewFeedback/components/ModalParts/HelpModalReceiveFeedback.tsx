import React, { Dispatch, FC, SetStateAction } from 'react';
import { IconButton } from 'components/IconButton';
import { useStyle, useBreakpoints, Rule, Styles } from '@dex-ddl/core';
import { VideoPlayer, VideoId } from 'features/VideoPlayer';
import { Trans } from 'components/Translation';

type Info360ModalProps = {
  setHelpModalReceiveFeedback: Dispatch<SetStateAction<boolean>>;
};

const HelpModalReceiveFeedback: FC<Info360ModalProps> = ({ setHelpModalReceiveFeedback }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return (
    <div className={css(WrapperInfo)}>
      <h2 className={css(Title)}>
        <Trans i18nKey='watch_this_video_on_receiving_your_feedback'>
          Watch this 2-minute video on receiving your feedback.
        </Trans>
      </h2>

      <div className={css(BlockVideoExplanation)}>
        <VideoPlayer videoId={VideoId.RECEIVE_FEEDBACK} />
      </div>
      <p className={css(PreRecomendationInfo, { marginTop: '8px' })}>
        <Trans i18nKey='we_all_have_strengths_and_development_areas'>
          We all have strengths and development areas. Feedback is all about helping you be the best you can be. When
          receiving feedback, think about these four elements:
        </Trans>
      </p>
      <ol className={css(orderedList)}>
        <li>
          <b>
            <Trans i18nKey='take_a_step_back'>Take a step back.</Trans>
          </b>
          <Trans i18nKey='take_time_to_reflect_on_the_feedback'>
            Take time to reflect on the feedback you&apos;ve received, don&apos;t feel like you must take action right
            away. If you&apos;re having a bad day, you&apos;re more likely to receive feedback negatively, so making
            sure you&apos;re in a positive frame of mind where you can stay curious about your feedback will set you up
            to receive feedback as constructive and well meaning.
          </Trans>
        </li>
        <li>
          Remember to stay{' '}
          <b>
            <Trans i18nKey='balanced'>balanced</Trans>
          </b>
          :{' '}
          <Trans i18nKey='if_you_only_focus_on_your_developmental_feedback'>
            If you only focus on your developmental feedback, you risk overlooking the value of positive feedback, but
            focusing only on your positive feedback can create blind spots. It&apos;s important to take a balanced
            perspective.
          </Trans>
        </li>
        <li>
          <b>
            <Trans i18nKey='separate_opinions_and_facts'>Separate opinions and facts.</Trans>
          </b>{' '}
          <Trans i18nKey='focus_on_the_facts_in_your_feedback'>
            Focus on the facts in your feedback, these will be helpful when you start to plan what you&apos;ll do next.
            Opinions are also worth considering as this shows how you come across to an individual but remember
            someone&apos;s opinion is just one perspective.
          </Trans>
        </li>
        <li>
          Be{' '}
          <b>
            <Trans i18nKey='future_focused'>future focused.</Trans>{' '}
          </b>{' '}
          <Trans i18nKey='feedback_is_about_learning'>
            Feedback is about learning from the past to make a plan for the future. Try not to dwell on what didn’t go
            so well in the past, use those examples to make a plan of action so in the future your contribution can be
            even better.
          </Trans>
        </li>
      </ol>
      <p className={css(PreRecomendationInfo, { marginTop: '8px' })}>
        <Trans i18nKey='learn_more_zabout_your_feedback'>
          If you want to learn more about your feedback, speak to the colleague who shared the feedback. This is a great
          way to understand more about the feedback they shared and when they observed it. Remember to take time to
          reflect on the feedback before you approach them, so the conversation is constructive. Having open
          conversations helps you to build great relationships with your colleagues.
        </Trans>
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
        <IconButton
          graphic='arrowLeft'
          onPress={() => setHelpModalReceiveFeedback(() => false)}
          iconProps={{ invertColors: true }}
        />
      </span>
    </div>
  );
};

const orderedList: Rule = {
  '& li': {
    marginTop: '8px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  },
} as Styles;
const WrapperInfo: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};

const Title: Rule = {
  margin: '0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  marginBottom: '12px',
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

const PreRecomendationInfo: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px',
};

export default HelpModalReceiveFeedback;
