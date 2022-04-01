import React, { FC, useEffect, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

type Props = {
  withText?: boolean;
  fullHeight?: boolean;
  id?: string;
};

const Spinner: FC<Props> = ({ withText = true, fullHeight = false, id = '1' }) => {
  const { css } = useStyle();
  const [increment, setIncrement] = useState<number>(0);
  const elem = document.getElementById(`spinner-${id}`);

  const incrementDegree = () => {
    setIncrement((increment) => increment + 10);
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
    <div data-test-id='spinner-wrapper' className={css(wrapperStyles({ fullHeight }))}>
      <div data-test-id={`spinner-${id}`} className={css(loaderStyles)} id={`spinner-${id}`} />
      {withText && <span className={css(textStyles)}>Loading...</span>}
    </div>
  );
};

export default Spinner;

const wrapperStyles: CreateRule<{ fullHeight: boolean }> = ({ fullHeight }) => {
  if (!fullHeight) {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 'auto',
    };
  }

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50vh',
  };
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
