import React, { FC, useState, useRef, useEffect, useMemo, ChangeEvent } from 'react';
import { Button, useStyle } from '@pma/dex-wrapper';
import useClickOutside from 'hooks/useClickOutside';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Input } from '../Input';

type Event = { target: { value: string; name: string } };

export interface DurationField {
  name: string;
  value: string;
  onChange: (e: Event) => void;
  readonly?: boolean;
}

export const TEST_ID = 'duration-test-id';

export const DurationPicker: FC<DurationField> = ({ value, name, onChange, readonly = false }) => {
  const { css } = useStyle();
  const containerRef = useRef<HTMLDivElement>(null);
  const [weeks, setWeeks] = useState('');
  const [days, setDays] = useState('');
  const [isOpen, toggleOpen] = useState(false);

  const setWeeksDays = () => {
    const initWeeks = value?.match(/(\d+)(?=\s*W)/)?.[0] || '';
    const initDays = value?.match(/(\d+)(?=\s*D)/)?.[0] || '';
    if (initWeeks !== weeks) setWeeks(initWeeks);
    if (initDays !== days) setDays(initDays);
  };

  useEffect(() => {
    setWeeksDays();
  }, [value]);

  useEffect(() => {
    !isOpen && setWeeksDays();
  }, [isOpen]);

  useClickOutside(containerRef, () => {
    toggleOpen(false);
  });

  const handleChange = () => {
    let result = '';
    if (weeks && weeks !== '0') result = `${result}${weeks}W`;
    if (days && days !== '0') result = `${result}${days}D`;
    if (result) result = `P${result}`;
    onChange({ target: { value: result, name } });
  };

  const displayValue = useMemo(
    () => `${weeks ? `${weeks} weeks` : ''} ${days ? `${days} days` : ''}`.trim(),
    [weeks, days],
  );

  const handleChangeDays = (e: ChangeEvent<HTMLInputElement>) => setDays(e.target.value);
  const handleChangeWeeks = (e: ChangeEvent<HTMLInputElement>) => setWeeks(e.target.value);
  const handleDone = () => {
    handleChange();
    toggleOpen(!isOpen);
  };

  return (
    <div data-test-id={TEST_ID} className='dropdown-container' style={{ position: 'relative' }} ref={containerRef}>
      <Input onFocus={() => toggleOpen(!isOpen)} value={displayValue} readonly={readonly} />
      {isOpen && (
        <TileWrapper
          customStyle={{
            margin: '8px',
            padding: '25px',
            overflowY: 'visible',
            border: '2px solid gray',
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'visible',
            zIndex: '10',
          }}
        >
          <div
            data-test-id='duration-dialog'
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <label htmlFor='weeks'>
              <Trans i18nKey={'weeks'}>weeks</Trans>
            </label>
            <Input name='weeks' type='number' min={0} value={weeks} id={'weeks'} onChange={handleChangeWeeks} />
            <label htmlFor='days'>
              <Trans i18nKey={'days'}>days</Trans>
            </label>
            <Input name='days' type='number' min={0} id={'days'} value={days} onChange={handleChangeDays} />
            <Button data-test-id={'button'} onPress={handleDone}>
              <Trans i18nKey={'done'} />
            </Button>
          </div>
        </TileWrapper>
      )}
    </div>
  );
};
