import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { Item } from 'components/Form';
import { SearchInput } from '../components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, getColleaguesSelector } from '@pma/store';
import defaultImg from '../../../../public/default.png';

type Props = {
  onSelect: (person: any) => void;
  selected?: any;
  value: string;
  error: string;
};

const ColleaguesFinder: FC<Props> = ({ onSelect, error, value }) => {
  const dispatch = useDispatch();
  const [selectedColleagueName, setSelectedColleagueName] = useState(value);
  const { css } = useStyle();

  const colleagues = useSelector(getColleaguesSelector) || [];

  const handleSearchColleagues = (e) => {
    const value = e.target.value;
    if (value === '' || value.length <= 1) {
      dispatch(ColleaguesActions.clearColleagueList());
      return;
    }
    dispatch(
      ColleaguesActions.getColleagues({
        'first-name_like': value,
        'last-name_like': value,
      }),
    );
  };

  const handleChange = (e: any) => {
    const {
      profile: { firstName, lastName },
      colleagueUUID,
    } = e.colleague;
    onSelect(colleagueUUID);
    setSelectedColleagueName(`${firstName} ${lastName}`);
  };

  return (
    <>
      <div className={css({ marginTop: '32px' })} data-test-id='search-part'>
        <Item errormessage={error}>
          <SearchInput
            name={`search_option`}
            onChange={handleChange}
            onSearch={handleSearchColleagues}
            placeholder={'Search'}
            options={selectedColleagueName ? [] : colleagues}
            selected={null}
            value={selectedColleagueName}
            disabled={Boolean(selectedColleagueName)}
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
