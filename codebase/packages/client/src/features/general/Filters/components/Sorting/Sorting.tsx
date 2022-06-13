import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import SortingModal from '../SortingModal';
import FilterIcon from '../FilterIcon';
import { SortBy, SortOption } from '../../config/types';

type Props = {
  iconStyles?: Rule;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  value?: SortBy;
  onSort: (value: SortBy) => void;
  sortingOptions: SortOption[];
};

const Sorting: FC<Props> = ({ sortingOptions, iconStyles, isOpen, onClick, value, onSort, onClose }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)} data-test-id='sorting-wrapper'>
      <FilterIcon iconStyles={iconStyles} onClick={onClick} />
      <SortingModal options={sortingOptions} onSelect={onSort} isOpen={isOpen} value={value} onClose={onClose} />
    </div>
  );
};

const wrapperStyle: Rule = ({ theme }) => {
  return {
    position: 'relative',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

export default Sorting;
