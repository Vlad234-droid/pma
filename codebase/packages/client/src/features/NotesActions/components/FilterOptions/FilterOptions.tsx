import React, { FC, useEffect, useState } from 'react';
import { FilterOption as FilterOptionInput } from 'features/general/Shared';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { useTranslation } from 'components/Translation';

type FilterOptionProps = {
  searchValueFilterOption: string;
  setSearchValueFilterOption: React.Dispatch<React.SetStateAction<string>>;
  TEAM: boolean;
  openInfoModal: () => void;
};

export const INFO_ICON = 'info_icon';
export const FILTER_WRAPPER = 'filter_wrapper';

const FilterOption: FC<FilterOptionProps> = ({
  searchValueFilterOption,
  setSearchValueFilterOption,
  TEAM,
  openInfoModal,
}) => {
  const { css } = useStyle();
  const [focus, setFocus] = useState(false);
  const { t } = useTranslation();

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
          title: TEAM
            ? t(
                'my_notes_can_be_used_to_create_and_store_notes',
                'My Notes can be used to create and store notes about Your Contribution throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager during your 1:1s. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.',
              )
            : t(
                'my_notes_can_be_used_to_create_and_store_notes_about_your_contribution',
                'My Notes can be used to create and store notes about Your Contribution and that of your direct reports throughout the year. Use this space to record achievements, thoughts on objectives or subjects to raise with your line manager or direct reports during your 1:1s. Team notes can be used to help keep track of your direct reports work, achievements or conversations to refer back to at a later date. Although these notes are private, in limited circumstances, they may need to be shared with others (for example as part of an investigation or Data Protection request) so they should be kept professional.',
              ),
        }}
        graphic='information'
        customVariantRules={{
          default: iconBtnStyleInfo,
        }}
        data-test-id={INFO_ICON}
        iconStyles={iconStyle}
        onPress={openInfoModal}
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
  marginBottom: '4px',
};

export default FilterOption;
