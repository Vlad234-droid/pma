import React, { FC } from 'react';
import { Rule, colors, useStyle, Styles } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Form/Input';
import { Icon } from 'components/Icon';
import { Item } from 'components/Form';

type FilterOptionProps = {
  onSettingsPress?: () => void;
  withIcon?: boolean;
  marginBot?: boolean;
  customIcon?: boolean;
  onFocus?: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValueFilterOption?: React.Dispatch<React.SetStateAction<string>>;
  searchValue?: string;
  focus?: boolean;
  onChange?: (e: any) => any;
  customStyles?: Rule | Styles;
  visibleSettings?: boolean;
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
  setSearchValueFilterOption,
}) => {
  const { css } = useStyle();

  return (
    <>
      {visibleSettings && (
        <IconButton
          graphic='settings'
          customVariantRules={{
            default: iconBtnStyle as Rule,
          }}
          iconStyles={iconStyle}
          onPress={() => {
            onSettingsPress && onSettingsPress();
          }}
        />
      )}
      <div
        className={css({
          width: focus ? '240px' : '38px',
          transition: '.3s all ease',
          marginLeft: '5px',
        })}
      >
        <Item
          withIcon={withIcon}
          marginBot={marginBot}
          customIcon={customIcon}
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
              setSearchValueFilterOption && setSearchValueFilterOption(() => '');
            }}
            customStyles={{
              ...(customStyles && customStyles),
              background: '#F6F6F6',
              height: '38px',
              border: '1px solid rgb(0, 83, 159)',
              ...(!focus && { borderRadius: '50%', padding: '0px' }),
            }}
          />
        </Item>
      </div>
    </>
  );
};

const iconBtnStyle = {
  padding: '0',
  marginLeft: '5px',
  display: 'flex',
  height: '38px',
  width: '38px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  border: `1px solid ${colors.tescoBlue}`,
  borderRadius: '20px',
  cursor: 'pointer',
  position: 'relative',
  '& > span': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const iconStyle: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
};
