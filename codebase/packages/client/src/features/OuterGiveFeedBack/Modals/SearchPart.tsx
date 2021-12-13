import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createObjectivesSearchPeopleSchema } from '../config';
import { Button, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import * as Yup from 'yup';
import { Item } from 'components/Form';
import { SearchInput } from '../components/SearchInput';
import { SearchPartProps } from '../type';
import { Trans } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, getFindedColleaguesSelector } from '@pma/store';

const SearchPart: FC<SearchPartProps> = ({ setSearchValue, setSelectedPerson, searchValue, selectedPerson }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createObjectivesSearchPeopleSchema),
  });
  const {
    formState: { errors },
  } = methods;

  const { register } = methods;

  const findedCollegues = useSelector(getFindedColleaguesSelector) || [];

  return (
    <>
      <form className={css({ marginTop: '32px' })} data-test-id='search-part'>
        <Item
          errormessage={
            errors['search_option'] && errors['search_option'].type === 'required'
              ? errors['search_option'].message
              : ''
          }
        >
          <SearchInput
            isValid={!errors[`search_option`]}
            name={`search_option`}
            onChange={(e) => {
              setInputValue(() => e.target.value);
              if (e.target.value !== '' && e.target.value.length > 1) {
                dispatch(
                  ColleaguesActions.getColleagues({
                    'first-name_like': e.target.value,
                    'last-name_like': e.target.value,
                  }),
                );
              }

              register(`search_option`).onChange(e);
            }}
            setSelectedPerson={setSelectedPerson}
            domRef={register(`search_option`).ref}
            placeholder={'Search'}
            options={findedCollegues}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            selectedPerson={selectedPerson}
            value={inputValue}
          />
        </Item>
      </form>
      {selectedPerson === null && (
        <div
          className={css({
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            background: '#FFFFFF',
            height: '112px',
          })}
        >
          <div
            className={css({
              position: 'relative',
              bottom: theme.spacing.s0,
              left: theme.spacing.s0,
              right: theme.spacing.s0,
              borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
            })}
          >
            <div
              className={css({
                padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
                display: 'flex',
                justifyContent: 'space-between',
              })}
            >
              <Button
                styles={[
                  theme.font.fixed.f16,
                  {
                    opacity: '0.4',
                    fontWeight: theme.font.weight.bold,
                    width: '49%',
                    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                    background: theme.colors.white,
                    border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                    color: `${theme.colors.tescoBlue}`,
                  },
                ]}
                onPress={() => alert('1')}
                isDisabled={true}
              >
                <Trans i18nKey='save_as_draft'>Save as draft</Trans>
              </Button>

              <IconButton
                isDisabled={true}
                customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
                graphic='arrowRight'
                iconProps={{ invertColors: true }}
                iconPosition={Position.RIGHT}
              >
                <Trans>Submit</Trans>
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconBtnStyleDisabled: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  pointerEvents: 'none',
  opacity: '0.4',
});

export default SearchPart;
