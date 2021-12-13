import React, { Dispatch, FC, SetStateAction } from 'react';
import { IconButton } from 'components/IconButton';
import { useStyle, useBreakpoints, Rule, Styles } from '@dex-ddl/core';
import video_explanation from '../../../../../public/video_explanation.jpg';

type Info360ModalProps = {
  setHelpModalReceiveFeedback: Dispatch<SetStateAction<boolean>>;
};

const HelpModalReceiveFeedback: FC<Info360ModalProps> = ({ setHelpModalReceiveFeedback }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return (
    <div className={css(WrapperInfo)}>
      <h2 className={css(Title)}>Watch this 2-minute video on receiving your feedback.</h2>

      <div className={css(Block_video_explanation)}>
        <img src={video_explanation} alt='video_explanation' />
      </div>
      <p className={css(Pre_recomendation_info, { marginTop: '8px' })}>
        We all have strengths and development areas. Feedback is all about helping you be the best you can be. When
        receiving feedback, think about these four elements:
      </p>
      <ol className={css(ordered_list)}>
        <li>
          <b>Take a step back.</b> Take time to reflect on the feedback you`ve received, don`t feel like you must take
          action right away. If you`re having a bad day, you`re more likely to receive feedback negatively, so making
          sure you`re in a positive frame of mind where you can stay curious about your feedback will set you up to
          receive feedback as constructive and well meaning.
        </li>
        <li>
          Remember to stay <b>balanced</b>: If you only focus on your developmental feedback, you risk overlooking the
          value of positive feedback, but focusing only on your positive feedback can create blind spots. It`s important
          to take a balanced perspective.
        </li>
        <li>
          <b>Separate opinions and facts.</b> Focus on the facts in your feedback, these will be helpful when you start
          to plan what you`ll do next. Opinions are also worth considering as this shows how you come across to an
          individual but remember someone`s opinion is just one perspective.
        </li>
        <li>
          Be <b>future focused.</b> Feedback is about learning from the past to make a plan for the future. Try not to
          dwell on what didn’t go so well in the past, use those examples to make a plan of action so in the future your
          contribution can be even better.
        </li>
      </ol>
      <p className={css(Pre_recomendation_info)}>Remember:</p>
      <ul className={css(dots_list)}>
        <li>make your good intentions clear</li>
        <li>be specific about the situation</li>
        <li>describe the behaviour you observed</li>
        <li>highlight the impact it had</li>
      </ul>
      <p className={css(Pre_recomendation_info, { marginTop: '8px' })}>
        If you want to learn more about your feedback, speak to the colleague who shared the feedback. This is a great
        way to understand more about the feedback they shared and when they observed it. Remember to take time to
        reflect on the feedback before you approach them, so the conversation is constructive. Having open conversations
        helps you to build great relationships with your colleagues.
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
const dots_list: Rule = {
  marginTop: '0px',
  '& li': {
    marginTop: '8px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  },
} as Styles;
const ordered_list: Rule = {
  '& li': {
    marginTop: '8px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  },
} as Styles;
const WrapperInfo: Rule = {
  padding: '0px 36px',
};

const Pre_title: Rule = {
  margin: '16px 0px 0px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};
const Title: Rule = {
  margin: '0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  marginBottom: '12px',
};

const Title_video: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '32px 0px 16px 0px',
};
const Block_video_explanation: Rule = {
  maxHeight: '300px',
  width: '100%',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'contain',
  },
} as Styles;

const Recomendation_info: Rule = {
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  marginBottom: '16px',
};

const Pre_recomendation_info: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px',
};

export default HelpModalReceiveFeedback;
