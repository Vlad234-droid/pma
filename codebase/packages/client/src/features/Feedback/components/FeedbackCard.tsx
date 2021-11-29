import React, { FC } from 'react';
import { ConfigProps } from '../type';
import { Rule, useStyle, useBreakpoints, Styles } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Link } from 'react-router-dom';

type FeedbackCardProps = {
  card: ConfigProps;
};

const FeedbackCard: FC<FeedbackCardProps> = ({ card }) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small;

  return (
    <div className={css(cardStyle)}>
      <Link to={card.link}>
        <TileWrapper>
          <div className={css({ padding: !mobileScreen ? '24px 24px 34px 24px' : '20px' })}>
            <div className={css({ fontWeight: 'bold', fontSize: '18px', lineHeight: '22px', color: '#00539F' })}>
              {card.action}
            </div>
            <div className={css({ fontWeight: 'normal', fontSize: '14px', lineHeight: '18px' })}>{card.text}</div>
            <div className={css({ display: 'flex', alignItems: 'center', marginTop: '21px' })}>
              <div className={css(IconStyle)}>{card.icon}</div>
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
