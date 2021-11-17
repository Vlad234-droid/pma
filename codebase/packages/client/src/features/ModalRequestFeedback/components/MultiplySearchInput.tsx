import React, { FC } from 'react';
import { colors, useStyle } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';
import { InputProps } from './type';
import { useRefContainer } from 'components/Form/context/input';
import { PeopleTypes } from 'features/Feedback/type';

const MultiplySearchInput: FC<InputProps> = ({
  domRef,
  placeholder = '',
  onChange,
  name,
  value,
  isValid = true,
  type = 'text',
  options,
  setSelectedPersons,
  searchValue,
  setSearchValue,
  setPeopleFiltered,
  selectedPersons,
  multiple,
  setInputValue,
  setPeople,
}) => {
  const { css, theme } = useStyle();
  const refIcon = useRefContainer();

  const getPropperValue = (maches) => {
    if (maches === undefined) {
      return {
        value: (selectedPersons && searchValue !== '' && searchValue) || value,
      };
    }
    return {
      value,
    };
  };

  return (
    <>
      <input
        ref={mergeRefs([domRef, refIcon])}
        name={name}
        data-test-id={name}
        {...getPropperValue(multiple)}
        onChange={onChange}
        autoComplete={'off'}
        disabled={false}
        type={type}
        className={css({
          width: '100%',
          border: `1px solid ${isValid ? colors.backgroundDarkest : colors.error}`,
          borderRadius: '50px',
          fontSize: '16px',
          lineHeight: '20px',
          padding: '10px 30px 10px 16px',
          ':focus': {
            outline: 'none !important',
            border: `1px solid ${isValid ? colors.tescoBlue : colors.error}`,
          },
        })}
        placeholder={placeholder}
      />
      {!!options.length && (
        <div
          style={{
            display: 'block',
            position: 'absolute',
            border: `1px solid ${theme.colors.backgroundDarkest}`,
            borderRadius: theme.border.radius.sm,
            background: theme.colors.white,
            width: '100%',
            zIndex: 999,
          }}
        >
          {options.map((item) => (
            <div
              key={item.id}
              className={css({
                display: 'block',
                width: '100%',
                fontSize: '16px',
                lineHeight: '20px',
                padding: '10px 30px 10px 16px',
                ':hover': {
                  background: '#F3F9FC',
                },
              })}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setPeopleFiltered(() => []);
                if (!multiple) {
                  multiple && setSearchValue(() => `${item.f_name} ${item.l_name}`);
                }
                setPeople!((prev: PeopleTypes[]) => prev.filter((person) => person.id !== item.id));
                setSelectedPersons((prev: PeopleTypes[]) => [...prev, item]);
                setInputValue!(() => '');
              }}
            >
              <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
                <img className={css({ width: '50px', height: '50px', borderRadius: '50%' })} src={item.img} />
                <div className={css({ marginLeft: '16px' })}>
                  <div className={css({ fontWeight: 'bold', fontSize: '16px', color: '#00539F' })}>{item.f_name}</div>
                  <div>{item.l_name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MultiplySearchInput;
