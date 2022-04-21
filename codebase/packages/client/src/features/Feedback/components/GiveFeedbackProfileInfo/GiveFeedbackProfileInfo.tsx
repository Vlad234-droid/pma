import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

import defaultImg from 'images/default.png';

const TONE_VOICE = 'tone-voice';

type ProfileInfoProps = {
  firstName: string;
  lastName: string;
  job: string;
  department: string;
  toneOfVoice: string;
};

const GiveFeedbackProfileInfo: FC<ProfileInfoProps> = ({ firstName, lastName, job, department, toneOfVoice }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <div className={css(blockInfo)}>
      <div className={css({ alignSelf: 'flex-start' })}>
        <img className={css(imgStyle)} src={defaultImg} alt='photo' />
      </div>
      <div className={css({ marginLeft: '16px' })}>
        <h3 className={css(names_Style)}>{`${firstName ?? ''} ${lastName ?? ''}`}</h3>
        <p className={css(industryStyle)}>{`${job ?? ''}${department && job ? ',' : ''} ${department ?? ''}`}</p>
        <span className={css(treatmentStyle)} data-test-id={TONE_VOICE}>
          {t('i_prefer_feedback_that_is', `I prefer feedback that is: ${toneOfVoice}`, { toneOfVoice })}
        </span>
      </div>
    </div>
  );
};

const blockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const imgStyle: Rule = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
};
const names_Style: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.spacing.s5,
  lineHeight: theme.spacing.s6,
  margin: theme.spacing.s0,
});

const industryStyle: Rule = ({ theme }) => ({
  fontWeight: 'normal',
  fontSize: theme.spacing.s4,
  lineHeight: theme.spacing.s5,
  margin: `${theme.spacing.s0} ${theme.spacing.s0} 4px ${theme.spacing.s0}`,
});
const treatmentStyle: Rule = ({ theme }) => ({
  fontWeight: 'normal',
  fontSize: theme.spacing.s4,
  lineHeight: theme.spacing.s2_5,
  color: theme.colors.link,
});

export default GiveFeedbackProfileInfo;
