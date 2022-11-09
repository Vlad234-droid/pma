import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import { Field, Input } from 'components/Form';

type Props = {
  children: ({ searchValue, Field }: { searchValue: string; Field?: ReactNode }) => ReactNode;
  customStyles?: Rule | Styles | CSSProperties | {};
};

const SearchWithField: FC<Props> = ({ children, customStyles = {} }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={css({ width: '100%' })}>
      {children({
        searchValue: searchValue.length >= 3 ? searchValue : '',
        Field: (
          <Field
            Element={Input}
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(() => value)}
            placeholder={t('search', 'Search')}
            readonly={false}
            customStyles={{ borderRadius: '20px', ...customStyles }}
          />
        ),
      })}
    </div>
  );
};

export default SearchWithField;
