import React, { FC } from 'react';
import { useStyle, Rule, CreateRule } from '@dex-ddl/core';

import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';

import { SortBy, SortOption } from '../../config/types';

type Props = {
  onSelect: (value: SortBy) => void;
  isOpen: boolean;
  value?: SortBy;
  options: SortOption[];
};

const SortingModal: FC<Props> = ({ options, onSelect, isOpen, value }) => {
  const { css } = useStyle();

  return (
    <div data-test-id='sorting-modal' className={css(wrapperStyles({ isOpen }))}>
      <div className={css(innerStyles)}>
        <span>Sort :</span>
        {options.map((item) => (
          <div className={css({ cursor: 'pointer', marginTop: '10px' })} key={item.id}>
            <label htmlFor={item.label} className={css(labelStyles)}>
              <Radio
                name={item.label}
                checked={item.label === value}
                id={item.label}
                data-test-id={item.label}
                onChange={() => onSelect(item.label)}
              />
              <span className={css(textStyles)}>
                <Trans>{item.text}</Trans>
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingModal;

const innerStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const textStyles: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  padding: '0px 5px',
};

const labelStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const wrapperStyles: CreateRule<{ isOpen: boolean }> = ({ isOpen }) => {
  const { theme } = useStyle();

  return {
    position: 'absolute',
    width: '200px',
    padding: '10px 16px 16px 16px',
    top: '40px',
    right: '0px',
    pointerEvents: isOpen ? 'all' : 'none',
    transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
    transition: 'transform .3s ease',
    transformOrigin: '50% 0%',
    border: `1px solid ${theme.colors.tescoBlue}`,
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    background: '#F6F6F6',
    borderRadius: '10px',
    zIndex: 2,
  };
};
