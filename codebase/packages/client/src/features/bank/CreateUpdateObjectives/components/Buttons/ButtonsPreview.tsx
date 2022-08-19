import React, { FC } from 'react';
import { useStyle, Button, Rule, CreateRule } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';
import { ButtonWithConfirmation } from 'features/general/Modal';

type ButtonsProps = {
  onBack: () => void;
  onSubmit: () => void;
};

const Buttons: FC<ButtonsProps> = ({ onSubmit, onBack }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>
        <div className={css(buttonWrapperStyle({ mobileScreen }))}>
          <Button onPress={onBack} styles={[buttonWhiteStyle]}>
            <Trans i18nKey='back'>Back</Trans>
          </Button>
          <ButtonWithConfirmation
            onSave={onSubmit}
            styles={[buttonBlueStyle]}
            confirmationTitle={''}
            confirmationDescription={t(
              'review_confirmation_submit',
              'Are you sure you want to submit your review to your line manager for approval?',
            )}
          />
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

export default Buttons;
