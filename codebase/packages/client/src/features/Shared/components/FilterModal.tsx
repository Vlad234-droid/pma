import React, { FC, useRef, MouseEvent } from 'react';
import { useStyle, Rule, CreateRule, Theme } from '@dex-ddl/core';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import useEventListener from 'hooks/useEventListener';

type FilterType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};

type Props = {
  isOpen: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  toggleOpen: (open: boolean) => void;
};

export const FilterModal: FC<Props> = ({ isOpen, filter, setFilter, toggleOpen }) => {
  const { css, theme } = useStyle();
  const choseHandler = (val: string) => {
    setFilter({ AZ: false, ZA: false, newToOld: false, oldToNew: false, [val]: true });
    toggleOpen(false);
  };
  const ref = useRef<HTMLDivElement | null>(null);

  const fields = [
    {
      id: '1',
      label: 'AZ',
      checked: filter.AZ,
      text: 'A-Z',
    },
    {
      id: '2',
      label: 'ZA',
      checked: filter.ZA,
      text: 'Z-A',
    },
    {
      id: '3',
      label: 'newToOld',
      checked: filter.newToOld,
      text: 'Newest to oldest',
    },
    {
      id: '4',
      label: 'oldToNew',
      checked: filter.oldToNew,
      text: 'Oldest to newest',
    },
  ];

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      toggleOpen(false);
    }
  };

  useEventListener('mousedown', handleClickOutside);

  return (
    <div ref={ref} className={css(wrapperStyle({ theme, isOpen }))}>
      <div className={css(columnStyle)}>
        <span>Sort :</span>
        {fields.map((item) => (
          <div className={css({ cursor: 'pointer', marginTop: '10px' })} key={item.id}>
            <label htmlFor={item.label} className={css(labelStyle)}>
              <Radio
                name={item.label}
                checked={item.checked}
                id={item.label}
                onChange={() => {
                  choseHandler(item.label);
                }}
              />
              <span className={css(textStyle)}>
                <Trans>{item.text}</Trans>
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
const columnStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};
const textStyle: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  padding: '0px 5px',
};
const labelStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};
const wrapperStyle: CreateRule<{ theme: Theme; isOpen: boolean }> = ({ theme, isOpen }) => {
  return {
    position: 'absolute',
    width: '200px',
    height: '186px',
    padding: '10px 16px 16px 16px',
    top: '40px',
    right: '0px',
    pointerEvents: isOpen ? 'all' : 'none',
    transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
    transition: 'transform .3s ease',
    transformOrigin: '50% 0%',
    border: `1px solid ${theme.colors.tescoBlue}`,
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    background: theme.colors.white,
    borderRadius: '10px',
    zIndex: 2,
  };
};
