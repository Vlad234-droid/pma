import React, { FC, useState, useEffect } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { Item } from 'components/Form';
import SearchInput from 'components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, getColleaguesSelector } from '@pma/store';
import defaultImg from 'images/default.png';

type Props = {
  onSelect: (person: any) => void;
  selected: Array<string>;
  error: string;
};

const ColleaguesFinder: FC<Props> = ({ onSelect, error, selected }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const { css } = useStyle();

  const colleagues = useSelector(getColleaguesSelector) || [];

  const handleSearchColleagues = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue === '' || searchValue.length <= 1) {
      dispatch(ColleaguesActions.clearColleagueList());
      return;
    }

    dispatch(
      ColleaguesActions.getColleagues({
        'first-name_like': searchValue,
        'last-name_like': searchValue,
      }),
    );
  }, [searchValue]);

  useEffect(() => {
    return () => {
      dispatch(ColleaguesActions.clearColleagueList());
    };
  }, []);

  const handleChange = (e: any) => {
    const { colleagueUUID, profile } = e.colleague;
    onSelect([...selected, { value: colleagueUUID, label: `${profile?.firstName} ${profile?.lastName}` }]);
    dispatch(ColleaguesActions.clearColleagueList());
  };

  return (
    <>
      <div className={css({ marginTop: '32px' })} data-test-id='search-part'>
        <Item errormessage={error}>
          <SearchInput
            value={searchValue}
            name={`search_option`}
            onChange={handleChange}
            onSearch={handleSearchColleagues}
            onClear={() => onSelect([])}
            onDelete={(colleagueUuid) => onSelect(selected.filter((value) => value === colleagueUuid))}
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
