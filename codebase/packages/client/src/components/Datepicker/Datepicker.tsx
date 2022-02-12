import React, { useState, FC, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Rule, useStyle } from '@dex-ddl/core';
import Calendar from 'components/Calendar';
import { Input } from 'components/Form';
import { Icon } from 'components/Icon';

type Props = {
  onChange: (date: Date) => void;
  value?: string;
};

const DATE_REGEXP = /\d{1,2}\/\d{1,2}\/\d{4}/;
const INVALID_DATE = 'Invalid Date';
export const TEST_ID = 'DatepickerId';
export const INPUT_TEST_ID = 'DatepickerId';

const checkIsValidDate = (date) => DATE_REGEXP.test(date);

const transformDateToString = (date: Date) =>
  date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

const Datepicker: FC<Props> = ({ onChange, value }) => {
  const [isOpen, toggleOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [date, changeDate] = useState<Date | undefined>();
  const { css } = useStyle();

  const dataChange = useCallback(
    debounce((value: string) => {
      if (!checkIsValidDate(value)) return;
      const newDate = new Date(value);
      if (newDate.toString() === INVALID_DATE) return;
      changeDate(newDate);
      if (value !== currentValue) onChange(newDate);
    }, 500),
    [],
  );

  useEffect(() => {
    if (!currentValue) return;
    dataChange(currentValue);
  }, [currentValue]);

  const handleClickDay = (date) => {
    if (!date) return;
    setCurrentValue(transformDateToString(date));
    toggleOpen(false);
  };

  const handleChangeValue = (e) => {
    setCurrentValue(e.target.value);
  };

  return (
    <>
      <div className={css(wrapperRule)} data-test-id={TEST_ID}>
        <Input
          value={currentValue}
          onChange={handleChangeValue}
          customStyles={inputRule}
          data-test-id={INPUT_TEST_ID}
        />
        <button onClick={() => toggleOpen(!isOpen)} className={css(buttonRule)}>
          <Icon graphic={'calender'} />
        </button>
        {isOpen && (
          <div className={css(calendarWrapperRule)}>
            <Calendar onChange={() => undefined} value={date} onClickDay={handleClickDay} />
          </div>
        )}
      </div>
    </>
  );
};

export default Datepicker;

const wrapperRule: Rule = {
  display: 'flex',
  flexWrap: 'nowrap',
  position: 'relative',
};

const buttonRule: Rule = ({ theme }) => ({
  background: 'transparent',
  border: `1px solid ${theme.colors.backgroundDarkest}`,
  borderTopRightRadius: '5px',
  borderBottomRightRadius: '5px',
});

const inputRule: Rule = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  borderRightWidth: 0,
};

const calendarWrapperRule: Rule = ({ zIndex }) => ({
  position: 'absolute',
  top: '100%',
  zIndex: zIndex.i10,
});
