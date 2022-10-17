import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Radio } from '../Radio';
import { RadioGroupFields } from '../types';

const RadioGroup: FC<RadioGroupFields> = ({ id, name, readonly, options, onChange, value }) => {
  const { css } = useStyle();
  return (
    <>
      {options.map((option) => (
        <label className={css(labelStyles)} key={`${id}-${option.value}`}>
          <Radio
            id={`${id}-${option.value}`}
            name={name}
            onChange={onChange}
            checked={value === option.value}
            value={String(option.value)}
            readonly={readonly}
          />
          <span className={css(textStyles)}>{option.label}</span>
        </label>
      ))}
    </>
  );
};

const labelStyles: Rule = { display: 'inline-flex', paddingRight: '10px' };
const textStyles: Rule = { paddingLeft: '5px', cursor: 'pointer' };

export default RadioGroup;
