import React, { FC, useState } from 'react';
import { useStyle, Rule, Button, theme, useBreakpoints } from '@dex-ddl/core';
import success from '../../../../public/success.jpg';

export type TipsFormModalProps = {
  handleCloseModal: () => void;
  handleLeavePage: () => void;
  text?: string;
  action: string;
};

const TipsFormModal: FC<TipsFormModalProps> = ({ text, action, handleCloseModal, handleLeavePage }) => {
  const { css } = useStyle();

  const discardModalText = {
    title: 'Discard changes',
    body: 'You have not saved your changes, are you sure you want to leave this page?'
  }

  const successModalText = {
    title: '',
    body: 'New Tip successfully created.'
  }

  return (
    <div className={css(TipsFormModalStyle)}>
      { action === 'success' ? <img src={success} alt='success' /> : '' }
      <div className={css(modalTitle)}>
        { action === 'discard' ? 'Discard changes' : action === 'success' ? 'Success' : ''}
      </div>
      <div className={css()}>You have not saved your changes, are you sure you want to leave this page?</div>
      <div className={css(formControlBtnsWrap)}>
        <Button 
          onPress={handleCloseModal} 
          mode="inverse" 
          styles={[formControlBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
        >Stay on this page</Button>
        <Button 
          onPress={handleLeavePage} 
          styles={[formControlBtn]}
        >Leave this page</Button>
      </div>
    </div>
  )
}

const TipsFormModalStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    position: "absolute", 
    background: "#fff", 
    width: "100%", 
    height: "100%", 
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...(mobileScreen 
      ?
      {
        padding: '30px 15px 100px',
        borderRadius: '24px',
      }
      :
      {
        padding: '40px 40px 100px',
        borderRadius: '32px',
      }
    )
  }
}

const modalTitle: Rule = () => {
  return {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '32px',
    margin: '0 0 16px',
  }
}

const formControlBtnsWrap: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: '#fff',
    borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
    ...(mobileScreen
      ?
      { 
        padding: '0 10px', 
      }
      :
      { 
        padding: '0 40px', 
        borderRadius: '0 0 32px 32px',
      }
    )
  }
}

const formControlBtn: Rule = () => {
  return {
    width: '50%',
    margin: '0 3px',
    fontWeight: 700,
    lineHeight: '20px',
  }
}

export default TipsFormModal;