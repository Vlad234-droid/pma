import React, { CSSProperties, FC, useCallback } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import { useTranslation } from 'components/Translation';
import { ColleagueProfile } from 'components/ColleagueProfile';

import useSearchColleagues from 'hooks/useSearchColleagues';

import { SearchOption } from 'config/enum';
import { Icon } from '../Icon';
import debounce from 'lodash.debounce';

export const TEST_ID = 'colleagues-finder';

type Props = {
  onSelect: (person: any) => void;
  error?: string;
  value?: string;
  options?: Record<string, string | boolean>;
  searchOption?: SearchOption;
  customStyles?: CSSProperties | Rule | Styles | {};
  inputStyles?: CSSProperties | Rule | Styles | {};
  multiple?: boolean;
  selected?: Array<{ value: string; label: string }>;
  onBlur?: () => void;
  withIcon?: boolean;
  marginBot?: boolean;
  customIcon?: boolean;
};

const ColleaguesFinder: FC<Props> = ({
  onSelect,
  error,
  value,
  options = {},
  searchOption = SearchOption.NAME,
  customStyles = {},
  inputStyles = {},
  multiple = false,
  selected = [],
  onBlur,
  withIcon = true,
  marginBot = true,
  customIcon,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const { colleagues, handleSearchColleagues, clearColleagueList } = useSearchColleagues(options);

  const handleChange = (e: any) => {
    const { colleagueUUID, profile } = e.colleague;

    if (multiple) {
      onSelect([...selected, { value: colleagueUUID, label: `${profile?.firstName} ${profile?.lastName}` }]);
      return clearColleagueList();
    }
    onSelect(colleagueUUID);
  };

  const handleSearch = useCallback(
    debounce((e) => handleSearchColleagues(e.target.value, searchOption), 300),
    [searchOption],
  );

  return (
    <div className={css({ marginTop: '32px', ...customStyles })} data-test-id={TEST_ID}>
      <Item
        errormessage={error}
        withIcon={withIcon}
        marginBot={marginBot}
        customIcon={customIcon && <Icon size={'20px'} graphic='search' iconStyles={iconStyles} />}
      >
        <SearchInput
          key={searchOption}
          styles={inputStyles}
          name={'search_option'}
          onChange={handleChange}
          onSearch={handleSearch}
          placeholder={t('search', 'Search')}
          options={value ? [] : colleagues}
          selected={selected}
          value={value}
          disabled={Boolean(value)}
          multiple={multiple}
          onBlur={onBlur}
          onClear={() => onSelect([])}
          isValid={!error}
          onDelete={(colleagueUuid) => onSelect(selected.filter(({ value }) => value !== colleagueUuid))}
          renderOption={(item) => (
            <ColleagueProfile
              firstName={item?.colleague?.profile?.firstName}
              lastName={item?.colleague?.profile?.lastName}
              job={item?.colleague?.workRelationships?.[0]?.job?.name}
              department={item?.colleague?.workRelationships?.[0]?.department?.name}
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

export default ColleaguesFinder;
