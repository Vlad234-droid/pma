import React, { FC, useMemo } from 'react';
import { Checkbox } from 'components/Form';
import { useTranslation } from 'components/Translation/Translation';

type Props = {
  onChange: (checked: boolean) => void;
  checked: boolean;
  indeterminate: boolean;
  disabled?: boolean;
};

const SelectAll: FC<Props> = ({ onChange, checked, indeterminate, disabled }) => {
  const { t } = useTranslation();
  const label = useMemo(() => {
    if (checked) return t('unselect_all', 'Unselect All');
    //if (indeterminate) return t('unselect', 'Unselect');

    return t('select_all', 'Select All');
  }, [checked, indeterminate]);

  return (
    <Checkbox
      disabled={disabled}
      name='selectAll'
      id='selectAll'
      onChange={onChange}
      checked={checked}
      indeterminate={indeterminate}
      label={label}
      labelStyle={{ fontWeight: 700 }}
    />
  );
};

export default SelectAll;
