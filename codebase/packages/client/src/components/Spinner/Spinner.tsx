import React, { FC, useEffect, useState } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

type Props = {
  withText?: boolean;
};

const Spinner: FC<Props> = ({ withText = false }) => {
  const { css } = useStyle();
  const [increment, setIncrement] = useState<number>(0);
  const elem = document.getElementById('spinner');

  const incrementDegree = () => {
    setIncrement((increment) => increment +10);
  };

  useEffect(() => {
    console.log('rendered');
    const rotationInterval = setInterval(incrementDegree, 30);

    return () => {
      clearTimeout(rotationInterval);
    };
  }, []);

  useEffect(() => {
    if (elem) {
      elem.style.transform = `rotate(${increment}deg)`;
    }

    if (increment === 360) {
      setIncrement(0);
    }

  }, [increment]);

  return (
    <div className={css(wrapperStyles)}>
      <div className={css(loaderStyles)} id='spinner'/>
      {withText && <span className={css(textStyles)}>Loading...</span>}
    </div>
  );
};

export default Spinner;

const wrapperStyles: Rule = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
  width: '100%',
});

const loaderStyles: Rule = ({ theme }) => ({
  border: '3px solid #f3f3f3',
  borderTop: `3px solid ${theme.colors.tescoBlue}`,
  borderRight: `3px solid ${theme.colors.tescoBlue}`,
  borderBottom: `3px solid ${theme.colors.tescoBlue}`,
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  transform: 'rotate(0deg)',
});

const textStyles: Rule = ({ theme }) => ({
  marginLeft: '16px',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
});
