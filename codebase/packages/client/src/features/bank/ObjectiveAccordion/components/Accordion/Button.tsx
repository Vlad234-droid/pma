import React, { FC } from 'react';
import { Status } from 'config/enum';
import { Rule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';

export const Button: FC<{ status: Status; number: number }> = () => {
  return (
    <div>
      <IconButton
        onPress={console.log}
        graphic='upload'
        customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
        iconStyles={{ ...iconStyles }}
        iconPosition={Position.LEFT}
        iconProps={{ size: '16px' }}
      >
        <Trans i18nKey='upload'>Upload</Trans>
      </IconButton>
      <IconButton
        onPress={console.log}
        graphic='edit'
        customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
        iconStyles={iconStyles}
        iconPosition={Position.LEFT}
        iconProps={{ size: '16px' }}
      >
        <Trans i18nKey='edit'>Edit</Trans>
      </IconButton>
      <IconButton
        onPress={console.log}
        graphic='trash'
        customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
        iconStyles={iconStyles}
        iconPosition={Position.LEFT}
        iconProps={{ size: '16px' }}
        isDisabled={true}
      >
        <Trans i18nKey='delete'>Delete</Trans>
      </IconButton>
    </div>
  );
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

const iconStyles: Rule = { marginRight: '5px' };
