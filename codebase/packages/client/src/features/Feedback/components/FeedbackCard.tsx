import React, { FC } from 'react';
import { ConfigProps } from '../type';
import { Rule, useStyle, useBreakpoints, Styles, CreateRule } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Link } from 'react-router-dom';

type FeedbackCardProps = {
  card: ConfigProps;
};

const FeedbackCard: FC<FeedbackCardProps> = ({ card }) => {
  const { css } = useStyle();

  return (
    <div className={css(cardStyle)}>
      <Link to={card.link}>
        <TileWrapper customStyle={{ height: '148px' }}>
          <div className={css({ padding: '24px' })}>
            <div className={css({ fontWeight: 'bold', fontSize: '18px', lineHeight: '22px', color: '#00539F' })}>
              {card.action}
            </div>
            <div className={css({ fontWeight: 'normal', fontSize: '14px', lineHeight: '18px' })}>{card.text}</div>
            <div className={css({ display: 'flex', alignItems: 'center', marginTop: '21px' })}>
              <div className={css(IconStyle, customDot({ card }))}>{card.icon}</div>
              <div
                className={css({
                  marginLeft: '10px',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '16px',
                  lineHeight: '20px',
                })}
              >
                {card.iconText}
              </div>
            </div>
          </div>
        </TileWrapper>
      </Link>
    </div>
  );
};

const customDot: CreateRule<{ card: ConfigProps }> = (props) => {
  const { card } = props;
  if (card.id === 2 || card.id === 3) {
    return {
      '::before': {
        content: '" "',
        position: 'absolute',
        top: '2.9px',
        left: '8.5px',
        width: '5px',
        height: '5px',
        background: '#CC3232',
        borderRadius: '50%',
      } as Styles,
    };
  }
  return {};
};

const cardStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    flexGrow: 1,
    flexBasis: mobileScreen ? '100%' : '45%',
  };
};

const IconStyle: Rule = {
  position: 'relative',
  '> svg': {
    display: 'block',
    margin: '0 auto',
  },
} as Styles;

export default FeedbackCard;
