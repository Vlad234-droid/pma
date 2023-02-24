import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Input, Item as FormItem } from 'components/Form';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';

type Props = {
  focus: boolean;
  onFocus: () => void;
  iconStyles?: Rule;
  onSearch: (value: string) => void;
  value: string;
  placeholder?: string;
};

const Search: FC<Props> = ({ focus, onFocus, iconStyles, onSearch, value, placeholder }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div
      data-test-id='search-wrapper'
      className={css({
        width: focus ? '240px' : '40px',
        transition: '.3s all ease',
        marginLeft: '5px',
      })}
    >
      <FormItem
        withIcon={false}
        marginBot={false}
        customIcon={<Icon graphic='search' iconStyles={iconStyles} size={'17px'} />}
        focus={focus}
        onFocus={onFocus}
      >
        <Input
          name='search'
          value={focus ? value : ''}
          onChange={handleSearch}
          placeholder={focus ? (placeholder ? placeholder : t('search_keyword', 'Search keyword')) : ''}
          customStyles={{
            ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
            ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
            background: '#F6F6F6',
            height: '40px',
            border: '2px solid rgb(0, 83, 159)',
            cursor: 'pointer',
            ...(!focus && { borderRadius: '50%', padding: '0px' }),
          }}
          onFocus={onFocus}
        />
      </FormItem>
    </div>
  );
};

export default Search;
