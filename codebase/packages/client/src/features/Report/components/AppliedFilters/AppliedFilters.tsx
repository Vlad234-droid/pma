import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';

type AppliedFiltersProps = {
  clearAppliedFilters: (item: string) => void;
  getAppliedReport: () => any;
  colleaguesCount?: number;
};

const AppliedFilters: FC<AppliedFiltersProps> = ({ clearAppliedFilters, getAppliedReport, colleaguesCount = 0 }) => {
  const { css } = useStyle();

  return (
    <div className={css({ height: '92px' })}>
      <div className={css(appliedWrapperFilters)}>
        <span>Filtered applied:</span>
        <div className={css(flexStyle)}>
          {getAppliedReport().map((item) => (
            <div key={item} className={css(filterAppliedStyle)}>
              <span className={css(filteredTitle)}>{item}</span>
              <IconButton
                graphic='decline'
                iconStyles={iconDeclineStyle}
                onPress={() => {
                  clearAppliedFilters(item);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <span className={css(countStyle)}>Colleagues: {colleaguesCount}</span>
    </div>
  );
};

const appliedWrapperFilters: Rule = ({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '22px',
      color: theme.colors.base,
    },
  } as Styles;
};

const filterAppliedStyle: Rule = ({ theme }) => {
  return {
    border: `1px solid ${theme.colors.link}`,
    borderRadius: '10px',
    padding: '6px 12px',
  };
};

const iconDeclineStyle: Rule = {
  width: '15px',
  height: '15px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const flexStyle: Rule = {
  display: 'flex',
  gap: '10px',
  marginLeft: '12px',
};

const filteredTitle: Rule = ({ theme }) => {
  return {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.colors.base,
  };
};

const countStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.colors.base,
    marginTop: '13px',
    display: 'inline-block',
  };
};
export default AppliedFilters;
