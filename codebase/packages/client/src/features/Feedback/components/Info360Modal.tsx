import React, { FC } from 'react';
import { IconButton } from '../../../components/IconButton';
import { useStyle, useBreakpoints, Rule, Styles } from '@dex-ddl/core';
import { Info360ModalProps } from '../type';
import video_explanation from '../../../components/Icon/img/video_explanation.jpg';

export const INFO_360_MODAL = 'info_360_modal';

const Info360Modal: FC<Info360ModalProps> = ({ setInfo360Modal }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return (
    <div className={css(WrapperInfo)} data-test-id={INFO_360_MODAL}>
      <h2 className={css(Title)}>What is the difference between “in the moment” and “360 Feedback”?</h2>
      <p className={css(Pre_title)}>
        Platea amet, orci quis blandit. Sed sem cursus sem fermentum sit consectetur quis sed lacus. Amet sed eget eget
        cras nec. Sem vitae, donec luctus eleifend molestie placerat magna. Enim sem duis egestas orci quis. Feugiat
        praesent vitae quam diam. Convallis id mattis eu consectetur. Malesuada molestie donec lectus viverra rhoncus
        sed auctor ornare.
      </p>

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
