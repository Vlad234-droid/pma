import React, { FC } from 'react';
import { useStyle, Rule, useBreakpoints, Button, theme } from '@dex-ddl/core';

const PushTipModalSuccess: FC = () => {
  const { css } = useStyle();

  const a = () => {
    console.log("a")
  }

  return (
    <>
      <div className={css(modalTitle)}>Tip has been pushed</div>
      <div className={css(modalTitle)}>Push Tip</div>
      <div className={css(modalSubTitleStyle)}>Do you want to push the below Tip?</div>
      <div className={css(modalText)}>Title:</div>
      <div className={css(modalBtnsWrap)}>
        <Button onPress={a} styles={[modalBtn]}>Push</Button>
      </div>
    </>
  )
}

const modalWrapper: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '24px 30px' : '24px 38px',
    maxWidth: '500px',
    width: mobileScreen ? 'calc(100% - 50px)' : '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
}

const modalTitle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontSize: mobileScreen ? '18px' : '20px',
    lineHeight: mobileScreen ? '22px' : '24px',
    fontWeight: 700,
    marginBottom: '8px'
  }
}

const modalSubTitleStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontSize: mobileScreen ? '14px' : '16px',
    lineHeight: mobileScreen ? '18px' : '20px',
    marginBottom: '20px'
  }
}

const modalText: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontSize: mobileScreen ? '14px' : '16px',
    lineHeight: mobileScreen ? '18px' : '20px',
    marginBottom: '5px'
  }
}

const modalBtnsWrap: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '20px',
  }
}

const modalBtn: Rule = () => {
  return { 
    fontWeight: 700,
    width: '50%',
    margin: '0 5px'
  }
}


export default PushTipModalSuccess;