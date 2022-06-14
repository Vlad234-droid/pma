import React, { FC, useCallback, ChangeEvent } from 'react';
import mergeRefs from 'react-merge-refs';
import debounce from 'lodash.debounce';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { useFormContainer } from 'components/Form/context/input';
import defaultImg from 'images/default.png';
import { ColleaguesActions } from '@pma/store';
import { useDispatch } from 'react-redux';
import { InputProps } from '../type';

const SearchInput: FC<InputProps> = ({
  domRef,
  placeholder = '',
  onChange,
  name,
  value,
  isValid = true,
  type = 'text',
  options,
  setSelectedPerson,
  searchValue,
  setSearchValue,
  disabled = false,
  selectedPerson,
  multiple,
}) => {
  const { css, theme } = useStyle();
  const { inputRef } = useFormContainer();
  const dispatch = useDispatch();

  const getPropperValue = (maches) => {
    if (maches === undefined) {
      return {
        value: (selectedPerson && searchValue !== '' && searchValue) || value,
      };
    } else {
      return {
        value,
      };
    }
  };

  const handleSearch = useCallback(debounce(onChange, 300), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e);
  };

  return (
    <>
      <input
        ref={mergeRefs([domRef, inputRef])}
        name={name}
        data-test-id={name}
        {...getPropperValue(multiple)}
        onChange={handleChange}
        autoComplete={'off'}
        disabled={(selectedPerson && searchValue !== '') || disabled}
        type={type}
        className={css({
          width: '100%',
          //@ts-ignore
          border: `2px solid ${isValid ? theme.colors.lightGray : theme.colors.error}`,
          borderRadius: '50px',
          fontSize: '16px',
          lineHeight: '20px',
          padding: '10px 30px 10px 16px',
          ':focus': {
            outline: 'none !important',
            border: `2px solid ${isValid ? theme.colors.tescoBlue : theme.colors.error}`,
          },
        })}
        placeholder={placeholder}
      />
      {!!options.length && (
        <div
          className={css({
            display: 'block',
            position: 'absolute',
            //@ts-ignore
            border: `2px solid ${theme.colors.lightGray}`,
            borderRadius: theme.border.radius.sm,
            background: theme.colors.white,
            width: '100%',
            zIndex: 999,
          })}
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
                setSearchValue(() => `${item?.colleague?.profile?.firstName} ${item?.colleague?.profile?.lastName}`);
                setSelectedPerson(() => ({ ...item.colleague, profileAttributes: item.profileAttributes }));
                dispatch(ColleaguesActions.clearColleagueList());
              }}
            >
              <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
                <img className={css({ width: '50px', height: '50px', borderRadius: '50%' })} src={defaultImg} />
                <div className={css({ marginLeft: '16px' })}>
                  <div className={css(flexGapStyle, selectedItemStyle)}>
                    <div>{item?.colleague?.profile?.firstName}</div>
                    <div>{item?.colleague?.profile?.lastName}</div>
                  </div>
                  <div className={css(flexGapStyle, { marginTop: '4px' })}>
                    <div>{item?.colleague?.workRelationships?.[0]?.job?.name}</div>
                    <div>{item?.colleague?.workRelationships?.[0]?.department?.name}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const flexGapStyle: Rule = {
  display: 'flex',
  gap: '8px',
};

const selectedItemStyle: Rule = ({ colors }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: colors.link,
});

export default SearchInput;
