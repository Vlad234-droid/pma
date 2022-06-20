import React, { FC, useEffect, useState } from 'react';
import { FilterOption as FilterOptionInput } from 'features/general/Shared';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';

type FilterOptionProps = {
  onSearch: string;
  setSearchValueFilterOption: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  onClickInfo: () => void;
};

export const INFO_ICON = 'info_icon';
export const FILTER_WRAPPER = 'filter_wrapper';

const FilterOption: FC<FilterOptionProps> = ({ onSearch, setSearchValueFilterOption, title, onClickInfo }) => {
  const { css } = useStyle();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (!focus) {
      setSearchValueFilterOption(() => '');
    }
  }, [focus]);

  return (
    <div
      className={css({
        display: 'flex',
      })}
      data-test-id={FILTER_WRAPPER}
    >
      <IconButton
        iconProps={{
          title,
        }}
        graphic='information'
        customVariantRules={{
          default: iconBtnStyleInfo,
        }}
        data-test-id={INFO_ICON}
        iconStyles={iconStyle}
        onPress={onClickInfo}
      />

      <FilterOptionInput
        focus={focus}
        customIcon={true}
        searchValue={onSearch}
        onFocus={setFocus}
        withIcon={false}
        customStyles={{
          ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
          ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
        }}
        onChange={(e) => setSearchValueFilterOption(e.target.value)}
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
  marginBottom: '4px',
};

export default FilterOption;
