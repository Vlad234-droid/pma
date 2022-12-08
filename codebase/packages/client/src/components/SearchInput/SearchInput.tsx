import React, { ChangeEvent, FC, RefObject, useCallback, useEffect, useState } from 'react';
import { useStyle, Styles, Rule, CreateRule } from '@pma/dex-wrapper';
import mergeRefs from 'react-merge-refs';
import debounce from 'lodash.debounce';
import { useFormContainer } from 'components/Form/context/input';
import { Icon } from 'components/Icon';

type Props = {
  disabled?: boolean;
  value?: string;
  name?: string;
  optionDataLiner?: string;
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
  disabledOptions?: Array<object>;
  selected?: Array<{ label: string; value: string }>;
  multiple?: boolean;
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
  optionDataLiner,
  value,
  isValid = true,
  selected = [],
  options = [],
  disabledOptions = [],
  disabled = false,
  renderOption,
  multiple = false,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const { css } = useStyle();
  const { inputRef } = useFormContainer();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    onSearch(e);
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
        {(!!options.length || !!disabledOptions.length) && (
          <div className={css(optionsWrapperStyles)}>
            {!!options.length &&
              options?.map((item, idx) => (
                <div
                  data-test-id={`option-${idx}`}
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
            {!!disabledOptions.length && (
              <>
                {optionDataLiner && <div className={css(optionDataLinerStyle)}>{optionDataLiner}</div>}
                {disabledOptions?.map((item, idx) => (
                  <div data-test-id={`option-${idx}`} key={idx} className={css(optionStyle, optionDisabledStyle)}>
                    {renderOption(item)}
                  </div>
                ))}
              </>
            )}
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
                  <Icon graphic={'cancel'} size={'16px'} />
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

const optionDisabledStyle: Rule = {
  opacity: 0.6,
};

const optionDataLinerStyle: Rule = ({ theme }) => ({
  display: 'block',
  width: '100%',
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  padding: '10px 30px 10px 16px',
  background: theme.colors.backgroundDark,
  // @ts-ignore
  borderTop: `1px solid ${theme.colors.lightGray}`,
  // @ts-ignore
  borderBottom: `1px solid ${theme.colors.lightGray}`,
});

//@ts-ignore
const optionsWrapperStyles: Rule = ({ theme }) => ({
  display: 'block',
  position: 'absolute',
  width: '100%',
  top: 0,
  // @ts-ignore
  border: `2px solid ${theme.colors.lightGray}`,
  borderRadius: theme.border.radius.sm,
  background: theme.colors.white,
  zIndex: theme.zIndex.i40,
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
  width: '100%',
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
