import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { useTranslation } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { Priority } from '../../config/types';
import PriorityLabel from '../PriorityLabel';
import Spinner from 'components/Spinner';

type Props = {
  priorities: Priority[];
  loading: boolean;
  onNext: (checked: string) => void;
  onClose: () => void;
};

const SelectPriorityForm: FC<Props> = ({ priorities, loading, onNext, onClose }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [checked, setChecked] = useState<string>('');

  const handleNext = () => {
    !!checked && onNext(checked);
  };

  return (
    <>
      <h2 className={css(titleStyles)}>{t('choose_priority_for_adding_notes', 'Choose priority for adding notes')}</h2>
      <p className={css(subTitleStyles)}>
        {t('select_priority_youd_like_to_add_text', 'Select to which priority you would like to add notes')}
      </p>
      {loading ? (
        <Spinner fullHeight />
      ) : priorities.length !== 0 ? (
        priorities.map((priority) => (
          <PriorityLabel key={priority.uuid} priority={priority} checked={checked} onChange={setChecked} />
        ))
      ) : (
        <p>{t('no_priorities_available', 'No priorities are available')}</p>
      )}
      <ButtonsWrapper
        isValid={!!checked}
        rightTextWithIcon={t('continue', 'Continue')}
        onLeftPress={onClose}
        onRightPress={handleNext}
      />
    </>
  );
};

export default SelectPriorityForm;

const titleStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fixed.f28.lineHeight,
  marginBottom: theme.spacing.s2,
  marginTop: '0px',
  letterSpacing: '0px',
});

const subTitleStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f24.lineHeight,
  fontWeight: theme.font.weight.regular,
  margin: 0,
});
