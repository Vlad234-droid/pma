import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import { FieldValues } from 'react-hook-form';

import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';

const RadioWrapper: FC<{ text: string; name: string } & FieldValues> = ({ text, setValue, name, values }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapper)}>
      <span className={css({ ...mainLabel })}>{text}</span>
      <label htmlFor='yes' className={css(labelStyle)}>
        <Radio
          name='yes'
          checked={values.longTerm}
          id='yes'
          onChange={() => setValue(name, 'Yes', { shouldValidate: true, shouldDirty: true })}
        />
        <span className={css(titleStyle)}>
          <Trans i18nKey='yes'>Yes</Trans>
        </span>
      </label>
      <label htmlFor='no' className={css(labelStyle)}>
        <Radio
          name='no'
          checked={!values.longTerm}
          id='no'
          onChange={() => setValue(name, '', { shouldValidate: true, shouldDirty: true })}
        />
        <span className={css(titleStyle)}>
          <Trans i18nKey='no'>No</Trans>
        </span>
      </label>
    </div>
  );
};

const wrapper: Rule = {
  display: 'flex',
  flexDirection: 'column',
};
const titleStyle: Rule = {
  marginLeft: '16px',
};
const labelStyle: Rule = {
  marginTop: '22px',
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '64px',
  cursor: 'pointer',
  '&:last-child': {
    marginBottom: '24px',
  },
} as Styles;
const mainLabel: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  lineHeight: theme.font.fixed.f24.lineHeight,
  fontSize: theme.font.fixed.f16.fontSize,
  color: theme.colors.base,
});

export default RadioWrapper;
