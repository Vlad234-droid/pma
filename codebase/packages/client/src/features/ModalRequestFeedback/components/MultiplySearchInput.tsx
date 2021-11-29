import React, { FC } from 'react';
import { colors, useStyle } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';
import { InputProps } from './type';
import { useRefContainer } from 'components/Form/context/input';
import { ColleaguesActions } from '@pma/store';
import { useDispatch } from 'react-redux';

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

  setInputValue,
}) => {
  const { css, theme } = useStyle();
  const dispatch = useDispatch();
  const refIcon = useRefContainer();

  return (
    <>
      <input
        ref={mergeRefs([domRef, refIcon])}
        name={name}
        data-test-id={name}
        value={value}
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
              key={item.colleagueUUID}
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
                setInputValue!(() => '');
                setSelectedPersons((prev) => [...prev, item]);
                dispatch(ColleaguesActions.clearGettedCollegues());
              }}
            >
              <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
                <img className={css({ width: '50px', height: '50px', borderRadius: '50%' })} src='' />
                <div className={css({ marginLeft: '16px' })}>
                  <div className={css({ fontWeight: 'bold', fontSize: '16px', color: '#00539F' })}>
                    {item?.profile?.firstName}
                  </div>
                  <div>{item?.profile?.lastName}</div>
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
