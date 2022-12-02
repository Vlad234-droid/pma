import React, { CSSProperties, FC } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import { useTranslation } from 'components/Translation';
import { ColleagueProfile } from 'components/ColleagueProfile';

import useSearchColleaguesSimple from '../../hooks/useSearchColleaguesSimple';

import { SearchOption } from 'config/enum';
import { Icon } from 'components/Icon';

export const TEST_ID = 'colleagues-simple-finder';

type Props = {
  onSelect: (person: any) => void;
  error?: string;
  value?: string;
  options?: Record<string, string>;
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

  const { colleagues, handleSearchColleagues, clearColleagueList } = useSearchColleaguesSimple(options);

  const handleChange = (e: any) => {
    const { uuid, firstName, lastName } = e;

    if (multiple) {
      onSelect([...selected, { value: uuid, label: `${firstName} ${lastName}` }]);
      return clearColleagueList();
    }
    onSelect(uuid);
  };

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
          optionDataLiner={'These colleagues are included into another sessions:'}
          onChange={handleChange}
          onSearch={(e) => handleSearchColleagues(e.target.value, searchOption)}
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

export default ColleaguesFinder;
