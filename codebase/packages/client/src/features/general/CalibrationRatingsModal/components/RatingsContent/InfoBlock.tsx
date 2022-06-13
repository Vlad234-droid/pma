import React, { FC } from 'react';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import { IconWithText } from 'components/IconWithText';
import { Trans, useTranslation } from 'components/Translation';
import { ProfileInfo } from 'components/ProfileInfo';
import { Modes } from '../../CalibrationRatingsModal';

export const InfoBlock: FC<{ mode: Modes | null }> = ({ mode }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  return (
    <div>
      <IconWithText
        graphic={'information'}
        text={t('guidance_on_how_to_use_this_page', 'Guidance on how to use this page')}
      />
      <h2 className={css(calibrationStyle({ mode }))}>
        {mode === Modes.SUBMIT ? (
          <Trans i18nKey='submit_calibration_ratings'>Submit calibration ratings</Trans>
        ) : (
          <Trans i18nKey={'calibration_ratings'}>Calibration ratings</Trans>
        )}
      </h2>
      <p className={css(ratingDescription)}>
        <Trans i18nKey='ratings_not_be_communicated_to_colleagues'>
          Ratings are subject to change in calibration and should not be communicated to colleagues until they are
          confirmed.
        </Trans>
      </p>
      <ProfileInfo
        firstName={'Vlad'}
        lastName={'Bar'}
        job={'rivet pullers'}
        department={'Economics'}
        toneOfVoice={'Treat me kindly'}
        single={true}
      />
    </div>
  );
};

const calibrationStyle: CreateRule<{ mode: Modes | null }> =
  ({ mode }) =>
  ({ theme }) => {
    return {
      fontWeight: theme.font.weight.bold,
      fontSize: theme.font.fixed.f24.fontSize,
      lineHeight: theme.font.fixed.f24.lineHeight,
      color: mode === Modes.SUBMIT ? theme.colors.base : theme.colors.tescoBlue,
      marginTop: '30px',
      marginBottom: '8px',
    };
  };
const ratingDescription: Rule = ({ theme }) => {
  return {
    fontWeight: theme.font.weight.regular,
    fontSize: theme.font.fixed.f18.fontSize,
    lineHeight: theme.font.fixed.f18.lineHeight,
    color: theme.colors.base,
  };
};
