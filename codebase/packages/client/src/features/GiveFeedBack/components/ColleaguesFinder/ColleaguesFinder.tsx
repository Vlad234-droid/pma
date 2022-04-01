import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import useSearchColleagues from 'hooks/useSearchColleagues';
import defaultImg from 'images/default.png';
import { useTranslation } from 'components/Translation';

type Props = {
  onSelect: (person: any) => void;
  selected?: any;
  value: string;
  error?: string;
};

const ColleaguesFinder: FC<Props> = ({ onSelect, error, value }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const { colleagues, handleSearchColleagues } = useSearchColleagues({}, false);

  const handleChange = (e: any) => {
    const { colleagueUUID } = e.colleague;
    onSelect(colleagueUUID);
  };

  return (
    <>
      <div className={css({ marginTop: '32px' })} data-test-id='search-part'>
        <Item errormessage={error}>
          <SearchInput
            name={'search_option'}
            onChange={handleChange}
            onSearch={(e) => handleSearchColleagues(e.target.value)}
            placeholder={t('search', 'Search')}
            options={value ? [] : colleagues}
            selected={null}
            value={value}
            disabled={Boolean(value)}
            renderOption={(item) => (
              <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
                <img className={css({ width: '50px', height: '50px', borderRadius: '50%' })} src={defaultImg} />
                <div className={css({ marginLeft: '16px' })}>
                  <div className={css(flexGapStyle, selectedItemStyle)}>
                    <div>{item?.colleague?.profile?.firstName}</div>
                    <div>{item?.colleague?.profile?.lastName}</div>
                  </div>
                  <div className={css({ marginTop: '4px' })}>
                    <div>{item?.colleague?.workRelationships[0].job?.name}</div>
                    <div>{item?.colleague?.workRelationships[0].department?.name}</div>
                  </div>
                </div>
              </div>
            )}
          />
        </Item>
      </div>
    </>
  );
};

const flexGapStyle: Rule = {
  display: 'flex',
  gap: '8px',
};

const selectedItemStyle: Rule = ({ colors }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: colors.link,
});

export default ColleaguesFinder;
