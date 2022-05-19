import React, { ChangeEvent, FC, RefObject, useCallback, useEffect, useState } from 'react';
import { useStyle, Styles, Rule } from '@pma/dex-wrapper';
import mergeRefs from 'react-merge-refs';
import debounce from 'lodash.debounce';
import { useFormContainer } from 'components/Form/context/input';
import { Close } from 'components/Icon/graphics/close';

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
  onBlur?: () => void;
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
  styles = {},
  onChange,
  onSearch,
  onDelete,
  onClear,
  onBlur,
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
  const { inputRef } = useFormContainer();

  const handleSearch = useCallback(debounce(onSearch, 300), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    handleSearch(e);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      <input
        ref={mergeRefs([domRef, inputRef])}
        name={name}
        data-test-id={name}
        value={currentValue}
        onChange={handleChange}
        autoComplete={'off'}
        onBlur={onBlur}
        disabled={disabled}
        type={'text'}
        className={css({
          width: '100%',
          // @ts-ignore
          border: `2px solid ${isValid ? theme.colors.lightGray : theme.colors.error}`,
          borderRadius: '50px',
          fontSize: theme.font.fixed.f16.fontSize,
          lineHeight: theme.font.fixed.f16.lineHeight,
          letterSpacing: '0px',
          padding: '10px 30px 10px 16px',
          ':focus': {
            outline: 'none !important',
            border: `2px solid ${isValid ? theme.colors.tescoBlue : theme.colors.error}`,
          },
          ...styles,
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
              // @ts-ignore
              border: `2px solid ${theme.colors.lightGray}`,
              borderRadius: theme.border.radius.sm,
              background: theme.colors.white,
              zIndex: 999,
            }}
          >
            {options?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={css({
                    display: 'block',
                    width: '100%',
                    fontSize: theme.font.fixed.f16.fontSize,
                    lineHeight: theme.font.fixed.f16.lineHeight,
                    letterSpacing: '0px',
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
              );
            })}
          </div>
        )}
        {multiple && (
          <>
            {selected.map((item): any => (
              <div key={item.value} className={css(selectedStyle)}>
                <span className={css({ marginRight: '10px' })}>{`${item.label}`}</span>
                <div
                  data-test-id={`remove-selected-${item.label}`}
                  className={css({ cursor: 'pointer' })}
                  onClick={() => onDelete && onDelete(item.value)}
                >
                  <Close />
                </div>
              </div>
            ))}
            {!!selected.length && (
              <span data-test-id='clear-button' className={css(cleanAllStyle)} onClick={onClear}>
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

const selectedStyle = ({ theme }) =>
  ({
    borderRadius: '10px',
    border: `2px solid ${theme.colors.tescoBlue}`,
    height: '32px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 12px',
    marginRight: '16px',
    marginTop: '15px',

    '& > span': {
      whiteSpace: 'nowrap',
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: theme.font.fixed.f16.lineHeight,
      letterSpacing: '0px',
      color: theme.colors.tescoBlue,
    },
  } as Styles);

const cleanAllStyle: Rule = ({ theme }) => ({
  position: 'absolute',
  top: '11px',
  right: 0,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  cursor: 'pointer',
});

export default SearchInput;
