import React, { FC } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Form/Input';
import { Icon, RoundIcon } from 'components/Icon';
import { Item } from 'components/Form';

type FilterOptionProps = {
  onSettingsPress?: () => void;
  withIcon?: boolean;
  marginBot?: boolean;
  customIcon?: boolean;
  onFocus?: (status: boolean) => void;
  hasActiveFilter?: boolean;
  searchValue?: string;
  focus?: boolean;
  onChange?: (e: any) => void;
  customStyles?: Rule | Styles;
  visibleSettings?: boolean;
  setSearchValueFilterOption?: React.Dispatch<React.SetStateAction<string>>;
  marginLeftAuto?: boolean;
  testSettingsId?: string;
  wrapperInputId?: string;
  inputTestId?: string;
  isDisabledSearch?: boolean;
  isVisibleEdit?: boolean;
  onEditPress?: () => void;
};

export const FilterOption: FC<FilterOptionProps> = ({
  onSettingsPress,
  withIcon = false,
  marginBot = false,
  customIcon = true,
  onFocus,
  searchValue = '',
  focus = false,
  onChange,
  customStyles,
  visibleSettings = true,
  hasActiveFilter = false,
  marginLeftAuto = false,
  testSettingsId = '',
  wrapperInputId = '',
  inputTestId = '',
  isDisabledSearch = true,
  isVisibleEdit = false,
  onEditPress,
}) => {
  const { css, theme } = useStyle();

  return (
    <>
      {visibleSettings && (
        <IconButton
          graphic='settings'
          customVariantRules={{
            default: iconBtnStyle({ isActive: hasActiveFilter, colors: theme.colors }),
          }}
          iconProps={{
            invertColors: hasActiveFilter,
          }}
          onPress={() => {
            onSettingsPress && onSettingsPress();
          }}
          data-test-id={testSettingsId}
        />
      )}
      {isVisibleEdit && (
        <div className={css({ marginLeft: '5px' })}>
          <RoundIcon>
            <IconButton onPress={onEditPress} graphic='edit' />
          </RoundIcon>
        </div>
      )}

      {isDisabledSearch && (
        <div
          data-test-id={wrapperInputId}
          className={css({
            width: focus ? '240px' : '40px',
            transition: '.4s width ease',
            marginLeft: !marginLeftAuto ? '5px' : 'auto',
          })}
        >
          <Item
            withIcon={withIcon}
            marginBot={marginBot}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onFocus && onFocus(false);
              }
            }}
            onFocus={() => {
              onFocus && onFocus(true);
            }}
            customIcon={customIcon && <Icon graphic='search' size={'17px'} />}
            focus={focus}
          >
            <Input
              value={searchValue}
              onChange={(e) => {
                onChange && onChange(e);
              }}
              onFocus={() => {
                onFocus && onFocus(true);
              }}
              onBlur={() => {
                onFocus && !searchValue && onFocus(false);
              }}
              customStyles={{
                ...customStyles,
                ...(!focus
                  ? { borderRadius: '20px', paddingLeft: '0px', transitionDelay: '0s' }
                  : { borderRadius: '20px', paddingLeft: '25px', transitionDelay: '.3s' }),

                background: theme.colors.white,
                height: '40px',
                border: '2px solid rgb(0, 83, 159)',
              }}
              name={inputTestId}
            />
          </Item>
        </div>
      )}
    </>
  );
};

const iconBtnStyle: CreateRule<{ isActive: boolean; colors: any }> = ({ colors, isActive }) => {
  const { matchMedia } = useStyle();
  const medium = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  return {
    background: isActive ? colors.tescoBlue : colors.white,
    padding: '0',
    marginLeft: medium ? '0px' : '5px',
    display: 'flex',
    height: '40px',
    width: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 0,
    border: `2px solid ${colors.tescoBlue}`,
    borderRadius: '20px',
    cursor: 'pointer',
    position: 'relative',
    '& > span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
};
