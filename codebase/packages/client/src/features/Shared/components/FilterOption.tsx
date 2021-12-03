import React, { FC } from 'react';
import { Rule, colors, useStyle } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Form/Input';
import { Icon } from 'components/Icon';
import { Item } from 'components/Form';

type FilterOptionProps = any;

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
}) => {
  const { css } = useStyle();

  return (
    <>
      <IconButton
        graphic='settings'
        customVariantRules={{
          default: iconBtnStyle,
        }}
        iconStyles={iconStyle}
        onPress={onSettingsPress}
      />
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
            onFocus && onFocus();
          }}
          customIconInserted={customIcon && <Icon graphic='search' iconStyles={iconStyle} />}
          focus={focus}
        >
          <Input
            onFocus={() => {
              onFocus && onFocus();
            }}
            value={searchValue}
            onChange={(e) => {
              onChange && onChange(e);
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

const iconBtnStyle: Rule = {
  padding: '0',
  marginLeft: '5px',
  display: 'flex',
  height: '38px',
  width: '38px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  border: `1px solid ${colors.tescoBlue}`,
  borderRadius: '20px',
  cursor: 'pointer',
};

const iconStyle: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
  marginLeft: '8px',
};
