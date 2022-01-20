import React, { FC } from 'react';
import { Rule, colors } from '@dex-ddl/core';

import { IconButton } from 'components/IconButton';

type Props = {
  iconStyles?: Rule;
  onClick: () => void;
};

const FilterIcon: FC<Props> = ({ iconStyles, onClick }) => (
  <IconButton
    graphic='settings'
    customVariantRules={{
      default: iconBtnStyle,
    }}
    iconStyles={iconStyles}
    onPress={onClick}
  />
);

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

export default FilterIcon;
