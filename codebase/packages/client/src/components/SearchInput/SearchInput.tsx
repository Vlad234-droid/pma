import React, { ChangeEvent, FC, RefObject, useCallback, useEffect, useState } from 'react';
import { useStyle, colors, Styles, Rule } from '@dex-ddl/core';
import mergeRefs from 'react-merge-refs';
import debounce from 'lodash.debounce';
import { useRefContainer } from 'components/Form/context/input';
import { Close } from 'components/Icon/graphics/Close';

type Props<T> = {
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (item: any) => void;
  onDelete?: (item: any) => void;
  onClear?: () => void;
  renderOption: (item: any) => JSX.Element;
  domRef?: RefObject<any>;
  isValid?: boolean;
  id?: string;
  options?: Array<T>;
  selected?: Array<{ label: string; value: string }> | T;
  multiple?: boolean;
};

const SearchInput: FC<Props<any>> = ({
  domRef,
  placeholder = '',
  onChange,
  onSearch,
  onDelete,
  onClear,
  name,
  value,
  isValid = true,
  selected,
  options = [],
  disabled = false,
  renderOption,
  multiple,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const { css, theme } = useStyle();
  const refIcon = useRefContainer();

  const handleSearch = useCallback(debounce(onSearch, 300), []);

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    handleSearch(e);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      <input
        ref={mergeRefs([domRef, refIcon])}
        name={name}
        data-test-id={name}
        value={currentValue}
        onChange={handleChange}
        autoComplete={'off'}
        disabled={disabled}
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
      <div className={css(relativeStyles)}>
        {!!options.length && (
          <div
            style={{
              display: 'block',
              position: 'absolute',
              width: '100%',
              top: 0,
              border: `1px solid ${theme.colors.backgroundDarkest}`,
              borderRadius: theme.border.radius.sm,
              background: theme.colors.white,
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
                  multiple && setCurrentValue('');
                }}
              >
                {renderOption(item)}
              </div>
            ))}
          </div>
        )}
        {multiple && (
          <>
            {selected.map((item): any => (
              <div key={item.value} className={css(selectedStyle)}>
                <span className={css({ marginRight: '10px' })}>{`${item.label}`}</span>
                <div className={css({ cursor: 'pointer' })} onClick={() => onDelete && onDelete(item.value)}>
                  <Close />
                </div>
              </div>
            ))}
            {!!selected.length && (
              <span className={css(cleanAllStyle)} onClick={onClear}>
                Clear all
              </span>
            )}
          </>
        )}
      </div>
    </>
  );
};

const relativeStyles: Rule = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
};

const selectedStyle = {
  borderRadius: '10px',
  border: '1px solid  #00539F',
  height: '32px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 12px',
  marginRight: '16px',
  marginTop: '15px',

  '& > span': {
    whiteSpace: 'nowrap',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#00539F',
  },
} as Styles;

const cleanAllStyle: Rule = {
  position: 'absolute',
  top: '11px',
  right: 0,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
  cursor: 'pointer',
};

export default SearchInput;