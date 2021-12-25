import React, { FC } from 'react';
import { useStyle, Rule, Button, theme, useBreakpoints } from '@dex-ddl/core';
import success from '../../../../public/success.jpg';

export type TipsFormModalProps = {
  negativeBtnAction: () => void;
  positiveBtnAction: () => void;
  action: string;
  tipTitle?: string;
};

const TipsFormModal: FC<TipsFormModalProps> = ({ action, negativeBtnAction, positiveBtnAction, tipTitle }) => {
  const { css } = useStyle();

  const options = {
    discard: {
      title: 'Discard changes',
      body: 'You have not saved your changes, are you sure you want to leave this page?',
      negativeBtnText: 'Stay on this page',
      positiveBtnText: 'Leave this page',
      showImage: false,
    },
    create: {
      title: 'Success',
      body: 'New Tip successfully created.',
      negativeBtnText: '',
      positiveBtnText: 'Leave this page',
      showImage: true,
    },
    edit: {
      title: 'Success',
      body: 'Tip updated successfully.',
      negativeBtnText: '',
      positiveBtnText: 'Leave this page',
      showImage: true,
    },
    confirmDelete: {
      title: 'Delete',
      body: `Do you want to delete [${tipTitle}] tip?`,
      negativeBtnText: 'Cancel',
      positiveBtnText: 'Delete',
      showImage: false,
    },
    successDelete: {
      title: 'Delete',
      body: 'Tip successfully deleted.',
      negativeBtnText: '',
      positiveBtnText: 'Leave this page',
      showImage: true,
    },
    failure: {
      title: 'Oops',
      body: 'Something went wrong',
      negativeBtnText: '',
      positiveBtnText: 'Leave this page',
      showImage: false,
    }
  }

  return (
    <div className={css(TipsFormModalStyle)}>
      { options[action]['showImage'] && <img src={success} alt='success' /> }
      <div className={css(modalTitle)}>
        { options[action]['title'] }
      </div>
      <div className={css()}>
        { options[action]['body'] }
      </div>
      <div className={css(formControlBtnsWrap)}>
      { options[action]['negativeBtnText'] && 
          <Button 
            onPress={negativeBtnAction} 
            mode="inverse" 
            styles={[formControlBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
          >{ options[action]['negativeBtnText'] }</Button> 
      } 
        <Button 
          onPress={positiveBtnAction} 
          styles={[formControlBtn]}
        >{ options[action]['positiveBtnText'] }</Button>
      </div>
    </div>
  )
}

const TipsFormModalStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    position: "absolute", 
    top: 0,
    left: 0,
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
    justifyContent: 'center',
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