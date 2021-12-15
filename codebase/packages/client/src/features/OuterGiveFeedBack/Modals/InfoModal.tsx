import React, { FC } from 'react';
import { IconButton } from 'components/IconButton';
import { useStyle, useBreakpoints, Rule, Styles } from '@dex-ddl/core';
import { InfoModalProps } from '../type';
import video_explanation from '../../../../public/video_explanation.jpg';

const InfoModal: FC<InfoModalProps> = ({ setInfoModal }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <div className={css(WrapperInfo)}>
      <h2 className={css(Title)}>Need help with providing feedback?</h2>
      <p className={css(Pre_title)}>Here are some examples of the types of things you could write:</p>
      <ul className={css(List_info)}>
        <li>List out some of the strengths your colleadue has, what makes them good collague to work with?</li>
        <li>Can you provide further detail on what they should keep doing or what they improve on?</li>
      </ul>
      <h2 className={css(Title_video)}>Watch video explanation</h2>
      <div className={css(Block_video_explanation)}>
        <img src={video_explanation} alt='video_explanation' />
      </div>
      <h3 className={css(Recomendation_info)}>Face to face meetings are recommended for delivering feedback</h3>
      <p className={css(Pre_recomendation_info)}>Please try and find time to give your feedback in person.</p>
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
        <IconButton graphic='arrowLeft' onPress={() => setInfoModal(() => false)} iconProps={{ invertColors: true }} />
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
const List_info: Rule = {
  marginBottom: '32px',
  '& > li': {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    '&:last-child': {
      marginTop: '10px',
    },
  },
} as Styles;

const Title_video: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '0px 0px 16px 0px',
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

export default InfoModal;
