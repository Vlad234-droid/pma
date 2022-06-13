import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { Modes } from '../../CalibrationRatingsModal';

export const RatingInfo: FC<{ data: any; setMode: (M) => void }> = ({ data, setMode }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  return (
    <>
      <div className={css(containerInfo)}>
        <div>
          <h2 className={css(titleBlock)}>
            <Trans i18nkey={'your_colleagues_overall_rating_submitted_for_calibration'}>
              Your colleague’s overall rating submitted for calibration
            </Trans>
          </h2>
          <p className={css(overallRatingStyle)}>{data.overall}</p>
        </div>
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
          <span className={css(titleBlock)}>
            <Trans i18nkey={'is_your_colleague_on_long_term_absence_from_the_business'}>
              Is your colleague on long-term absence from the business?
            </Trans>
          </span>
          <label htmlFor='longTerm' className={css(labelStyle)}>
            <Radio name='longTerm' checked={true} id='longTerm' onChange={() => console.log()} />
            <span className={css(titleStyle)}>
              {data.longTerm ? <Trans i18nKey='yes'>Yes</Trans> : <Trans i18nKey='no'>No</Trans>}
            </span>
          </label>
        </div>

        {data.longTerm && (
          <>
            <h2 className={css(titleBlock)}>
              <Trans i18nkey={'reason_why_colleague_is_absent'}>Reason why colleague is absent</Trans>
            </h2>
            <p className={css(overallRatingStyle)}>{data.absent}</p>
          </>
        )}
      </div>
      <ButtonsWrapper
        isValid={true}
        onLeftPress={() => navigate(-1)}
        rightIcon={false}
        rightTextNotIcon={'edit'}
        onRightPress={() => setMode(Modes.SUBMIT)}
      />
    </>
  );
};

const labelStyle: Rule = {
  marginTop: '16px',
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '64px',
  pointerEvents: 'none',
} as Styles;

const containerInfo: Rule = {
  marginTop: '35px',
};

const titleStyle: Rule = {
  marginLeft: '16px',
  marginTop: '2px',
};

const titleBlock: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  lineHeight: theme.font.fixed.f24.lineHeight,
  fontSize: theme.font.fixed.f16.fontSize,
  color: theme.colors.base,
});

const overallRatingStyle: Rule = ({ theme }) => ({
  marginTop: '0px',
  fontWeight: theme.font.weight.regular,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.base,
});
