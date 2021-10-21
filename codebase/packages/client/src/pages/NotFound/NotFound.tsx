import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Rule, useStyle } from '@dex-ddl/core';

export const NotFound: FC = () => {
  const history = useHistory();
  const { css } = useStyle();
  return (
    <div className={css(container)}>
      <div className={css(wrapper)}>
        <div className={css(textTop)}>OOPS! PAGE NOT FOUND</div>
        <div className={css(style404)}> 404</div>
        <div className={css(textBottom)}>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</div>
        <Button onPress={() => history.push('/')}>Back to Dashboard</Button>
      </div>
    </div>
  );
};

const container = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as Rule;

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '350px',
} as Rule;

const textTop = {
  textAlign: 'center',
  fontWeight: 500,
  fontSize: '15px',
} as Rule;

const style404 = {
  fontWeight: 800,
  fontSize: '120px',
  color: '#959392',
} as Rule;

const textBottom = {
  textAlign: 'center',
  fontSize: '12px',
  marginBottom: '16px',
} as Rule;
