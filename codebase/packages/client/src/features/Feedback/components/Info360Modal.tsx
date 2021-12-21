import React, { FC } from 'react';
import { IconButton } from '../../../components/IconButton';
import { useStyle, useBreakpoints, Rule, Styles } from '@dex-ddl/core';
import { Info360ModalProps } from '../type';
import video_explanation from '../../../../public/video_explanation.jpg';

export const INFO_360_MODAL = 'info_360_modal';

const Info360Modal: FC<Info360ModalProps> = ({ setInfo360Modal }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return (
    <div className={css(WrapperInfo)} data-test-id={INFO_360_MODAL}>
      <h2 className={css(Title)}>What is the difference between “in the moment” and “360 Feedback”?</h2>
      <p className={css(Pre_title)}>
        You can give and receive feedback with your colleagues using Everyday Feedback or 360 Feedback. <br />
        <br />
        Meaning they can take the feedback onboard and start to make changes straight away. It can and should relate to
        any part of their Full Contribution: someone&apos;s personal development, their impact on others, their day job
        or strategic objectives. Colleagues have the option to request Everyday Feedback, focusing on any area of
        interest. <br />
        <br />
        Everyday Feedback will be visible to your colleague as soon as you give it. The receiver will be able to see who
        left the feedback so that they can arrange follow-up conversations where needed. <br />
        <br />
        360 Feedback is more structured. The questionnaire of pre-set questions provides an in-depth view of
        someone&apos;s performance against our Win Together behaviours. Usually, 360 Feedback would be used once a year
        to gather a detailed understanding on your decisions and how they impact others from a group of self-selected
        colleagues, including your line manager, direct reports and other people you work with regularly, for example
        project stakeholders.
        <br />
        <br /> You will find supporting videos to guide you when giving and receiving feedback on the giving and
        receiving feedback pages.
      </p>

      <h2 className={css(Title_video)}>Watch video explanation</h2>
      <div className={css(Block_video_explanation)}>
        <img src={video_explanation} alt='video_explanation' />
      </div>
      <h3 className={css(Recomendation_info)}>Face-to-face conversations are best for giving feedback.</h3>
      <p className={css(Pre_recomendation_info)}>
        Sharing feedback face-to-face gives you the space to have a two-way conversation, building trust and working
        together on what the colleague could do next. Where this isn&apos;t possible, you can use the feedback function
        in the Your Contribution system.
      </p>
      <h3 className={css(Recomendation_info)}>Want to say “thank you” to a colleague?</h3>
      <p className={css(Pre_recomendation_info)}>Head to the Recognition platform.</p>
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
};

const Pre_title: Rule = {
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

export default Info360Modal;
