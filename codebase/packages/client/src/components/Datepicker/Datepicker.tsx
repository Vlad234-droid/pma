import React, { useState, FC, useEffect, useCallback, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { CreateRule, Rule, useStyle } from '@dex-ddl/core';
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
  isValid?: boolean;
};

const DATE_REGEXP = /\d{1,2}\/\d{1,2}\/\d{4}/;
const INVALID_DATE = 'Invalid Date';
export const TEST_ID = 'DatepickerId';
export const INPUT_TEST_ID = 'DatepickerId';

const checkIsValidDate = (date) => DATE_REGEXP.test(date);

const transformDateToString = (date: Date) =>
  date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

const Datepicker: FC<Props> = ({ onChange, value, name, minDate, isValid }) => {
  const [isOpen, toggleOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value ? transformDateToString(new Date(value)) : '');
  const [date, changeDate] = useState<Date | undefined>();
  const [error, setError] = useState<boolean>(false);
  const { css } = useStyle();

  const dataChange = useCallback(
    debounce((value: string) => {
      setError(false);
      if (!checkIsValidDate(value)) {
        setError(true);
        return;
      }
      const newValue = value.split('/').reverse().join('-');
      const newDate = new Date(newValue);
      if (newDate.toString() === INVALID_DATE || (minDate && newDate < minDate)) {
        setError(true);
        return;
      }
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

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
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
          isValid={isValid && !error}
        />
        <button type={'button'} onClick={() => toggleOpen(!isOpen)} className={css(buttonRule({ error }))}>
          <Icon graphic={'calender'} />
        </button>
        {isOpen && (
          <div className={css(calendarWrapperRule)}>
            <Calendar value={date} onClickDay={handleClickDay} minDate={minDate} />
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

const buttonRule: CreateRule<{ error: boolean }> =
  ({ error }) =>
  ({ theme }) => ({
    background: 'transparent',
    border: `1px solid ${error ? `${theme.colors.error}` : `${theme.colors.backgroundDarkest}`}`,
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
