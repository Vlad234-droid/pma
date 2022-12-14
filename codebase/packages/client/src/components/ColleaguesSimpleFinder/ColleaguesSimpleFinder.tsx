import React, { CSSProperties, FC, RefObject, useCallback } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import { ColleagueProfile } from 'components/ColleagueProfile';

import { SearchOption } from 'config/enum';
import { Icon } from '../Icon';
import debounce from 'lodash.debounce';

export const TEST_ID = 'colleagues-finder';

type Props = {
  onSelect: (person: any) => void;
  error?: string;
  value?: string;
  placeholder?: string;
  options?: Record<string, string>;
  searchOption?: SearchOption;
  customStyles?: CSSProperties | Rule | Styles | {};
  inputStyles?: CSSProperties | Rule | Styles | {};
  iconCustomStyles?: CSSProperties | Rule | Styles | {};
  multiple?: boolean;
  selected?: Array<{ value: string; label: string }>;
  onBlur?: () => void;
  onFocus?: () => void;
  withIcon?: boolean;
  marginBot?: boolean;
  customIcon?: boolean;
  domRef?: RefObject<any>;
  colleagues: any;
  handleSearchColleagues: (value: string, searchOption: SearchOption) => void;
  clearColleagueList: () => void;
};

const ColleaguesSimpleFinder: FC<Props> = ({
  domRef,
  onSelect,
  error,
  value,
  placeholder,
  options = {},
  searchOption = SearchOption.NAME,
  customStyles = {},
  inputStyles = {},
  iconCustomStyles = {},
  multiple = false,
  selected = [],
  onBlur,
  onFocus,
  withIcon = true,
  customIcon,
  colleagues,
  handleSearchColleagues,
  clearColleagueList,
}) => {
  const { css } = useStyle();

  const handleChange = (e: any) => {
    const { uuid, firstName, lastName, type } = e;

    if (multiple) {
      onSelect([...selected, { value: uuid, label: `${firstName} ${lastName}`, type }]);
      return clearColleagueList();
    }
    onSelect(uuid);
  };

  const handleSearch = useCallback(
    debounce((e) => handleSearchColleagues(e.target.value, searchOption), 300),
    [],
  );

  return (
    <div className={css({ marginTop: '32px', ...customStyles })} data-test-id={TEST_ID}>
      <Item
        errormessage={error}
        withIcon={withIcon}
        marginBot={false}
        iconCustomStyles={iconCustomStyles}
        customIcon={customIcon && <Icon size={'16px'} graphic='search' iconStyles={iconStyles} />}
      >
        <SearchInput
          domRef={domRef}
          key={searchOption}
          styles={inputStyles}
          name={'search_option'}
          onChange={handleChange}
          onSearch={handleSearch}
          placeholder={placeholder}
          options={value ? [] : colleagues}
          selected={selected}
          value={value}
          disabled={Boolean(value)}
          multiple={multiple}
          onBlur={onBlur}
          onFocus={onFocus}
          onClear={() => onSelect([])}
          isValid={!error}
          onDelete={(colleagueUuid) => onSelect(selected.filter(({ value }) => value !== colleagueUuid))}
          renderOption={(item) => (
            <ColleagueProfile
              firstName={item?.firstName}
              lastName={item?.lastName}
              job={item?.jobName}
              department={''}
            />
          )}
        />
      </Item>
    </div>
  );
};

const iconStyles: Rule = {
  marginTop: '4px',
};

export default ColleaguesSimpleFinder;
