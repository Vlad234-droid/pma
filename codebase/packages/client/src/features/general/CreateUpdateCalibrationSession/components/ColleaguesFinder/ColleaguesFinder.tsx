import React, { CSSProperties, FC } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import { Trans, useTranslation } from 'components/Translation';
import { ColleagueProfile } from 'components/ColleagueProfile';

import useSearchColleaguesSimple from '../../hooks/useSearchColleaguesSimple';

import { SearchOption } from 'config/enum';
import { Icon } from 'components/Icon';
import { ColleagueSimpleExtended } from '../../types';

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
  colleagues: ColleagueSimpleExtended[];
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
  colleagues,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const disabledColleagues = colleagues.filter((colleague) => colleague.type === 'disabled');
  const availableColleagues = colleagues.filter((colleague) => colleague.type !== 'disabled');

  const {
    colleagues: filteredColleagues,
    handleSearchColleagues,
    clearColleagueList,
  } = useSearchColleaguesSimple(availableColleagues);

  const handleChange = (e: any) => {
    const { uuid, firstName, lastName, type } = e;

    if (multiple) {
      onSelect([...selected, { value: uuid, label: `${firstName} ${lastName}`, type }]);
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
          options={value ? [] : filteredColleagues}
          disabledOptions={disabledColleagues}
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
              action={
                <div className={css(optionActionStyle)}>
                  <Trans i18nKey={item?.type}>{item?.type}</Trans>
                </div>
              }
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
const optionActionStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  marginLeft: 'auto',
  fontWeight: 'bold',
  color: theme.colors.tescoBlue,
});

export default ColleaguesFinder;
