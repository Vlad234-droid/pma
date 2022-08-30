import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { Radio } from 'components/Form';
import { Priority } from '../../config/types';

type Props = {
  priority: Priority;
  checked: string;
  onChange: (id: string) => void;
};

const PriorityDetails: FC<Props> = ({ priority, checked, onChange }) => {
  const { css } = useStyle();
  const {
    uuid,
    properties: { title, strategic_driver },
  } = priority;

  return (
    <label key={priority.uuid} className={css(labelStyles)}>
      <Radio
        name={`${title}`}
        checked={checked === uuid}
        id={uuid}
        value={uuid}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={css(priorityDetailsStyles)}>
        <span className={css(titleStyles)}>{title}</span>
        <span className={css(descriptionStyles)}>{strategic_driver}</span>
      </div>
    </label>
  );
};

export default PriorityDetails;

const priorityDetailsStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 10px',
};

const labelStyles: Rule = ({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '24px 0px',
  cursor: 'pointer',
  // @ts-ignore
  borderBottom: `2px solid ${theme.colors.lightGray}`,
});

const titleStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  fontWeight: theme.font.weight.bold,
  color: theme.colors.tescoBlue,
  lineHeight: theme.font.fixed.f20.lineHeight,
  paddingBottom: theme.spacing.s2,
});

const descriptionStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  fontWeight: theme.font.weight.bold,
});
