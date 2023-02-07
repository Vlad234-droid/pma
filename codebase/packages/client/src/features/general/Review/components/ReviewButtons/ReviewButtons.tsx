import React, { FC } from 'react';
import { Button, Rule } from '@pma/dex-wrapper';
import { Status } from 'config/enum';
import { Trans } from 'components/Translation';

type ReviewButtonsProps = {
  reviewStatus?: Status;
  readonly?: boolean;
  isValid: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSave: () => void;
};

const ReviewButtons: FC<ReviewButtonsProps> = ({ readonly, isValid, onClose, onSaveDraft, onSave, reviewStatus }) => {
  return (
    <>
      {readonly ? (
        <Button styles={[buttonWhiteStyle]} onPress={onClose}>
          <Trans i18nKey='close'>Close</Trans>
        </Button>
      ) : (
        <>
          {reviewStatus === Status.DECLINED ? (
            <Button onPress={onClose} styles={[buttonWhiteStyle]}>
              <Trans i18nKey='cancel'>Cancel</Trans>
            </Button>
          ) : (
            <Button onPress={onSaveDraft} styles={[buttonWhiteStyle]} isDisabled={!isValid}>
              <Trans i18nKey='save_as_draft'>Save as draft</Trans>
            </Button>
          )}
          <Button onPress={onSave} styles={[buttonBlueStyle]} isDisabled={!isValid}>
            <Trans i18nKey='submit'>Submit</Trans>
          </Button>
        </>
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

export default ReviewButtons;
