import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';

export const APPLIED_WRAPPER = 'applied_wrapper';
export const CLEAR_FILTER = 'clear_filter';
export const COLLEAGUES_COUNT = 'colleagues_count';

type AppliedFiltersProps = {
  clearAppliedFilters: (item: string) => void;
  getAppliedReport: Array<string>;
  colleaguesCount?: number;
};

const AppliedFilters: FC<AppliedFiltersProps> = ({
  clearAppliedFilters,
  getAppliedReport = [],
  colleaguesCount = 0,
}) => {
  const { css } = useStyle();

  return (
    <div className={css({ height: '92px' })} data-test-id={APPLIED_WRAPPER}>
      <div className={css(appliedWrapperFilters)}>
        <span>Filtered applied:</span>
        <div className={css(flexStyle)}>
          {getAppliedReport?.length &&
            getAppliedReport?.map((item) => (
              <div key={item} className={css(filterAppliedStyle)}>
                <span className={css(filteredTitle)}>{item}</span>
                <IconButton
                  data-test-id={CLEAR_FILTER}
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
      <span data-test-id={COLLEAGUES_COUNT} className={css(countStyle)}>
        <Trans i18nKey='colleagues'>Colleagues</Trans>: {colleaguesCount}
      </span>
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
