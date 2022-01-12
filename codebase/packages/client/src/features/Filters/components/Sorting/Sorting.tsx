import React, { FC } from 'react';
import { Rule, colors, useStyle } from '@dex-ddl/core';

import { IconButton } from 'components/IconButton';

import SortingModal from '../SortingModal';
import { SortBy, SortOption } from '../../config/types';

type Props = {
  iconStyles?: Rule;
  isOpen: boolean;
  onClick: () => void;
  value?: SortBy;
  onSort: (value: SortBy) => void;
  sortingOptions: SortOption[];
};

const Sorting: FC<Props> = ({ sortingOptions, iconStyles, isOpen, onClick, value, onSort }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)} data-test-id='sorting-wrapper'>
      <IconButton
        graphic='settings'
        customVariantRules={{
          default: iconBtnStyle,
        }}
        iconStyles={iconStyles}
        onPress={onClick}
      />
      <SortingModal options={sortingOptions} onSelect={onSort} isOpen={isOpen} value={value} />
    </div>
  );
};

const wrapperStyle: Rule = {
  position: 'relative',
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

export default Sorting;
