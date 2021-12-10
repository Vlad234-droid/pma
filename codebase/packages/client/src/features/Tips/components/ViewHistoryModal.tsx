import React, { FC, useEffect } from 'react';
import { useStyle, Rule, useBreakpoints, Modal, Button } from '@dex-ddl/core';
import { TipsProps } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { tipsActions } from '@pma/store';


export type ViewHistoryModal = {
  handleCloseModal: () => void;
  card: TipsProps;
};

const ViewHistoryModal: FC<ViewHistoryModal> = ({ handleCloseModal, card }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(card.uuid)
    dispatch(
      tipsActions.getTipHistory(card.uuid),
    );
  }, []);
  return (
    <Modal modalPosition="middle">
      <div className={css({})}>Activity History</div>
      <div className={css({})}>For tip: {card.title}</div>
      <Button onPress={handleCloseModal} styles={[]}>Okay</Button>
    </Modal>
  )
}

const cardWrapper: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '0 8px' : 0,
  }
}

export default ViewHistoryModal;