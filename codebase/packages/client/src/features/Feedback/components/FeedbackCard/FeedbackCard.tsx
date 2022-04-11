import React, { FC } from 'react';
import { ConfigProps } from '../../config/types';
import { Rule, CreateRule, Styles, useStyle } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { Link } from 'react-router-dom';
import { buildPath } from 'features/Routes';

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
              <div className={css(IconStyle)}>{card.icon}</div>
              <div className={css(IconText)}>{card.iconText}</div>
            </div>
          </div>
        </TileWrapper>
      </Link>
    </div>
  );
};

// TODO: Extract duplicate 9
const IconText: Rule = ({ theme }) => {
  return {
    marginLeft: '10px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
  };
};
const textStyle: Rule = ({ theme }) => {
  return {
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f14.fontSize,
    lineHeight: theme.font.fixed.f18.lineHeight,
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
    lineHeight: theme.font.fixed.f20.lineHeight,
    color: theme.colors.link,
  };
};

const cardStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flexGrow: 1,
  flexBasis: mobileScreen ? '100%' : '45%',
});

const IconStyle: Rule = {
  position: 'relative',
  '> svg': {
    display: 'block',
    margin: '0 auto',
  },
} as Styles;

export default FeedbackCard;
