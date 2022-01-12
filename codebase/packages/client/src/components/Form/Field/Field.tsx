import React, { ChangeEvent, FC, RefObject, useState } from 'react';

import { Ref } from 'react-hook-form';

type FieldProps = {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  Element: FC<any>;
  Wrapper?: FC<any>;
  rows?: number;
  options?: Array<Record<string, number | string | boolean>>;
  domRef?: Ref | RefObject<any> | null;
  onChange?: any;
};

const createChangeObject = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  switch (e.target.type) {
    case 'text':
      return {
        target: {
          value: e.target.value,
          name: e.target.name,
        },
      };
    case 'radio':
    case 'checkbox': {
      return {
        target: {
          value: (e.target as HTMLInputElement).checked,
          name: e.target.name,
        },
      };
    }
    default: {
      return e;
    }
  }
};

const Field: FC<FieldProps> = ({
  error,
  Element,
  Wrapper = 'div',
  placeholder,
  label,
  options,
  value,
  onChange,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    onChange(createChangeObject(e));
  };

  const element = (
    <div>
      <Element
        options={options}
        isValid={Boolean(!error)}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    </div>
  );

  if (!Wrapper && !label) {
    return element;
  }

  return (
    <Wrapper label={label} errormessage={error}>
      {element}
    </Wrapper>
  );
};

export default Field;
