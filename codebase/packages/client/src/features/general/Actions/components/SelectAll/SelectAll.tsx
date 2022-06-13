import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { Checkbox } from 'components/Form';
import { Trans } from 'components/Translation/Translation';

type Props = {
  onChange: () => void;
  checked: boolean;
  indeterminate: boolean;
  disabled?: boolean;
};

export const SelectAll: FC<Props> = ({ onChange, checked, indeterminate, disabled }) => {
  const { css } = useStyle();

  return (
    <label>
      <Checkbox
        disabled={disabled}
        name='selectAll'
        id='selectAll'
        onChange={onChange}
        checked={checked}
        indeterminate={indeterminate}
      />
      <span className={css(spanStyle)}>
        <Trans i18nKey={'select_all'}>Select All</Trans>
      </span>
    </label>
  );
};

const spanStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  letterSpacing: '0px',
  paddingLeft: '16px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  cursor: 'pointer',
});
