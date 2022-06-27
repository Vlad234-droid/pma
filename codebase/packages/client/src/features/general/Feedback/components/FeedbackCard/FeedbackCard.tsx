import React, { FC } from 'react';
import { Rule, CreateRule, Styles, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';

import { ConfigProps } from '../../config/types';

export const FEEDBACK_CARD_WRAPPER = 'feedback_card_wrapper';

type Props = Omit<ConfigProps, 'id'>;

const FeedbackCard: FC<Props> = ({ action, icon, iconText, text, onClick }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  return (
    <div className={css(cardStyle({ mobileScreen }))} data-test-id={FEEDBACK_CARD_WRAPPER} onClick={onClick}>
      <TileWrapper>
        <div className={css(wrapperBlock({ mobileScreen }))}>
          <div className={css(actionStyle)}>{action}</div>
          <div className={css(textStyle)}>{text}</div>
          <div className={css(flexStyle)}>
            <div className={css(iconStyle)}>{icon}</div>
            <div className={css(iconTextStyle)}>{iconText}</div>
          </div>
        </div>
      </TileWrapper>
    </div>
  );
};

const iconTextStyle: Rule = ({ theme }) => {
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
  cursor: 'pointer',
});

const iconStyle: Rule = {
  position: 'relative',
  '> svg': {
    display: 'block',
    margin: '0 auto',
  },
} as Styles;

export default FeedbackCard;
