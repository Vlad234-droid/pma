import React, { FC, Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyle, Rule, useBreakpoints, Button, theme } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import { buildPath } from 'features/Routes/utils';
import { TipsProps } from '../types';
import { ViewHistoryModal, PushTipModal } from '.';

export type TipsCardProps = {
  card: TipsProps;
};

const TipsCard: FC<TipsCardProps> = ({ card }) => {
  const { css } = useStyle();
  const history = useHistory();

  const handleEditTip = () => {
    const pathname = paramsReplacer(buildPath(`${Page.EDIT_TIP}`), { ':tipUuid': card.uuid });
    history.push(pathname);
  };

  const date = new Date(card.updatedTime);
  const pushedTime = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

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

  return (
    <Fragment>
      <div className={css(cardWrapper)}>
        <TileWrapper customStyle={cardStyle}>
          <div>
            <div className={css(tipImage, { backgroundImage: `url(${card.imageLink})` })} />
          </div>
          <div className={css(tipInfoWrap)}>
            <div className={css(tipTitle)}>{card.title}</div>
            <div className={css(tipText)}>{card.description}</div>
            <div className={css({ marginTop: '8px', display: 'flex' })}>
              <div className={css(lastPushStyle)}>Last push: {card.published ? pushedTime : 'was not pushed'}</div>
              <div className={css(viewHistoryStyle)} onClick={handleShowViewHistoryModal}>
                View history
              </div>
            </div>
          </div>
          <div className={css(cardRightBlock)}>
            <div className={css(targetStyle)}>
              <span className={css({ color: theme.colors.tescoBlue })}>Target:</span> {card.targetOrganisation.name}
            </div>
            <div className={css(cardControls)}>
              <Button mode='inverse' onPress={handleEditTip} styles={[cardButton]}>
                Edit
              </Button>
              <Button onPress={handlePushTip} styles={[cardButton]}>
                Push
              </Button>
            </div>
          </div>
        </TileWrapper>
      </div>

      {isShowViewHistoryModal && <ViewHistoryModal card={card} handleCloseModal={handleCloseViewHistoryModal} />}
      {isShowPushModal && <PushTipModal card={card} handleCloseModal={handleClosePushTipModal} />}
    </Fragment>
  );
};

const cardWrapper: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '0 8px' : 0,
  };
};

const cardStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '16px' : '24px',
    width: mobileScreen ? '100%' : '80%',
    marginBottom: '10px',
    display: 'flex',
    flexWrap: mobileScreen ? 'wrap' : 'nowrap',
  };
};

const tipInfoWrap: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    maxWidth: mobileScreen ? '300px' : 'auto',
  };
};

const tipImage: Rule = () => {
  return {
    width: '48px',
    height: '48px',
    marginRight: '24px',
    backgroundPosition: 'center center',
    backgroundSize: '48px auto',
    backgroundRepeat: 'no-repeat',
  };
};

const tipTitle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontWeight: 700,
    fontSize: mobileScreen ? '16px' : '18px',
    lineHeight: mobileScreen ? '20px' : '22px',
    color: theme.colors.tescoBlue,
  };
};

const tipText: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    lineHeight: mobileScreen ? '18px' : '20px',
    fontSize: mobileScreen ? '14px' : '16px',
    maxWidth: mobileScreen ? 'auto' : '400px',
    marginTop: '5px',
  };
};

const lastPushStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    lineHeight: mobileScreen ? '16px' : '18px',
    fontSize: mobileScreen ? '12px' : '14px',
    color: '#666',
    ':after': {
      content: '"•"',
      margin: '0 7px 0',
    },
  };
};

const targetStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontSize: mobileScreen ? '14px' : '16px',
    lineHeight: mobileScreen ? '18px' : '20px',
  };
};

const viewHistoryStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    lineHeight: mobileScreen ? '16px' : '18px',
    fontSize: mobileScreen ? '12px' : '14px',
    color: theme.colors.tescoBlue,
    cursor: 'pointer',
  };
};

const cardRightBlock: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    flexDirection: mobileScreen ? 'row' : 'column',
    marginLeft: 'auto',
    marginTop: mobileScreen ? '15px' : 0,
    width: mobileScreen ? '100%' : 'auto',
    alignItems: mobileScreen ? 'center' : 'flex-end',
    justifyContent: mobileScreen ? 'space-between' : 'unset',
  };
};

const cardControls: Rule = () => {
  return {
    display: 'flex',
    marginTop: 'auto',
  };
};

const cardButton: Rule = () => {
  return {
    fontSize: '14px',
    padding: '7px 16px',
    lineHeight: '18px',
    height: 'auto',
    border: `1px solid ${theme.colors.tescoBlue}`,
    marginLeft: '10px',
    fontWeight: 'bold',
  };
};

export default TipsCard;
