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
          iconStyles={iconStyle}
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
            width: focus ? '240px' : '38px',
            transition: '.3s all ease',
            marginLeft: !marginLeftAuto ? '5px' : 'auto',
          })}
        >
          <Item
            withIcon={withIcon}
            marginBot={marginBot}
            customIcon={customIcon}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onFocus && onFocus(false);
              }
            }}
            onFocus={() => {
              onFocus && onFocus(true);
            }}
            customIconInserted={customIcon && <Icon graphic='search' iconStyles={iconStyle} />}
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
                background: theme.colors.white,
                height: '38px',
                border: '2px solid rgb(0, 83, 159)',
                ...(!focus && { borderRadius: '50%', padding: '0px' }),
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
    height: '38px',
    width: '38px',
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

const iconStyle: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
};
