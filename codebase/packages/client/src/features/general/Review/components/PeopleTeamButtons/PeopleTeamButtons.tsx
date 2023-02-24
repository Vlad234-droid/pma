import React, { FC } from 'react';
import { Button, Rule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';

type Props = {
  isValid: boolean;
  onClose: () => void;
  onSave: () => void;
};

export const PeopleTeamButtons: FC<Props> = ({ isValid, onClose, onSave }) => {
  return (
    <>
      <Button onPress={onClose} styles={[buttonWhiteStyle]}>
        <Trans i18nKey='cancel'>Cancel</Trans>
      </Button>
      <Button onPress={onSave} styles={[buttonBlueStyle]} isDisabled={!isValid}>
        <Trans i18nKey='submit'>Submit</Trans>
      </Button>
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
