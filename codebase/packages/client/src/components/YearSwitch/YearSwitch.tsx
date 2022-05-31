import React, { FC, useState } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';

import { getCurrentYear } from 'utils';

export const TEST_ID = 'wrapper-id';
export const TEST_LABEL = 'label-id';

const YearSwitch: FC<{ currentYear: string; onChange: (year: string) => void }> = ({ currentYear, onChange }) => {
  const { css } = useStyle();
  const [years] = useState<Array<number> | []>([Number(currentYear), Number(currentYear) - 1, Number(currentYear) - 2]);
  const [active, setActive] = useState<number>(Number(getCurrentYear()));

  return (
    <div className={css(yearWrapper)} data-test-id={TEST_ID}>
      <p className={css(textStyle)}>
        <Trans i18nKey={'display_objectives_for'}>Display objectives for:</Trans>
      </p>
      {years.map((year, index) => (
        <label data-test-id={TEST_LABEL} key={year} htmlFor={year} className={css(labelStyle)}>
          <Radio
            name={year}
            checked={index === years?.findIndex((item) => item === active)}
            id={year}
            onChange={(e) => {
              onChange(e.target.value);
              setActive(Number(e.target.value));
            }}
            value={year}
          />
          <span className={css(titleStyle)}>{year}</span>
        </label>
      ))}
    </div>
  );
};

const titleStyle: Rule = {
  marginLeft: '9px',
};

const labelStyle: Rule = {
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '64px',
  cursor: 'pointer',
  ':nth-child(2)': {
    marginLeft: '12px',
  },
} as Styles;

const yearWrapper: Rule = () => ({
  display: 'inline-flex',
  gap: '12px',
  marginLeft: '8px',
  marginTop: '20px',
});
const textStyle: Rule = ({ theme }) => ({
  color: theme.colors.base,
  fontSize: theme.font.fixed.f16.fontSize,
});

export default YearSwitch;
