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
      <h2 className={css(TitleVideo)}>Watch this 2-minute video on how to give great feedback</h2>
      <div className={css(BlockVideoExplanation)}>
        <img src={video_explanation} alt='video_explanation' />
      </div>
      <p className={css(PreTitle)}>Here are some examples of the types of things you could write:</p>
      <ul className={css(ListInfo)}>
        <li>List out some of the strengths your colleadue has, what makes them good collague to work with?</li>
        <li>Can you provide further detail on what they should keep doing or what they improve on?</li>
      </ul>

      <h3 className={css(RecomendationInfo)}>Face to face meetings are recommended for delivering feedback</h3>
      <p className={css(PreRecomendationInfo)}>Please try and find time to give your feedback in person.</p>
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
  maxHeight: '300px',
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

export default InfoModal;
