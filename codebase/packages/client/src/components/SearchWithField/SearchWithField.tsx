import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import { Field, Input } from 'components/Form';
import { Icon } from 'components/Icon';

type Props = {
  children: ({ searchValue, Field }: { searchValue: string; Field?: ReactNode }) => ReactNode;
  customStyles?: Rule | Styles | CSSProperties | {};
};

const SearchWithField: FC<Props> = ({ children, customStyles = {} }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={css({ width: '100%' })}>
      {children({
        searchValue: searchValue.length >= 3 ? searchValue : '',
        Field: (
          <div className={css({ position: 'relative' })}>
            <span className={css(iconStyles)}>
              <Icon graphic={'search'} fill={theme.colors.grayscale} />
            </span>
            <Field
              Element={Input}
              value={searchValue}
              onChange={({ target: { value } }) => setSearchValue(() => value)}
              placeholder={t('search', 'Search')}
              readonly={false}
              customStyles={{ borderRadius: '20px', padding: '10px 40px 10px 46px', ...customStyles }}
            />
          </div>
        ),
      })}
    </div>
  );
};

const iconStyles: Rule = { position: 'absolute', left: '18px', bottom: '50%', transform: 'translate(0%, 60%)' };

export default SearchWithField;
