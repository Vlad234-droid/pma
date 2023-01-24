import React, { FC } from 'react';
import { Button, Rule } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';
import { ButtonWithConfirmation } from 'features/general/Modal';
import { Statuses } from '@pma/store';

type ReviewButtonsProps = {
  onClose: () => void;
  onSave: (status: Statuses.DECLINED | Statuses.APPROVED) => void;
  canDecline: boolean;
  canApprove: boolean;
};

const LineManagerButtons: FC<ReviewButtonsProps> = ({ onClose, onSave, canApprove, canDecline }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button onPress={onClose} styles={[buttonWhiteStyle]}>
        <Trans i18nKey='close'>Close</Trans>
      </Button>
      {canDecline && (
        <ButtonWithConfirmation
          buttonName={t('decline_anyway', 'Decline anyway')}
          onSave={() => onSave(Statuses.DECLINED)}
          styles={[buttonBlueStyle]}
          confirmationTitle={t('decline_approved_review_title', 'Do you want to decline this review form?')}
          confirmationDescription={t(
            'review_confirmation_decline_approved',
            'Once you do it, it will be sent back to my colleague to resubmit their ratings.',
          )}
        />
      )}
      {canApprove && (
        <ButtonWithConfirmation
          buttonName={t('approve', 'Approve')}
          onSave={() => onSave(Statuses.APPROVED)}
          styles={[buttonBlueStyle]}
          confirmationTitle={t('approve_review_title', 'Do you want to approve this review form?')}
          confirmationDescription={t('review_confirmation_approve', 'Are you sure you want to approve review?')}
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
