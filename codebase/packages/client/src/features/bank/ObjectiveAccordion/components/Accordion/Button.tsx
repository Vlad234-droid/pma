import React, { FC } from 'react';
import { Rule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { UploadFileButton } from 'features/bank/UploadFile';

type Props = {
  reviewUUID: string;
  number: number;
};

export const Button: FC<Props> = ({ reviewUUID, number }) => {
  return (
    <div>
      <UploadFileButton reviewUUID={reviewUUID} number={number} />
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
