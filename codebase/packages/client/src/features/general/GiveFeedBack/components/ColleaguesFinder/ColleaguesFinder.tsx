import React, { CSSProperties, FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import useSearchColleagues from 'hooks/useSearchColleagues';
import defaultImg from 'images/default.png';
import { useTranslation } from 'components/Translation';

import { SearchOption } from 'config/enum';

type Props = {
  onSelect: (person: any) => void;
  selected?: any;
  value?: string;
  error?: string;
  options?: Record<string, string>;
  searchOption?: SearchOption;
  customStyle?: CSSProperties | {};
  inputStyles?: CSSProperties | {};
};

const ColleaguesFinder: FC<Props> = ({
  onSelect,
  error,
  value,
  options = {},
  searchOption = SearchOption.NAME,
  customStyle = {},
  inputStyles = {},
  selected = [],
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const { colleagues, handleSearchColleagues } = useSearchColleagues(options, false);

  const handleChange = (e: any) => {
    const { colleagueUUID } = e.colleague;
    onSelect(colleagueUUID);
  };

  return (
    <div className={css({ marginTop: '32px', ...customStyle })} data-test-id='search-part'>
      <Item errormessage={error}>
        <SearchInput
          searchOption={searchOption}
          styles={inputStyles}
          name={'search_option'}
          onChange={handleChange}
          onSearch={(e) => handleSearchColleagues(e.target.value, searchOption)}
          placeholder={t('search', 'Search')}
          options={value ? [] : colleagues}
          selected={selected}
          value={value}
          disabled={Boolean(value)}
          renderOption={(item) => (
            <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
              <img
                className={css({ width: '50px', height: '50px', borderRadius: '50%' })}
                src={defaultImg}
                alt={'User image'}
              />
              <div className={css({ marginLeft: '16px' })}>
                <div className={css(flexGapStyle, selectedItemStyle)}>
                  <div>{item?.colleague?.profile?.firstName}</div>
                  <div>{item?.colleague?.profile?.lastName}</div>
                </div>
                <div className={css({ marginTop: '4px' })}>
                  <div>{item?.colleague?.workRelationships[0]?.job?.name}</div>
                  <div>{item?.colleague?.workRelationships[0]?.department?.name}</div>
                </div>
              </div>
            </div>
          )}
        />
      </Item>
    </div>
  );
};

const flexGapStyle: Rule = ({ theme }) => {
  return {
    display: 'flex',
    gap: '8px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const selectedItemStyle: Rule = ({ colors, theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  color: colors.link,
});

export default ColleaguesFinder;
