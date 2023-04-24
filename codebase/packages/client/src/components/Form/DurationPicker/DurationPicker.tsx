import React, { FC, useState, useRef, useEffect, ChangeEvent } from 'react';
import { DurationObject } from 'luxon/src/duration';
import { Button, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import useClickOutside from 'hooks/useClickOutside';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Input } from '../Input';
import { fromDurationObjectToString, parseDurationFromIso, parseDurationToIso, convertDuration } from 'utils';

type Event = { target: { value: string; name: string } };

export interface DurationField {
  name: string;
  value: string;
  onChange: (e: Event) => void;
  readonly?: boolean;
  customStyles?: Rule | Styles;
  formatDuration?: boolean;
}

export const TEST_ID = 'duration-test-id';
const duration_map = ['years', 'months', 'weeks', 'days'];

export const DurationPicker: FC<DurationField> = ({
  value,
  name,
  onChange,
  readonly = false,
  customStyles = {},
  formatDuration = false,
}) => {
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

  const handleChangeDuration = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
    setDurationObject((prev) => ({
      ...prev,
      [name]: Number(value),
    }));

  const handleDone = () => {
    const value = parseDurationToIso(durationObject);
    onChange({ target: { value, name } });
    toggleOpen((prev) => !prev);
  };

  return (
    <div data-test-id={TEST_ID} className='dropdown-container' style={{ position: 'relative' }} ref={containerRef}>
      <Input
        onFocus={() => !readonly && toggleOpen(!isOpen)}
        value={formatDuration ? convertDuration(durationValue) : durationValue}
        readonly={readonly}
        customStyles={{ padding: '10px', ...customStyles }}
      />
      {isOpen && (
        <TileWrapper customStyle={tileCustomStyles}>
          <div
            data-test-id='duration-dialog'
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            })}
          >
            {duration_map.map((item) => {
              return (
                <div key={item} className={css(inputItem)}>
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
                </div>
              );
            })}
          </div>
          <Button data-test-id={'button'} styles={[{ width: '50%', margin: '8px auto 0px auto' }]} onPress={handleDone}>
            <Trans i18nKey={'done'} />
          </Button>
        </TileWrapper>
      )}
    </div>
  );
};

const tileCustomStyles: Rule = {
  margin: '8px',
  padding: '20px 25px 20px 25px',
  overflowY: 'visible',
  border: '2px solid gray',
  position: 'absolute',
  left: 0,
  transform: 'translateX(-36%)',
  top: 0,
  overflow: 'visible',
  zIndex: '10',
  width: '350px',
};
const inputItem: Rule = {
  flex: '1 0 135px',
  display: 'flex',
  flexDirection: 'column',
};
