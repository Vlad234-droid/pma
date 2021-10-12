import React from 'react';
import { Rule, colors } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';

export const FilterOption = () => {
  return (
    <>
      <IconButton
        graphic='settings'
        customVariantRules={{
          default: iconBtnStyle,
        }}
        iconStyles={iconStyle}
      />
      <IconButton
        graphic='search'
        customVariantRules={{
          default: iconBtnStyle,
        }}
        iconStyles={iconStyle}
      />
    </>
  );
};

const iconBtnStyle: Rule = {
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
};

const iconStyle: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
};
