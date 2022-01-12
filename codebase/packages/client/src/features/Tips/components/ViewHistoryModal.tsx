import React, { FC, useEffect } from 'react';
import { useStyle, Rule, useBreakpoints, Modal, Button, Icon, theme } from '@dex-ddl/core';
import { TipsProps } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { tipsActions, getTipHistorySelector } from '@pma/store';

export type ViewHistoryModal = {
  handleCloseModal: () => void;
  card: TipsProps;
};

const ViewHistoryModal: FC<ViewHistoryModal> = ({ handleCloseModal, card }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const tipHistory = useSelector(getTipHistorySelector);

  useEffect(() => {
    dispatch(tipsActions.getTipHistory(card.uuid));
  }, []);

  //TODO: remove border from last item;
  return (
    <Modal modalPosition='middle' modalContainerRule={[modalWrapper]}>
      <div className={css(vhTitleStyle)}>Activity History</div>
      <div className={css(vhSubTitleStyle)}>For tip: {card.title}</div>
      <div className={css(vhItemsWrap)}>
        {tipHistory?.map((item) => {
          const date = new Date(item.updatedTime);
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
          const titleDate = `${date.getDate()} ${
            months[date.getMonth()]
          } ${date.getFullYear()} ${date.getHours()}:${minutes}`;

          return (
            <div key={item.uuid} className={css(vhItemStyle)}>
              <div>
                <div className={css(vhItemTitle)}>
                  <Icon
                    graphic='calendar'
                    fill='white'
                    stroke={theme.colors.tescoBlue}
                    size='16px'
                    strokeWidth={2}
                    iconStyles={{ marginRight: '5px' }}
                  />
                  {titleDate}
                </div>
                <div className={css(vhItemSubtitle)}>Target: {item.targetOrganisation.name}</div>
              </div>
              {item.published ? (
                <div className={css(vhItemStatus)}>Pushed</div>
              ) : (
                <div className={css(vhItemStatus)}>{item.createdTime === item.updatedTime ? 'Created' : 'Edited'}</div>
              )}
            </div>
          );
        })}
      </div>
      <Button onPress={handleCloseModal} styles={[{ width: '145px', margin: 'auto auto 0', fontWeight: 700 }]}>
        Okay
      </Button>
    </Modal>
  );
};

//vh - View History

const modalWrapper: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '24px 30px' : '24px 38px',
    maxWidth: '500px',
    width: mobileScreen ? 'calc(100% - 50px)' : '100%',
    maxHeight: '404px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  };
};

const vhTitleStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontSize: mobileScreen ? '18px' : '20px',
    lineHeight: mobileScreen ? '22px' : '24px',
    fontWeight: 700,
    marginBottom: '8px',
  };
};

const vhSubTitleStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontSize: mobileScreen ? '14px' : '16px',
    lineHeight: mobileScreen ? '18px' : '20px',
    marginBottom: '20px',
  };
};

const vhItemsWrap: Rule = () => {
  return {
    marginBottom: '10px',
    width: '100%',
    maxHeight: '230px',
    height: '100%',
    overflowY: 'auto',
  };
};

const vhItemStyle: Rule = ({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px 0',
    borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
  };
};

const vhItemTitle: Rule = ({ theme }) => {
  return {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 700,
    color: theme.colors.tescoBlue,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  };
};

const vhItemSubtitle: Rule = () => {
  return {
    fontSize: '14px',
    lineHeight: '18px',
  };
};

const vhItemStatus: Rule = ({ theme }) => {
  return {
    fontSize: '14px',
    lineHeight: '18px',
    padding: '6px 12px',
    borderRadius: '50px',
    backgroundColor: theme.colors.backgroundDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

export default ViewHistoryModal;
