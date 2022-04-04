import React, { useState, FC, useEffect, useCallback, ChangeEvent, MouseEvent, useRef } from 'react';
import debounce from 'lodash.debounce';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { formatDateStringFromISO, DATE_FORMAT } from 'utils';
import Calendar from 'components/Calendar';
import { Input } from 'components/Form';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';
import useEventListener from 'hooks/useEventListener';

type DateEvent = {
  target: {
    type: string;
    value: string;
    name: string;
  };
};

type Props = {
  onChange: ({ target }: DateEvent) => void;
  onError?: (error: string) => void;
  name: string;
  value?: string;
  minDate?: Date;
  isValid?: boolean;
  isOnTop?: boolean;
  readonly?: boolean;
};

const DATE_REGEXP = /\d{1,2}\/\d{1,2}\/\d{4}/;
const INVALID_DATE = 'Invalid Date';
export const TEST_ID = 'DatepickerId';
export const INPUT_TEST_ID = 'DatepickerId';

const checkIsValidDate = (date) => DATE_REGEXP.test(date);

export const transformDateToString = (date: Date) =>
  date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

export const buildTargetObject = (value: string, name: string) => ({ target: { type: 'date', value, name } });

const Datepicker: FC<Props> = ({ onChange, onError, value, name, minDate, isValid, isOnTop = false, readonly }) => {
  const [isOpen, toggleOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<string | undefined>();
  const [date, changeDate] = useState<Date | undefined>();
  const { css } = useStyle();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);

  const dataChange = useCallback(
    debounce((value: string) => {
      if (!value) {
        onChange(buildTargetObject('', name));
      }
      if (!checkIsValidDate(value)) {
        onError && onError(t('please_input_valid_date'));
        return;
      }
      const newValue = value.split('/').reverse().join('-');
      const newDate = new Date(newValue);
      const verificationValue = transformDateToString(newDate);
      if (minDate && newDate < minDate) {
        onError && onError(t('min_valid_date', { minDate: transformDateToString(minDate) }));
        return;
      }
      if (newDate.toString() === INVALID_DATE) {
        onError && onError(t('please_input_valid_date'));
        return;
      }
      if (verificationValue !== value) {
        setCurrentValue(verificationValue);
        return;
      }
      newDate.setHours(0);
      newDate.setMinutes(0);
      newDate.setMilliseconds(0);
      changeDate(newDate);
      onChange(buildTargetObject(formatDateStringFromISO(newDate.toISOString(), DATE_FORMAT), name));
    }, 300),
    [],
  );

  useEffect(() => {
    if (currentValue === undefined) return;
    dataChange(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (value) {
      setCurrentValue(transformDateToString(new Date(value)));
    }
  }, [value]);

  const handleClickDay = (date) => {
    if (!date) return;
    setCurrentValue(transformDateToString(date));
    toggleOpen(false);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      toggleOpen(false);
    }
  };

  useEventListener('click', handleClickOutside);

  return (
    <>
      <div ref={ref} className={css(wrapperRule)} data-test-id={TEST_ID}>
        <Input
          value={currentValue}
          onChange={handleChangeValue}
          customStyles={inputRule}
          data-test-id={INPUT_TEST_ID}
          placeholder={'dd/mm/yyyy'}
          isValid={isValid}
          readonly
        />
        <button
          disabled={readonly}
          type={'button'}
          onClick={() => toggleOpen(!isOpen)}
          className={css(buttonRule({ error: !isValid }))}
        >
          <Icon graphic={'calender'} />
        </button>
        {isOpen && (
          <div className={css(calendarWrapperRule({ isOnTop }))}>
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
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    left: 0,
    position: 'absolute',
    height: '100%',
  });

const inputRule: Rule = {
  borderTopLeftRadius: '0px',
  borderBottomLeftRadius: '0px',
  borderLeft: 0,
  paddingLeft: '57px',
};

const calendarWrapperRule: CreateRule<{ isOnTop: boolean }> =
  ({ isOnTop }) =>
  ({ zIndex }) => {
    if (isOnTop) {
      return {
        position: 'absolute',
        bottom: '100%',
        zIndex: zIndex?.i10,
      };
    }

    return {
      position: 'absolute',
      top: '100%',
      zIndex: zIndex?.i10,
    };
  };
