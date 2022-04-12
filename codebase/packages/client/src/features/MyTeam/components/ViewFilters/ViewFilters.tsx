import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Radio } from 'components/Form';
import { useTranslation } from 'components/Translation';

import { View } from '../../config/types';

type Props = {
  onChange: (view: View) => void;
  view: View;
};

const ViewFilters: FC<Props> = ({ view, onChange }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div data-test-id='view-filters' className={css(wrapperStyles)}>
      <label className={css({ ...filterItemStyles, marginRight: '32px' })}>
        <Radio
          id={View.DIRECT_REPORTS}
          value={View.DIRECT_REPORTS}
          name={View.DIRECT_REPORTS}
          onChange={() => onChange(View.DIRECT_REPORTS)}
          checked={view === View.DIRECT_REPORTS}
        />
        <span className={css(filterLabelStyles)}>{t('my_direct_reports', 'My direct reports')}</span>
      </label>
      <label className={css(filterItemStyles)}>
        <Radio
          id={View.FULL_TEAM}
          value={View.FULL_TEAM}
          name={View.FULL_TEAM}
          onChange={() => onChange(View.FULL_TEAM)}
          checked={view === View.FULL_TEAM}
        />
        <span className={css(filterLabelStyles)}>{t('my_full_team', 'My full team')}</span>
      </label>
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexDirection: 'row',
};

const filterItemStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const filterLabelStyles: Rule = ({ theme }) => ({
  marginLeft: '11px',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  letterSpacing: '0px',
});

export default ViewFilters;
