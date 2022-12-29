import React, { FC } from 'react';
import { Rule, colors } from '@pma/dex-wrapper';

import { IconButton } from 'components/IconButton';

type Props = {
  iconStyles?: Rule;
  onClick: () => void;
};

const FilterIcon: FC<Props> = ({ iconStyles, onClick }) => (
  <IconButton
    data-test-id='filter-icon'
    graphic='settings'
    customVariantRules={{
      default: iconBtnStyle,
    }}
    iconStyles={iconStyles}
    onPress={onClick}
  />
);

const iconBtnStyle: Rule = () => ({
  padding: '0',
  marginLeft: '5px',
  display: 'flex',
  height: '40px',
  width: '40px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  lineHeight: 0,
  border: `2px solid ${colors.tescoBlue}`,
  borderRadius: '20px',
  cursor: 'pointer',
  '& > span': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterIcon;
