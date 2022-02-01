import React, { FC, useState } from 'react';
import { Rule, colors, useStyle, Button } from '@dex-ddl/core';
import isEmpty from 'lodash.isempty';

import { IconButton, Position } from 'components/IconButton';
import SideBar from 'components/Sidebar';
import LinkButton from 'components/LinkButton';
import { Checkbox, Radio } from 'components/Form';
import { Trans } from 'components/Translation';

import { getInitialFilterValues, getFiltersWithValues } from '../../utils';
import { FilterOption, FilterValues } from '../../config/types';
import FilterIcon from '../FilterIcon';

type Props = {
  iconStyles?: Rule;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  filterOptions: FilterOption[];
  onFilter: (filters: FilterValues) => void;
};

const Filtering: FC<Props> = ({ iconStyles, isOpen, onClick, onClose, filterOptions, onFilter }) => {
  const { css } = useStyle();
  const initialFilters = getInitialFilterValues(filterOptions);
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  const handleSelectAll = (id: number) => {
    const updatedFilters = filters[id];

    Object.keys(updatedFilters).forEach((item) => {
      updatedFilters[item] = true;
    });

    setFilters((filters) => ({
      ...filters,
      [id]: updatedFilters,
    }));
  };

  const handleChangeMulti = (fieldId: number, option: string) => {
    setFilters((filters) => ({
      ...filters,
      [fieldId]: {
        ...(filters[fieldId] as object),
        [option]: !filters[fieldId][option],
      },
    }));
  };

  const handleChangeSingle = (fieldId: number, option: string) => {
    setFilters((filters) => ({
      ...filters,
      [fieldId]: option,
    }));
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
  };

  const HandleFilterApply = () => {
    onClose();
    onFilter(getFiltersWithValues(filters));
  };

  return (
    <div className={css({ position: 'relative' })} data-test-id='filtering-wrapper'>
      <FilterIcon iconStyles={iconStyles} onClick={onClick} />
      <SideBar isOpen={isOpen} onClose={onClose} title='Filter'>
        <div>
          {filterOptions.map((item) => (
            <div className={css(blockStyle)} key={item.id}>
              <div className={css(titleStyle)}>{item.title}:</div>
              {item.options.map((option, index) => (
                <div key={index} className={css({ cursor: 'pointer', marginTop: '10px' })}>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    {item.multi ? (
                      <Checkbox
                        id={option}
                        name={option}
                        checked={filters[item.id][option]}
                        onChange={() => handleChangeMulti(item.id, option)}
                      />
                    ) : (
                      <Radio
                        key={index}
                        id={option}
                        name={option}
                        checked={filters[item.id] === option}
                        onChange={() => handleChangeSingle(item.id, option)}
                      />
                    )}
                    <span className={css({ fontSize: '16px', lineHeight: '20px', padding: '0px 5px' })}>
                      <Trans>{option}</Trans>
                    </span>
                  </label>
                </div>
              ))}
              {item.multi && (
                <div className={css({ marginTop: '16px' })}>
                  <LinkButton onClick={() => handleSelectAll(item.id)}>Select all</LinkButton>
                </div>
              )}
            </div>
          ))}
          <div className={css({ padding: '16px 0' })}>
            <div className={css(titleStyle)}>Filter results</div>
            <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
              <Button mode='inverse' styles={[buttonStyle]} onPress={handleClearAll}>
                Clear All
              </Button>
              <IconButton
                data-test-id='filter'
                graphic='arrowRight'
                customVariantRules={{ default: iconBtnStyle }}
                iconPosition={Position.RIGHT}
                iconStyles={iconStyle}
                onPress={HandleFilterApply}
              >
                Filter
              </IconButton>
            </div>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

const titleStyle: Rule = {
  fontWeight: '600',
  marginBottom: '16px',
};

const blockStyle: Rule = () => {
  const { theme } = useStyle();

  return {
    borderBottom: `1px solid ${theme.colors.disabled}`,
    padding: '24px 0',
  };
};

const buttonStyle: Rule = ({ theme }) => ({
  border: `1px solid ${theme.colors.tescoBlue}`,
  width: '50%',
  marginRight: '8px',
});

const iconBtnStyle: Rule = ({ theme }) => ({
  width: '50%',
  padding: '12px 20px 12px 22px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  whiteSpace: 'nowrap',
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  height: '18px',
  '> path': {
    fill: colors.white,
  },
} as Rule;

export default Filtering;
