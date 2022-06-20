import React, { ChangeEvent, FC, RefObject, useCallback, useEffect, useState } from 'react';
import { useStyle, Styles, Rule, CreateRule } from '@pma/dex-wrapper';
import mergeRefs from 'react-merge-refs';
import debounce from 'lodash.debounce';
import { useFormContainer } from 'components/Form/context/input';
import { Icon } from 'components/Icon';
import { SearchOption } from '../../config/enum';

type Props = {
  disabled?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  styles?: Styles | Rule;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (item: object) => void;
  onDelete?: (item: string) => void;
  onClear?: () => void;
  renderOption: (item) => JSX.Element;
  onBlur?: () => void;
  domRef?: RefObject<any>;
  isValid?: boolean;
  id?: string;
  options?: Array<object>;
  selected?: Array<{ label: string; value: string }>;
  multiple?: boolean;
  searchOption?: SearchOption;
};

const SearchInput: FC<Props> = ({
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
  selected = [],
  options = [],
  disabled = false,
  renderOption,
  multiple = false,
  searchOption,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const { css } = useStyle();
  const { inputRef } = useFormContainer();
  const handleSearch = useCallback(debounce(onSearch, 300), [searchOption]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('hello');
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
        className={css(inputStyles({ isValid }), styles)}
        placeholder={placeholder}
      />
      <div className={css(relativeStyles)}>
        {!!options.length && (
          <div className={css(optionsWrapperStyles)}>
            {options?.map((item, idx) => (
              <div
                key={idx}
                className={css(optionStyle)}
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
        {multiple && !!selected?.length && (
          <>
            {selected.map((item) => (
              <div key={item.value} className={css(selectedStyle)}>
                <span className={css({ marginRight: '10px' })}>{`${item.label}`}</span>
                <div
                  data-test-id={`remove-selected-${item.label}`}
                  className={css({ cursor: 'pointer' })}
                  onClick={() => onDelete && onDelete(item.value)}
                >
                  <Icon graphic={'cancel'} />
                </div>
              </div>
            ))}
            <span data-test-id='clear-button' className={css(cleanAllStyle)} onClick={onClear}>
              Clear all
            </span>
          </>
        )}
      </div>
    </>
  );
};

const optionStyle: Rule = ({ theme }) => ({
  display: 'block',
  width: '100%',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  padding: '10px 30px 10px 16px',
  ':hover': {
    background: '#F3F9FC',
  },
});

//@ts-ignore
const optionsWrapperStyles: Rule = ({ theme }) => ({
  display: 'block',
  position: 'absolute',
  width: 'clamp(100%, calc(100vw - 6vh), 560px)',
  top: 0,
  // @ts-ignore
  border: `2px solid ${theme.colors.lightGray}`,
  borderRadius: theme.border.radius.sm,
  background: theme.colors.white,
  zIndex: 999,
});

const inputStyles: CreateRule<{ isValid: boolean }> =
  ({ isValid }) =>
  ({ theme }) =>
    ({
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
    } as Styles);

const relativeStyles: Rule = {
  //@ts-ignore
  width: 'clamp(100%, calc(100vw - 6vh), 560px)',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
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
  zIndex: 2,
});

export default SearchInput;
