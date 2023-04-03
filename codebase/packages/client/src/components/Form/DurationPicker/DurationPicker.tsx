import React, { FC, useState, useRef, useEffect, ChangeEvent } from 'react';
import { DurationObject } from 'luxon/src/duration';
import { Button, useStyle } from '@pma/dex-wrapper';
import useClickOutside from 'hooks/useClickOutside';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Input } from '../Input';
import { fromDurationObjectToString, parseDurationFromIso, parseDurationToIso } from 'utils';

type Event = { target: { value: string; name: string } };

export interface DurationField {
  name: string;
  value: string;
  onChange: (e: Event) => void;
  readonly?: boolean;
}

export const TEST_ID = 'duration-test-id';
const duration_map = ['years', 'months', 'weeks', 'days'];

export const DurationPicker: FC<DurationField> = ({ value, name, onChange, readonly = false }) => {
  const { css } = useStyle();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, toggleOpen] = useState(false);
  const [durationValue, setDurationValue] = useState<string>('');
  const [durationObject, setDurationObject] = useState<DurationObject | {}>(() => ({}));

  const setDuration = () => {
    const duration = parseDurationFromIso(value);
    if (!Object.keys(duration).length) setDurationValue(() => '');
    setDurationObject(() => duration);
    setDurationValue(() => fromDurationObjectToString(duration, duration_map));
  };

  useEffect(() => {
    setDuration();
  }, [value]);

  useEffect(() => {
    !isOpen && setDuration();
  }, [isOpen]);

  useClickOutside(containerRef, () => {
    toggleOpen(false);
  });

  const handleChangeDuration = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setDurationObject((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleDone = () => {
    const value = parseDurationToIso(durationObject);
    onChange({ target: { value, name } });
    toggleOpen((prev) => !prev);
  };

  return (
    <div data-test-id={TEST_ID} className='dropdown-container' style={{ position: 'relative' }} ref={containerRef}>
      <Input
        onFocus={() => !readonly && toggleOpen(!isOpen)}
        value={durationValue}
        readonly={readonly}
        customStyles={{ padding: '10px' }}
      />
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
            {duration_map.map((item) => {
              return (
                <>
                  <label htmlFor={item}>
                    <Trans i18nKey={item}>{item}</Trans>
                  </label>
                  <Input
                    name={item}
                    type='number'
                    min={0}
                    value={durationObject?.[item]?.toString() || ''}
                    id={item}
                    onChange={handleChangeDuration}
                  />
                </>
              );
            })}

            <Button data-test-id={'button'} onPress={handleDone}>
              <Trans i18nKey={'done'} />
            </Button>
          </div>
        </TileWrapper>
      )}
    </div>
  );
};
