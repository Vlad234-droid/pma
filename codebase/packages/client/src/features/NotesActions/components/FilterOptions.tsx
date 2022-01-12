import React, { FC } from 'react';
import { FilterOption as FilterOptionInput } from 'features/Shared';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';

type FilterOptionProps = any;

export const INFO_ICON = 'info_icon';
export const FILTER_WRAPPER = 'filter_wrapper';

const FilterOption: FC<FilterOptionProps> = ({
  focus,
  setFocus,
  searchValueFilterOption,
  setSearchValueFilterOption,
  TEAM,
  setInfoModal,
}) => {
  const { css } = useStyle();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        justifyContent: 'flex-end',
        marginTop: '17px',
      })}
      data-test-id={FILTER_WRAPPER}
    >
      <IconButton
        iconProps={{
          title: TEAM
            ? 'My Notes can be used to create and store notes about Your Contribution throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager during your 1:1s. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.'
            : 'My Notes can be used to create and store notes about Your Contribution and that of your direct reports throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager or direct reports during your 1:1s. Team notes can be used to help keep track of your direct reports work, achievements or conversations to refer back to at a later date. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.',
        }}
        graphic='information'
        customVariantRules={{
          default: iconBtnStyleInfo,
        }}
        data-test-id={INFO_ICON}
        iconStyles={iconStyle}
        onPress={() => {
          setInfoModal(() => true);
        }}
      />

      <FilterOptionInput
        focus={focus}
        customIcon={true}
        searchValue={searchValueFilterOption}
        onFocus={setFocus}
        withIcon={false}
        customStyles={{
          ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
          ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
        }}
        onChange={(e) => setSearchValueFilterOption(() => e.target.value)}
        visibleSettings={false}
        setSearchValueFilterOption={setSearchValueFilterOption}
      />
    </div>
  );
};

const iconBtnStyleInfo: Rule = {
  padding: '0',
  marginLeft: '5px',
  height: '38px',
  width: '38px',
  outline: 0,

  cursor: 'pointer',
  '& > svg': {
    width: '24px',
    height: '24px',
  },
} as Styles;

const iconStyle: Rule = {
  width: '24px',
  height: '24px',
  position: 'relative',
  top: '2px',
  left: '2px',
};

export default FilterOption;
