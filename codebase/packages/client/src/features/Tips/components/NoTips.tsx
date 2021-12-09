import React, { FC, Fragment } from 'react';
import { useStyle, Rule, useBreakpoints, Icon as IconCore } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';

const NoTips: FC = () => {
  const { css } = useStyle();

  return (
    <Fragment>
      <div className={css({ })}>
        <TileWrapper customStyle={cardStyle}>
          <div className={css(cardInner)}>
            <div className={css({ marginRight: '10px' })}>
              <IconCore size='20px' graphic='information' />
            </div>
            <div className={css({})}>
              <div className={css(cardTitleStyle)}>
                Please create your first tip to be able to push it to colleagues.
              </div>
              <div className={css(cardTextleStyle)}>
                Tips should be also helpful to transition from the current system to the new one. They should offer guidance on how the application functionalities can be used or as an alert for upcoming events (reviews).
              </div>
            </div>
          </div>
        </TileWrapper>
      </div>
    </Fragment>
  )
}

const cardStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '16px' : '24px',
    width: mobileScreen ? "100%" : "80%",
  };
};

const cardInner: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '10px' : '15px', 
    borderRadius: '10px', 
    backgroundColor: '#f3f9fc',
    display: 'flex',
  }
};

const cardTitleStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return { 
    fontWeight: 700, 
    fontSize: mobileScreen ? '12px' : '14px', 
    lineHeight: mobileScreen ? '16px' : '18px', 
    color: theme.colors.tescoBlue,
  }
};

const cardTextleStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return { 
    fontSize: mobileScreen ? '12px' : '14px', 
    lineHeight: mobileScreen ? '16px' : '18px', 
    marginTop: '5px'
  }
};

export default NoTips;