import React, { FC } from 'react';
import { Button, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { Status } from '../../../../../config/enum';

type ButtonsProps = {
  onSaveAndExit: () => void;
  isValid: boolean;
  onSubmit: (T?) => void;
  status?: Status;
  onClose: () => void;
};

const Buttons: FC<ButtonsProps> = ({ onSubmit, onSaveAndExit, isValid, status, onClose }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>
        <div className={css(buttonWrapperStyle({ mobileScreen }))}>
          {status === Status.APPROVED ? (
            <Button onPress={onClose} styles={[buttonWhiteStyle]}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          ) : (
            <Button onPress={onSaveAndExit} styles={[buttonWhiteStyle]}>
              <Trans i18nKey='save_and_exit'>Save and exit</Trans>
            </Button>
          )}
          <Button onPress={onSubmit} styles={[buttonBlueStyle]} isDisabled={!isValid}>
            <Trans i18nKey='submit'>Submit</Trans>
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
