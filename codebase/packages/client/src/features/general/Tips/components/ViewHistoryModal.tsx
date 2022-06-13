import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tipsActions, getTipHistorySelector } from '@pma/store';
import { useStyle, Rule, CreateRule, Modal, Button, Icon } from '@pma/dex-wrapper';
import { TipsProps } from '../types';
import { formatDateStringFromISO, DATE_TIME_STRING_FORMAT } from 'utils/date';
import { Trans } from 'components/Translation';

export type ViewHistoryModal = {
  handleCloseModal: () => void;
  card: TipsProps;
};

export const VIEW_HISTORY_MODAL = 'view-history-modal';
export const CLOSE_VIEW_HISTORY_MODAL_BTN = 'close-view-history-modal-btn';

const ViewHistoryModal: FC<ViewHistoryModal> = ({ handleCloseModal, card }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();
  const tipHistory = useSelector(getTipHistorySelector);

  useEffect(() => {
    dispatch(tipsActions.getTipHistory(card.uuid));
  }, []);

  return (
    <Modal modalPosition='middle' modalContainerRule={[modalWrapper({ mobileScreen })]}>
      <div data-test-id={VIEW_HISTORY_MODAL} className={css(modalInner)}>
        <div className={css(vhTitleStyle({ mobileScreen }))}>
          <Trans i18nKey='activity_history'>Activity History</Trans>
        </div>
        <div className={css(vhSubTitleStyle({ mobileScreen }))}>
          <Trans i18nKey='for_tip'>For tip</Trans>: {card.title}
        </div>
        <div className={css(vhItemsWrap)}>
          {tipHistory?.map((item, idx) => {
            const titleDate = formatDateStringFromISO(item.updatedTime, DATE_TIME_STRING_FORMAT);
            const isLastItem: boolean = idx === tipHistory.length - 1;

            return (
              <div key={item.uuid} className={css(vhItemStyle({ isLastItem }))}>
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
                  <div className={css(vhItemSubtitle)}>
                    <Trans i18nKey='target'>Target</Trans>: {item.targetOrganisation.name}
                  </div>
                </div>
                {item.published ? (
                  <div className={css(vhItemStatus)}>
                    <Trans i18nKey='pushed'>Pushed</Trans>
                  </div>
                ) : (
                  <div className={css(vhItemStatus)}>
                    {item.createdTime === item.updatedTime ? (
                      <Trans i18nKey='created'>Created</Trans>
                    ) : (
                      <Trans i18nKey='edited'>Edited</Trans>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Button data-test-id={CLOSE_VIEW_HISTORY_MODAL_BTN} onPress={handleCloseModal} styles={[modalBtnStyles]}>
          <Trans i18nKey='okay'>Okay</Trans>
        </Button>
      </div>
    </Modal>
  );
};

//vh - View History

const modalWrapper: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  padding: mobileScreen ? '24px 30px' : '24px 38px',
  maxWidth: '500px',
  width: mobileScreen ? 'calc(100% - 50px)' : '100%',
  maxHeight: '404px',
  height: '100%',
});

const modalInner: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '100%',
  width: '100%',
};

const vhTitleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontWeight: theme.font.weight.bold,
    marginBottom: '8px',
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f18.fontSize,
          lineHeight: theme.font.fixed.f18.lineHeight,
        }
      : {
          fontSize: theme.font.fixed.f20.fontSize,
          lineHeight: theme.font.fixed.f20.lineHeight,
        }),
  });

const vhSubTitleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    marginBottom: '20px',
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f14.fontSize,
          lineHeight: theme.font.fixed.f14.lineHeight,
        }
      : {
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
        }),
  });

const vhItemsWrap: Rule = {
  marginBottom: '10px',
  width: '100%',
  maxHeight: '230px',
  height: '100%',
  overflowY: 'auto',
};

const vhItemStyle: CreateRule<{ isLastItem: boolean }> =
  ({ isLastItem }) =>
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px 0',
    // @ts-ignore
    borderBottom: !isLastItem ? `2px solid ${theme.colors.lightGray}` : '',
  });

const vhItemTitle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  fontWeight: theme.font.weight.bold,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
});

const vhItemSubtitle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
});

const vhItemStatus: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f14.fontSize,
    lineHeight: theme.font.fixed.f14.lineHeight,
    letterSpacing: '0px',
    padding: '6px 12px',
    borderRadius: '50px',
    backgroundColor: theme.colors.backgroundDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const modalBtnStyles: Rule = ({ theme }) => ({
  width: '145px',
  margin: 'auto auto 0',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
});

export default ViewHistoryModal;
