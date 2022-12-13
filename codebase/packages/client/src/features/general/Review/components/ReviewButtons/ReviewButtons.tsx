import React, { FC } from 'react';
import { useStyle, Button, Rule, CreateRule } from '@pma/dex-wrapper';
import { Status } from 'config/enum';
import { Trans, useTranslation } from 'components/Translation';
import { ButtonWithConfirmation } from 'features/general/Modal';

export const TEST_WRAPPER_ID = 'wrapper';

type ReviewButtonsProps = {
  reviewStatus?: Status;
  readonly?: boolean;
  isValid: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSave: () => void;
};

const ReviewButtons: FC<ReviewButtonsProps> = ({ readonly, isValid, onClose, onSaveDraft, onSave, reviewStatus }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  return (
    <div className={css(containerStyle)} data-test-id={TEST_WRAPPER_ID}>
      <div className={css(wrapperStyle)}>
        <div className={css(buttonWrapperStyle({ mobileScreen }))}>
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
              <ButtonWithConfirmation
                onSave={onSave}
                styles={[buttonBlueStyle]}
                isDisabled={!isValid}
                confirmationTitle={''}
                confirmationDescription={t(
                  'review_confirmation_submit',
                  'Are you sure you want to submit your review to your line manager for approval?',
                )}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const containerStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const wrapperStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
  background: theme.colors.white,
  borderRadius: '0px 0 32px 32px',
});

const buttonWrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
    display: 'flex',
    justifyContent: 'center',
  });

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
