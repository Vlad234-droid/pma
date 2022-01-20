import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

import SortingModal from '../SortingModal';
import FilterIcon from '../FilterIcon';
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
      <FilterIcon iconStyles={iconStyles} onClick={onClick} />
      <SortingModal options={sortingOptions} onSelect={onSort} isOpen={isOpen} value={value} />
    </div>
  );
};

const wrapperStyle: Rule = {
  position: 'relative',
};

export default Sorting;
