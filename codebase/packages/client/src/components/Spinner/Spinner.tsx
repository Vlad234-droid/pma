import React, { FC, useEffect, useState } from 'react';
import {CreateRule, Rule, useStyle} from '@dex-ddl/core';

type Props = {
  withText?: boolean;
  fullHeight?: boolean;
  name?: string;
};

const Spinner: FC<Props> = ({ withText = false, fullHeight = false, name = 'single' }) => {
  const { css } = useStyle();
  const [increment, setIncrement] = useState<number>(0);
  const elem = document.getElementById(`spinner-${name}`);

  const incrementDegree = () => {
    setIncrement((increment) => increment +10);
  };

  useEffect(() => {
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
    <div className={css(wrapperStyles({ fullHeight }))}>
      <div className={css(loaderStyles)} id={`spinner-${name}`}/>
      {withText && <span className={css(textStyles)}>Loading...</span>}
    </div>
  );
};

export default Spinner;

const wrapperStyles: CreateRule<{ fullHeight: boolean }> = ({ fullHeight }) => {
  if (!fullHeight) {
    return ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    });
  }

  return ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50vh',
  })
};

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
