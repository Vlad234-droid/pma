import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import defaultImg from 'images/default.png';

type Props = Record<'firstName' | 'lastName' | 'job' | 'department', string | undefined>;
type Action = { action?: JSX.Element };

export const ColleagueProfile: FC<Props & Action> = ({ firstName, lastName, job, department, action }) => {
  const { css } = useStyle();
  return (
    <div className={css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' })}>
      <img
        className={css({ width: '50px', height: '50px', borderRadius: '50%' })}
        src={defaultImg}
        alt={'User image'}
      />
      <div className={css({ marginLeft: '16px' })}>
        <div className={css(flexGapStyle, selectedItemStyle)}>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={css(flexGapStyle, { marginTop: '4px' })}>
          <div>{job}</div>
          <div>{department}</div>
        </div>
      </div>
      {action}
    </div>
  );
};

const flexGapStyle: Rule = ({ theme }) => {
  return {
    display: 'flex',
    gap: '8px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const selectedItemStyle: Rule = ({ colors, theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  color: colors.link,
});
