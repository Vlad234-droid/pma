import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import useSearchColleagues from 'hooks/useSearchColleagues';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import defaultImg from 'images/default.png';

type Props = {
  onSelect: (person: any) => void;
  selected: Array<{ value: string; label: string }>;
  error: string;
};

const ColleaguesFinder: FC<Props> = ({ onSelect, error, selected }) => {
  const { css } = useStyle();

  const { colleagues, handleSearchColleagues, clearColleagueList } = useSearchColleagues();

  const handleChange = (e: any) => {
    const { colleagueUUID, profile } = e.colleague;
    onSelect([...selected, { value: colleagueUUID, label: `${profile?.firstName} ${profile?.lastName}` }]);
    clearColleagueList();
  };

  return (
    <>
      <div className={css({ marginTop: '32px' })} data-test-id='search-part'>
        <Item errormessage={error}>
          <SearchInput
            name={'search_option'}
            onChange={handleChange}
            onSearch={(e) => handleSearchColleagues(e.target.value)}
            onClear={() => onSelect([])}
            onDelete={(colleagueUuid) => onSelect(selected.filter(({ value }) => value !== colleagueUuid))}
            placeholder={'Search'}
            options={colleagues || []}
            selected={selected}
            multiple
            renderOption={(item) => (
              <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
                <img className={css({ width: '50px', height: '50px', borderRadius: '50%' })} src={defaultImg} />
                <div className={css({ marginLeft: '16px' })}>
                  <div className={css(FlexGapStyle, SelectedItemStyle)}>
                    <div>{item?.colleague?.profile?.firstName}</div>
                    <div>{item?.colleague?.profile?.lastName}</div>
                  </div>
                  <div className={css(FlexGapStyle, { marginTop: '4px' })}>
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

const FlexGapStyle: Rule = {
  display: 'flex',
  gap: '8px',
};

const SelectedItemStyle: Rule = ({ colors }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: colors.link,
});

export default ColleaguesFinder;
