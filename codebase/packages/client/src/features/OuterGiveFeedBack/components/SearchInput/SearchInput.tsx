import React, { FC, useCallback } from 'react';
import { useStyle, colors } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';
import debounce from 'lodash.debounce';
import { SearchInputProps } from './type';
import { useRefContainer } from 'components/Form/context/input';

const SearchInput: FC<SearchInputProps<any>> = ({
  domRef,
  placeholder = '',
  onChange,
  onSearch,
  name,
  value,
  isValid = true,
  selected,
  options = [],
  searchValue,
  disabled = false,
  renderOption,
}) => {
  const { css, theme } = useStyle();
  const refIcon = useRefContainer();

  const handleSearch = useCallback(debounce(onSearch, 300), []);

  return (
    <>
      <input
        ref={mergeRefs([domRef, refIcon])}
        name={name}
        data-test-id={name}
        value={value || searchValue}
        onChange={(e) => !disabled && handleSearch(e)}
        autoComplete={'off'}
        disabled={(selected && value !== '') || disabled}
        type={'text'}
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
          {options?.map((item, idx) => (
            <div
              key={idx}
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
                onChange(item);
              }}
            >
              {renderOption(item)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchInput;
