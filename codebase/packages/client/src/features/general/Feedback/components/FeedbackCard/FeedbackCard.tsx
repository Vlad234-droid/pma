import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Rule, CreateRule, Styles, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { buildPath } from 'features/general/Routes';
import { ConfigProps } from '../../config/types';

export const FEEDBACK_CARD_WRAPPER = 'feedback_card_wrapper';

type FeedbackCardProps = {
  card: ConfigProps;
};

const FeedbackCard: FC<FeedbackCardProps> = ({ card }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  return (
    <div className={css(cardStyle({ mobileScreen }))} data-test-id={FEEDBACK_CARD_WRAPPER}>
      <Link to={buildPath(card.link)}>
        <TileWrapper>
          <div className={css(wrapperBlock({ mobileScreen }))}>
            <div className={css(actionStyle)}>{card.action}</div>
            <div className={css(textStyle)}>{card.text}</div>
            <div className={css(flexStyle)}>
              <div className={css(iconStyle)}>{card.icon}</div>
              <div className={css(iconText)}>{card.iconText}</div>
            </div>
          </div>
        </TileWrapper>
      </Link>
    </div>
  );
};

const iconText: Rule = ({ theme }) => {
  return {
    marginLeft: '10px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};
const textStyle: Rule = ({ theme }) => {
  return {
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f14.fontSize,
    lineHeight: theme.font.fixed.f14.lineHeight,
    letterSpacing: '0px',
  };
};
const flexStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '21px',
};
const wrapperBlock: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  padding: !mobileScreen ? '24px 24px 34px 24px' : '20px',
  height: !mobileScreen ? '146px' : 'auto',
});

const actionStyle: Rule = ({ theme }) => {
  return {
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f18.fontSize,
    lineHeight: theme.font.fixed.f18.lineHeight,
    color: theme.colors.link,
  };
};

const cardStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flexGrow: 1,
  flexBasis: mobileScreen ? '100%' : '45%',
});

const iconStyle: Rule = {
  position: 'relative',
  '> svg': {
    display: 'block',
    margin: '0 auto',
  },
} as Styles;

export default FeedbackCard;
