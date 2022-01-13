import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

import { Radio } from 'components/Form';

import { View } from '../../config/types';

type Props = {
  onChange: (view: View) => void;
  view: View;
};

const ViewFilters: FC<Props> = ({ view, onChange }) => {
  const { css } = useStyle();

  return (
    <div className={css({ display: 'flex', flexDirection: 'row' })}>
      <label className={css({ ...filterItemStyles, marginRight: '32px' })}>
        <Radio
          id={View.DIRECT_REPORTS}
          value={View.DIRECT_REPORTS}
          name={View.DIRECT_REPORTS}
          onChange={() => onChange(View.DIRECT_REPORTS)}
          checked={view === View.DIRECT_REPORTS}
        />
        <span className={css(filterLabelStyles)}>My direct reports</span>
      </label>
      <label className={css(filterItemStyles)}>
        <Radio
          id={View.FULL_TEAM}
          value={View.FULL_TEAM}
          name={View.FULL_TEAM}
          onChange={() => onChange(View.FULL_TEAM)}
          checked={view === View.FULL_TEAM}
        />
        <span className={css(filterLabelStyles)}>My full team</span>
      </label>
    </div>
  );
};

const filterItemStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const filterLabelStyles: Rule = ({ theme }) => ({
  marginLeft: '11px',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
});

export default ViewFilters;
