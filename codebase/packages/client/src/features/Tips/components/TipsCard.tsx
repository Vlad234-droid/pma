import React, { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Rule, CreateRule, useStyle } from '@pma/dex-wrapper';
import { tipsActions } from '@pma/store';
import { Page } from 'pages';
import { buildPath } from 'features/Routes/utils';
import { paramsReplacer } from 'utils';
import { formatDateStringFromISO } from 'utils/date';
import { TipsProps } from '../types';
import { PushTipModal, ViewHistoryModal } from '.';
import { TileWrapper } from 'components/Tile';
import { Trans } from 'components/Translation';
import tipCardImage from 'images/tipCard.png';

export type TipsCardProps = {
  card: TipsProps;
};

export const TIPS_CARD = 'tips-card';
export const VIEW_HISTORY_BTN = 'view-history-btn';
export const PUSH_TIP_BTN = 'push-tip-btn';
export const EDIT_TIP_BTN = 'edit-tip-btn';

const TipsCard: FC<TipsCardProps> = ({ card }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditTip = () => {
    const pathname = paramsReplacer(buildPath(`${Page.EDIT_TIP}`), { ':tipUuid': card.uuid });
    navigate(pathname);
  };

  const tipPushedTime = formatDateStringFromISO(card.updatedTime, 'dd/MM/yyyy HH:mm');

  const [isShowViewHistoryModal, setShowViewHistoryModal] = useState(false);
  const [isShowPushModal, setShowPushModal] = useState(false);

  const handleShowViewHistoryModal = () => {
    setShowViewHistoryModal(true);
  };

  const handleCloseViewHistoryModal = () => {
    setShowViewHistoryModal(false);
  };

  const handlePushTip = () => {
    setShowPushModal(true);
  };

  const handleClosePushTipModal = () => {
    setShowPushModal(false);
  };

  const handleConfirmBtnClick = () => {
    dispatch(tipsActions.publishTip(card.uuid));
  };

  return (
    <Fragment>
      <div data-test-id={TIPS_CARD} className={css(cardWrapper({ mobileScreen }))}>
        <TileWrapper customStyle={cardStyle({ mobileScreen })}>
          <div className={css(tipImageWrapStyle({ mobileScreen }))}>
            <div className={css(tipImage, { backgroundImage: `url(${tipCardImage})` })} />
          </div>
          <div className={css(tipInfoWrap({ mobileScreen }))}>
            <div className={css(tipTitle({ mobileScreen }))}>{card.title}</div>
            <div className={css(tipText({ mobileScreen }))}>{card.description}</div>
            <div className={css({ marginTop: '8px', display: 'flex' })}>
              <div className={css(lastPushStyle({ mobileScreen }))}>
                <Trans i18nKey='last_push'>Last push</Trans>:{' '}
                {card.published ? tipPushedTime : <Trans i18nKey='was_not_pushed'>was not pushed</Trans>}
              </div>
              <div
                data-test-id={VIEW_HISTORY_BTN}
                className={css(viewHistoryStyle({ mobileScreen }))}
                onClick={handleShowViewHistoryModal}
              >
                <Trans i18nKey='view_history'>View history</Trans>
              </div>
            </div>
          </div>
          <div className={css(cardRightBlock({ mobileScreen }))}>
            <div className={css(targetStyle({ mobileScreen }))}>
              <span className={css({ color: theme.colors.tescoBlue })}>
                <Trans i18nKey='target'>Target</Trans>:
              </span>{' '}
              {card.targetOrganisation.name}
            </div>
            <div className={css(cardControls)}>
              <Button data-test-id={EDIT_TIP_BTN} mode='inverse' onPress={handleEditTip} styles={[cardButton]}>
                <Trans i18nKey='edit'>Edit</Trans>
              </Button>
              <Button data-test-id={PUSH_TIP_BTN} onPress={handlePushTip} styles={[cardButton]}>
                <Trans i18nKey='push'>Push</Trans>
              </Button>
            </div>
          </div>
        </TileWrapper>
      </div>

      {isShowViewHistoryModal && <ViewHistoryModal card={card} handleCloseModal={handleCloseViewHistoryModal} />}
      {isShowPushModal && (
        <PushTipModal card={card} handleCloseModal={handleClosePushTipModal} handleConfirm={handleConfirmBtnClick} />
      )}
    </Fragment>
  );
};

const cardWrapper: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    padding: mobileScreen ? '0 8px' : 0,
    marginBottom: '10px',
  };
};

const cardStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    padding: mobileScreen ? '16px' : '24px',
    width: mobileScreen ? '100%' : '80%',
    display: 'flex',
    flexWrap: mobileScreen ? 'wrap' : 'nowrap',
  };
};

const tipInfoWrap: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    maxWidth: mobileScreen ? '300px' : 'auto',
  };
};

const tipImageWrapStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    marginRight: mobileScreen ? '15px' : '24px',
    marginBottom: '10px',
  };
};

const tipImage: Rule = {
  width: '48px',
  height: '48px',
  backgroundPosition: 'center center',
  backgroundSize: '48px auto',
  backgroundRepeat: 'no-repeat',
};

const tipTitle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontWeight: theme.font.weight.bold,
    color: theme.colors.tescoBlue,
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
        }
      : {
          fontSize: theme.font.fixed.f18.fontSize,
          lineHeight: theme.font.fixed.f18.lineHeight,
        }),
  });

const tipText: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    marginTop: '5px',
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
          maxWidth: 'auto',
        }
      : {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
          maxWidth: '400px',
        }),
  });

const lastPushStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    color: theme.colors.grayscale,
    letterSpacing: '0px',
    ':after': {
      content: '"•"',
      margin: '0 7px 0',
    },
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

const targetStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
          maxWidth: 'auto',
        }
      : {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
          maxWidth: '400px',
        }),
  });

const viewHistoryStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    color: theme.colors.tescoBlue,
    cursor: 'pointer',
    letterSpacing: '0px',
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

const cardRightBlock: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    display: 'flex',
    marginLeft: 'auto',
    ...(mobileScreen
      ? {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '15px',
          width: '100%',
        }
      : {
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'unset',
          marginTop: 0,
          width: 'auto',
        }),
  };
};

const cardControls: Rule = () => {
  return {
    display: 'flex',
    marginTop: 'auto',
  };
};

const cardButton: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  padding: '7px 16px',
  height: 'auto',
  border: `2px solid ${theme.colors.tescoBlue}`,
  marginLeft: '10px',
  fontWeight: theme.font.weight.bold,
});

export default TipsCard;
