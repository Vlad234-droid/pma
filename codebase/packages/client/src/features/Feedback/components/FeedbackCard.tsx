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

  return (
    <div className={css(cardStyle)}>
      <Link to={card.link}>
        <TileWrapper>
          <div className={css(wrapperBlock)}>
            <div className={css(actionStyle)}>{card.action}</div>
            <div className={css(textStyle)}>{card.text}</div>
            <div className={css(flexStyle)}>
              <div className={css(IconStyle)}>{card.icon}</div>
              <div className={css(IconText)}>{card.iconText}</div>
            </div>
          </div>
        </TileWrapper>
      </Link>
    </div>
  );
};

const IconText: Rule = {
  marginLeft: '10px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};
const textStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
};
const flexStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '21px',
};
const wrapperBlock: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: !mobileScreen ? '24px 24px 34px 24px' : '20px',
    height: !mobileScreen ? '146px' : 'auto',
  };
};
const actionStyle: Rule = ({ theme }) => {
  return {
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: theme.colors.link,
  };
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
