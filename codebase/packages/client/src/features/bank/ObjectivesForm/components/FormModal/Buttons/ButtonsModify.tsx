import React, { FC } from 'react';
import { useStyle, Button, Rule, CreateRule } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';

type ButtonsProps = {
  readonly: boolean;
  isValid: boolean;
  onClose: () => void;
  onSaveExit: () => void;
  onSaveAddObjective: () => void;
  onSubmit: () => void;
};

const Buttons: FC<ButtonsProps> = ({ readonly, isValid, onClose, onSaveExit, onSaveAddObjective, onSubmit }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>
        <div className={css(buttonWrapperStyle({ mobileScreen }))}>
          {readonly ? (
            <Button styles={[buttonWhiteStyle]} onPress={onClose}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          ) : (
            <>
              <Button onPress={onSaveExit} styles={[buttonWhiteStyle]}>
                <Trans i18nKey='save_and_exit'>Save & exit</Trans>
              </Button>
              <Button onPress={onSaveAddObjective} styles={[buttonBlueStyle]} isDisabled={!isValid}>
                <Trans i18nKey='save_add_priority'>Save & add new priority</Trans>
              </Button>
            </>
          )}
        </div>
        <div className={css(buttonTextWrapperStyle({ mobileScreen }))}>Or finish</div>
        <div className={css(buttonWrapperStyle({ mobileScreen }))}>
          <Button styles={[buttonBlueStyle]} onPress={onSubmit}>
            <Trans i18nKey='review_and_submit'>Review & Submit</Trans>
          </Button>
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
const buttonTextWrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    padding: `0 ${mobileScreen ? theme.spacing.s7 : theme.spacing.s9}`,
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
