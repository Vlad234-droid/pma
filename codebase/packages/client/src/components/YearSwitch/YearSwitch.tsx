import React, { FC, useEffect, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { getCurrentYear } from 'utils';

const YearSwitch: FC<{ currentYear: string; onChange: (year: string) => void }> = ({ currentYear, onChange }) => {
  const { css } = useStyle();
  const [years, setYears] = useState<Array<number> | []>([]);
  const [active, setActive] = useState<number>(Number(getCurrentYear()));

  useEffect(() => {
    setYears(() => [Number(currentYear), Number(currentYear) - 1, Number(currentYear) - 2]);
  }, []);

  return (
    <div className={css(yearWrapper)}>
      {years.map((year, index) => (
        <span
          data-year={year}
          className={css(yearStyles({ active: index === years?.findIndex((item) => item === active) }))}
          onClick={(e) => {
            //@ts-ignore
            onChange(e.target.dataset.year);
            //@ts-ignore
            setActive(Number(e.target.dataset.year));
          }}
          key={year}
        >
          {year}
        </span>
      ))}
    </div>
  );
};

const yearStyles: CreateRule<{ active: boolean }> =
  ({ active }) =>
  ({ theme }) => ({
    display: 'inline-block',
    padding: '6px 8px',
    background: active ? theme.colors.tescoBlue : 'transparent',
    color: !active ? theme.colors.tescoBlue : theme.colors.white,
    borderRadius: '4px',
    cursor: 'pointer',
  });
const yearWrapper: Rule = () => ({
  display: 'inline-flex',
  gap: '12px',
  marginBottom: '16px',
  marginLeft: '8px',
});

export default YearSwitch;
