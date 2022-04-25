import React, { FC, Fragment } from 'react';
import { useStyle, CreateRule } from '@pma/dex-wrapper';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Trans } from 'components/Translation';

export const NO_TIPS_TILE = 'no-tips-tile';

const NoTips: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <Fragment>
      <div data-test-id={NO_TIPS_TILE} className={css({ margin: '0 0 15px' })}>
        <TileWrapper customStyle={cardStyle({ mobileScreen })}>
          <div className={css(cardInner({ mobileScreen }))}>
            <div className={css({ marginRight: '10px' })}>
              <Icon iconStyles={{ width: '20px' }} graphic='information' />
            </div>
            <div className={css({})}>
              <div className={css(cardTitleStyle({ mobileScreen }))}>
                <Trans i18nKey='please_create_your_first_tip'>
                  Please create your first tip to be able to push it to colleagues
                </Trans>
                .
              </div>
              <div className={css(cardTextStyle({ mobileScreen }))}>
                <Trans i18nKey='tips_should_be_also_helpful'>
                  Tips should be also helpful to transition from the current system to the new one. They should offer
                  guidance on how the application functionalities can be used or as an alert for upcoming events
                  (reviews)
                </Trans>
                .
              </div>
            </div>
          </div>
        </TileWrapper>
      </div>
    </Fragment>
  );
};

const cardStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    padding: mobileScreen ? '16px' : '24px',
    width: mobileScreen ? '100%' : '80%',
  };
};

const cardInner: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    padding: mobileScreen ? '10px' : '15px',
    borderRadius: '10px',
    backgroundColor: '#f3f9fc',
    display: 'flex',
  };
};

const cardTitleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontWeight: theme.font.weight.bold,
    color: theme.colors.tescoBlue,
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f12.fontSize,
          lineHeight: theme.font.fixed.f12.lineHeight,
        }
      : {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
        }),
  });

const cardTextStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    marginTop: '5px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f12.fontSize,
          lineHeight: theme.font.fixed.f12.lineHeight,
        }
      : {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
        }),
  });

export default NoTips;
