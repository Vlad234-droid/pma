import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

type Props = {
  steps: string[];
  step: number;
};
const Stepper: FC<Props> = ({ steps, step }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      {steps.map((singleStep, index) => {
        if (step === index + 1) {
          return (
            <div className={css(activeStepStyle)} key={index}>
              <span>{singleStep}</span>
            </div>
          );
        }
        return (
          <div className={css(stepStyle)} key={index}>
            <span>{singleStep}</span>
          </div>
        );
      })}
    </div>
  );
};

const wrapperStyle: Rule = { display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' };

const stepStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  color: theme.colors.tescoBlue,
});

const activeStepStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  borderRadius: '10px',
  padding: '6px 12px 6px 12px',
});

export default Stepper;
