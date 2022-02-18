import React, { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Rule, CreateRule, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { tipsActions } from '@pma/store';
import { Page } from 'pages';
import { buildPath } from 'features/Routes/utils';
import { paramsReplacer } from 'utils';
import { formatDateStringFromISO } from 'utils/date';
import { TipsProps } from '../types';
import { PushTipModal, ViewHistoryModal } from '.';
import { TileWrapper } from 'components/Tile';
import tipCardImage from 'images/tipCard.png';

export type TipsCardProps = {
  card: TipsProps;
};

export const TIPS_CARD = 'tips-card';
export const VIEW_HISTORY_BTN = 'view-history-btn';
export const PUSH_TIP_BTN = 'push-tip-btn';

const TipsCard: FC<TipsCardProps> = ({ card }) => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

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
      <div data-test-id={TIPS_CARD} className={css(cardWrapper({mobileScreen}))}>
        <TileWrapper customStyle={cardStyle({mobileScreen})}>
          <div className={css(tipImageWrapStyle({mobileScreen}))}>
            <div className={css(tipImage, { backgroundImage: `url(${tipCardImage})` })} />
          </div>
          <div className={css(tipInfoWrap({mobileScreen}))}>
            <div className={css(tipTitle({mobileScreen, theme}))}>{card.title}</div>
            <div className={css(tipText({mobileScreen, theme}))}>{card.description}</div>
            <div className={css({ marginTop: '8px', display: 'flex' })}>
              <div className={css(lastPushStyle({mobileScreen, theme}))}>
                Last push: {card.published ? tipPushedTime : 'was not pushed'}
              </div>
              <div
                data-test-id={VIEW_HISTORY_BTN}
                className={css(viewHistoryStyle({mobileScreen, theme}))}
                onClick={handleShowViewHistoryModal}
              >
                View history
              </div>
            </div>
          </div>
          <div className={css(cardRightBlock({mobileScreen}))}>
            <div className={css(targetStyle({mobileScreen, theme}))}>
              <span className={css({ color: theme.colors.tescoBlue })}>Target:</span> {card.targetOrganisation.name}
            </div>
            <div className={css(cardControls)}>
              <Button mode='inverse' onPress={handleEditTip} styles={[cardButton]}>
                Edit
              </Button>
              <Button data-test-id={PUSH_TIP_BTN} onPress={handlePushTip} styles={[cardButton]}>
                Push
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

const cardWrapper: CreateRule<{mobileScreen: boolean}> = ({mobileScreen}) => {
  return {
    padding: mobileScreen ? '0 8px' : 0,
    marginBottom: '10px',
  };
};

const cardStyle: CreateRule<{mobileScreen: boolean}> = ({mobileScreen}) => {
  return {
    padding: mobileScreen ? '16px' : '24px',
    width: mobileScreen ? '100%' : '80%',
    display: 'flex',
    flexWrap: mobileScreen ? 'wrap' : 'nowrap',
  };
};

const tipInfoWrap: CreateRule<{mobileScreen: boolean}> = ({mobileScreen}) => {
  return {
    maxWidth: mobileScreen ? '300px' : 'auto',
  };
};

const tipImageWrapStyle: CreateRule<{mobileScreen: boolean}> = ({mobileScreen}) => {
  return {
    marginRight: mobileScreen ? '15px': '24px',
    marginBottom: '10px',
  }
}

const tipImage: Rule = () => {
  return {
    width: '48px',
    height: '48px',
    backgroundPosition: 'center center',
    backgroundSize: '48px auto',
    backgroundRepeat: 'no-repeat',
  };
};

const tipTitle: CreateRule<{mobileScreen: boolean; theme: Theme}> = ({mobileScreen, theme}) => {
  return {
    fontWeight: 700,
    color: theme.colors.tescoBlue,
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight
        } : {
          fontSize: theme.font.fixed.f18.fontSize,
          lineHeight: theme.font.fixed.f18.lineHeight
        })
  };
};

const tipText: CreateRule<{mobileScreen: boolean; theme: Theme}> = ({mobileScreen, theme}) => {
  return {
    marginTop: '5px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
          maxWidth: 'auto',
        } : {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
          maxWidth: '400px',
        })
  };
};

const lastPushStyle: CreateRule<{mobileScreen: boolean; theme: Theme}> = ({mobileScreen, theme}) => {
  return {
    color: '#666',
    ':after': {
      content: '"•"',
      margin: '0 7px 0',
    },
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f12.fontSize,
          lineHeight: theme.font.fixed.f12.lineHeight
        } : {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight
        })
  };
};

const targetStyle: CreateRule<{mobileScreen: boolean; theme: Theme}> = ({mobileScreen, theme}) => {
  return {
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
          maxWidth: 'auto',
        } : {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
          maxWidth: '400px',
        })
  };
};

const viewHistoryStyle: CreateRule<{mobileScreen: boolean; theme: Theme}> = ({mobileScreen, theme}) => {
  return {
    color: theme.colors.tescoBlue,
    cursor: 'pointer',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f12.fontSize,
          lineHeight: theme.font.fixed.f12.lineHeight
        } : {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight
        })
  };
};

const cardRightBlock: CreateRule<{mobileScreen: boolean}> = ({mobileScreen}) => {
  return {
    display: 'flex',
    marginLeft: 'auto',
    ...(mobileScreen
      ? {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop:'15px',
          width: '100%',
        } : {
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'unset',
          marginTop: 0,
          width: 'auto',
        })
  };
};

const cardControls: Rule = () => {
  return {
    display: 'flex',
    marginTop: 'auto',
  };
};

const cardButton: Rule = ({theme}) => {
  return {
    fontSize: theme.font.fixed.f14.fontSize,
    lineHeight: theme.font.fixed.f14.lineHeight,
    padding: '7px 16px',
    height: 'auto',
    border: `1px solid ${theme.colors.tescoBlue}`,
    marginLeft: '10px',
    fontWeight: theme.font.weight.bold,
  };
};

export default TipsCard;
