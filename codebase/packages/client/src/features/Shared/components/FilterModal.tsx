import React, { FC, useRef, MouseEvent, SetStateAction, Dispatch } from 'react';
import { useStyle, Rule, CreateRule, Theme } from '@dex-ddl/core';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import useEventListener from 'hooks/useEventListener';

type FilterType = {
  sort: string;
  search: string;
};

type AdditionalFieldsType = {
  id: string;
  label: string;
  checked: boolean;
  text: string;
};

type Props = {
  isOpen: boolean;
  filter: FilterType;
  setFilter: (T) => void;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
  testId?: string;
  additionalFields?: Array<AdditionalFieldsType>;
  customFields?: boolean;
  title?: string;
};

export const FilterModal: FC<Props> = ({
  isOpen,
  filter,
  setFilter,
  toggleOpen,
  testId = '',
  additionalFields = [],
  customFields = false,
  title = 'Sort',
}) => {
  const { css, theme } = useStyle();
  const choseHandler = (val: string) => {
    if (!customFields) setFilter((prev) => ({ ...prev, sort: val }));
    if (customFields) setFilter((prev) => ({ ...prev, extension: val }));
    toggleOpen(false);
  };
  const ref = useRef<HTMLDivElement | null>(null);

  const sortableFields = [
    {
      id: '1',
      label: 'AZ',
      checked: filter.sort.includes('AZ'),
      text: 'A-Z',
    },
    {
      id: '2',
      label: 'ZA',
      checked: filter.sort.includes('ZA'),
      text: 'Z-A',
    },
    {
      id: '3',
      label: 'newToOld',
      checked: filter.sort.includes('newToOld'),
      text: 'Newest to oldest',
    },
    {
      id: '4',
      label: 'oldToNew',
      checked: filter.sort.includes('oldToNew'),
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

  const fields = !customFields ? sortableFields : additionalFields;

  return (
    <div ref={ref} className={css(wrapperStyle({ theme, isOpen }))} data-test-id={testId}>
      <div className={css(columnStyle)}>
        <span>{title} :</span>
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
    width: '208px',
    padding: '10px 16px 16px 16px',
    top: '40px',
    right: 0,
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
