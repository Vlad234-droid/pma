import React, { FC } from 'react';

import { useStyle, Rule } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

type Props = {
  steps: Array<number | undefined>;
  step: number;
  onSelectStep?: any;
};
const Stepper: FC<Props> = ({ steps, step, onSelectStep }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div className={css(wrapperStyle)}>
      {steps.map((singleStep, index) => {
        return (
          <div
            onClick={() => {
              onSelectStep && onSelectStep(index);
            }}
            className={css(step === index ? activeStepStyle : stepStyle)}
            key={index}
          >
            <span>{t('objective_number', `Priority ${singleStep}`, { ns: 'bank', number: singleStep })}</span>
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
