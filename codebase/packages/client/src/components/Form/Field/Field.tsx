import React, { ChangeEvent, FC, useState } from 'react';
import { FieldValues } from 'react-hook-form';

type FieldProps = {
  value?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  Element: FC<any>;
  Wrapper?: FC<any>;
  rows?: number;
  options?: Array<Record<string, number | string | boolean>>;
};

const createChangeObject = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  switch (e.target.type) {
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

const Field: FC<FieldProps & FieldValues> = ({
  error,
  Element,
  Wrapper = 'div',
  placeholder,
  label,
  options,
  value,
  name,
  onChange,
  setValue,
  trigger,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    const changeObject = createChangeObject(e);
    setCurrentValue(e.target.value);
    onChange && onChange(changeObject);
    setValue(name, changeObject.target.value);
    trigger(name);
  };

  if (!Wrapper && !label) {
    return (
      <Element
        options={options}
        isValid={Boolean(!error)}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    );
  }

  return (
    <Wrapper label={label} errormessage={error}>
      <Element
        options={options}
        isValid={Boolean(!error)}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    </Wrapper>
  );
};

export default Field;
