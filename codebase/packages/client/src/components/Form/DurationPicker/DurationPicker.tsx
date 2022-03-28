import React, { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button, useStyle } from '@dex-ddl/core';
import { Input } from '../Input';
import { TileWrapper } from '../../Tile';

export interface DurationField {
  name: string;
  control?: any;
}

const mappedValues = {
  P: '',
  W: ' weeks ',
  D: ' days',
};

type DurationReplacer = (matched: 'P' | 'W' | 'D') => string;

export const DurationPicker: FC<DurationField> = ({ control, name }) => {
  const { css } = useStyle();
  const [weeks, setWeeks] = useState('');
  const [days, setDays] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
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
        const replacer: DurationReplacer = (matched) => mappedValues[matched];
        return (
          <div className='dropdown-container' style={{ width: '200px', position: 'relative' }}>
            <Input
              onChange={() => ({})}
              onFocus={() => setShowDialog(!showDialog)}
              value={field?.value?.replace(/[PWD]/gi, replacer)}
            />
            {showDialog && (
              <TileWrapper
                customStyle={{
                  margin: '8px',
                  padding: '25px',
                  maxWidth: '1300px',
                  overflowY: 'visible',
                  border: '1px solid gray',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  overflow: 'visible',
                  zIndex: '10',
                }}
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  })}
                >
                  <label htmlFor='weeks'>weeks</label>
                  <Input
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
                    type='number'
                    min={0}
                    id={'days'}
                    defaultValue={initDays}
                    onChange={({ target }) => {
                      setDuration({ daysVal: target.value });
                      setDays(target.value);
                    }}
                  />
                  <Button onPress={() => setShowDialog(!showDialog)}>Done</Button>
                </div>
              </TileWrapper>
            )}
          </div>
        );
      }}
    />
  );
};
