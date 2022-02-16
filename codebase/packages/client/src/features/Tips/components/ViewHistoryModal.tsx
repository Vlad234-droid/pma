import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tipsActions, getTipHistorySelector } from '@pma/store';
import { useStyle, Rule, CreateRule, Theme, useBreakpoints, Modal, Button, Icon } from '@dex-ddl/core';
import { TipsProps } from '../types';
import { formatDateStringFromISO, DATE_TIME_STRING_FORMAT } from 'utils/date';

export type ViewHistoryModal = {
  handleCloseModal: () => void;
  card: TipsProps;
};

const ViewHistoryModal: FC<ViewHistoryModal> = ({ handleCloseModal, card }) => {
  const { css, theme } = useStyle();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const tipHistory = useSelector(getTipHistorySelector);

  useEffect(() => {
    dispatch(tipsActions.getTipHistory(card.uuid));
  }, []);

  return (
    <Modal modalPosition='middle' modalContainerRule={[modalWrapper({mobileScreen})]}>
      <div className={css(vhTitleStyle({mobileScreen, theme}))}>Activity History</div>
      <div className={css(vhSubTitleStyle({mobileScreen, theme}))}>For tip: {card.title}</div>
      <div className={css(vhItemsWrap)}>
        {tipHistory?.map((item, idx) => {
          const titleDate = formatDateStringFromISO(item.updatedTime, DATE_TIME_STRING_FORMAT);
          const isLastItem: boolean = idx === tipHistory.length - 1 ? true : false;

          return (
            <div key={item.uuid} className={css(vhItemStyle({isLastItem, theme}))}>
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
      <Button onPress={handleCloseModal} styles={[modalBtnStyles]}>
        Okay
      </Button>
    </Modal>
  );
};

//vh - View History

const modalWrapper: CreateRule<{mobileScreen: boolean}> = ({mobileScreen}) => {
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

const vhTitleStyle: CreateRule<{mobileScreen: boolean; theme: Theme}> = ({mobileScreen, theme}) => {
  return {
    fontWeight: theme.font.weight.bold,
    marginBottom: '8px',
    ...(mobileScreen 
      ? {
          fontSize: theme.font.fixed.f18.fontSize,
          lineHeight: theme.font.fixed.f18.lineHeight,
        } : {
          fontSize: theme.font.fixed.f20.fontSize,
          lineHeight: theme.font.fixed.f20.lineHeight,
        })
  };
};

const vhSubTitleStyle: CreateRule<{mobileScreen: boolean; theme: Theme}> = ({mobileScreen, theme}) => {
  return {
    marginBottom: '20px',
    ...(mobileScreen 
      ? {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
        } : {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
        })
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

const vhItemStyle: CreateRule<{isLastItem: boolean; theme: Theme}> = ({isLastItem, theme}) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px 0',
    borderBottom: !isLastItem ? `1px solid ${theme.colors.backgroundDarkest}` : '',
  };
};

const vhItemTitle: Rule = ({theme}) => {
  return {
    fontSize: theme.font.fixed.f14.fontSize,
    lineHeight: theme.font.fixed.f14.lineHeight,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.tescoBlue,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  };
};

const vhItemSubtitle: Rule = ({theme}) => {
  return {
    fontSize: theme.font.fixed.f14.fontSize,
    lineHeight: theme.font.fixed.f14.lineHeight,
  };
};

const vhItemStatus: Rule = ({theme}) => {
  return {
    fontSize: theme.font.fixed.f14.fontSize,
    lineHeight: theme.font.fixed.f14.lineHeight,
    padding: '6px 12px',
    borderRadius: '50px',
    backgroundColor: theme.colors.backgroundDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const modalBtnStyles: Rule = ({theme}) => {
  return {
    width: '145px',
    margin: 'auto auto 0',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    fontWeight: theme.font.weight.bold,
  }
}

export default ViewHistoryModal;
