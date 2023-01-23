import React, { FC } from 'react';
import { Button, Rule } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';
import { ButtonWithConfirmation } from 'features/general/Modal';

type ReviewButtonsProps = {
  onClose: () => void;
  onSave: () => void;
  readonly: boolean;
};

const LineManagerButtons: FC<ReviewButtonsProps> = ({ onClose, onSave, readonly }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button onPress={onClose} styles={[buttonWhiteStyle]}>
        <Trans i18nKey='close'>Close</Trans>
      </Button>
      {!readonly && (
        <ButtonWithConfirmation
          buttonName={t('decline_anyway', 'Decline anyway')}
          onSave={onSave}
          styles={[buttonBlueStyle]}
          confirmationTitle={t('decline_approved_review_title', 'Do you want to decline this review form?')}
          confirmationDescription={t(
            'review_confirmation_submit',
            'Once you do it, it will be sent back to my colleague to resubmit their ratings.',
          )}
        />
      )}
    </>
  );
};

const buttonWhiteStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  width: '50%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const buttonBlueStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  width: '50%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: `${theme.colors.tescoBlue}`,
});

export default LineManagerButtons;
