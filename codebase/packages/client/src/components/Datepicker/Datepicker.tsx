import React, { useState, FC, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Rule, useStyle } from '@dex-ddl/core';
import { formatDateStringFromISO, DATE_FORMAT } from 'utils';
import Calendar from 'components/Calendar';
import { Input } from 'components/Form';
import { Icon } from 'components/Icon';

type DateEvent = {
  target: {
    type: string;
    value: string;
    name: string;
  };
};

type Props = {
  onChange: ({ target }: DateEvent) => void;
  name: string;
  value?: string;
  minDate?: Date;
};

const DATE_REGEXP = /\d{1,2}\/\d{1,2}\/\d{4}/;
const INVALID_DATE = 'Invalid Date';
export const TEST_ID = 'DatepickerId';
export const INPUT_TEST_ID = 'DatepickerId';

const checkIsValidDate = (date) => DATE_REGEXP.test(date);

const transformDateToString = (date: Date) =>
  date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

const Datepicker: FC<Props> = ({ onChange, value, name, minDate }) => {
  const [isOpen, toggleOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value ? transformDateToString(new Date(value)) : '');
  const [date, changeDate] = useState<Date | undefined>();
  const { css } = useStyle();

  const dataChange = useCallback(
    debounce((value: string) => {
      if (!checkIsValidDate(value)) return;
      const newDate = new Date(value);
      if (newDate.toString() === INVALID_DATE || (minDate && minDate < newDate)) return;
      newDate.setHours(0);
      newDate.setMinutes(0);
      newDate.setMilliseconds(0);
      changeDate(newDate);
      onChange({ target: { type: 'date', value: formatDateStringFromISO(newDate.toISOString(), DATE_FORMAT), name } });
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
          placeholder={'dd/mm/yyyy'}
        />
        <button type={'button'} onClick={() => toggleOpen(!isOpen)} className={css(buttonRule)}>
          <Icon graphic={'calender'} />
        </button>
        {isOpen && (
          <div className={css(calendarWrapperRule)}>
            <Calendar onChange={() => undefined} value={date} onClickDay={handleClickDay} minDate={minDate} />
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
  border: `1px solid ${theme.colors.lightGray}`,
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
