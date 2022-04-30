import React, { FC, useState, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { Button, useStyle } from '@pma/dex-wrapper';
import useClickOutside from 'hooks/useClickOutside';
import { Input } from '../Input';
import { TileWrapper } from '../../Tile';

export interface DurationField {
  name: string;
  control?: any;
  readonly?: boolean;
}

const mappedValues = {
  P: '',
  W: ' weeks ',
  D: ' days',
};

type DurationReplacer = (matched: 'P' | 'W' | 'D') => string;

export const TEST_ID = 'duration-test-id';

export const DurationPicker: FC<DurationField> = ({ control, name, readonly = false }) => {
  const { css } = useStyle();
  const containerRef = useRef<HTMLDivElement>(null);
  const [weeks, setWeeks] = useState('');
  const [days, setDays] = useState('');
  const [isOpen, toggleOpen] = useState(false);

  useClickOutside(containerRef, () => toggleOpen(false));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // move to utilities and test separately
        const initWeeks = field?.value?.match(/(\d+)(?=\s*W)/)?.[0] || '';
        const initDays = field?.value?.match(/(\d+)(?=\s*D)/)?.[0] || '';
        setWeeks(initWeeks);
        setDays(initDays);
        const setDuration = ({ weeksVal = weeks, daysVal = days }) => {
          let result = '';
          if (weeksVal && weeksVal !== '0') result = `${result}${weeksVal}W`;
          if (daysVal && daysVal !== '0') result = `${result}${daysVal}D`;
          if (result) result = `P${result}`;
          field.onChange(result);
        };
        //
        const replacer: DurationReplacer = (matched) => mappedValues[matched];
        return (
          <div
            data-test-id={TEST_ID}
            className='dropdown-container'
            style={{ position: 'relative' }}
            ref={containerRef}
          >
            <Input
              onChange={() => ({})}
              onFocus={() => toggleOpen(!isOpen)}
              value={field?.value?.replace(/[PWD]/gi, replacer)}
              readonly={readonly}
            />
            {isOpen && (
              <TileWrapper
                customStyle={{
                  margin: '8px',
                  padding: '25px',
                  maxWidth: '1300px',
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
                  <label htmlFor='weeks'>weeks</label>
                  <Input
                    name='weeks'
                    type='number'
                    min={0}
                    id={'weeks'}
                    defaultValue={initWeeks}
                    onChange={({ target }) => {
                      setDuration({ weeksVal: target.value });
                      setWeeks(target.value);
                    }}
                  />
                  <label htmlFor='days'>days</label>
                  <Input
                    name='days'
                    type='number'
                    min={0}
                    id={'days'}
                    defaultValue={initDays}
                    onChange={({ target }) => {
                      setDuration({ daysVal: target.value });
                      setDays(target.value);
                    }}
                  />
                  <Button onPress={() => toggleOpen(!isOpen)}>Done</Button>
                </div>
              </TileWrapper>
            )}
          </div>
        );
      }}
    />
  );
};
