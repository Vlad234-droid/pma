import React, { FC } from 'react';
import { Rule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { UploadFileButton } from 'features/bank/UploadFile';
import { Status } from 'config/enum';

type Props = {
  reviewUUID: string;
  number: number;
  status: Status;
};

export const Button: FC<Props> = ({ reviewUUID, number, status }) => {
  const isEnabled = [Status.DRAFT, Status.DECLINED, Status.REQUESTED_TO_AMEND].includes(status);
  return (
    <div>
      <UploadFileButton reviewUUID={reviewUUID} number={number} disabled={!isEnabled} />
      <IconButton
        isDisabled={!isEnabled}
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
        isDisabled={!isEnabled}
        onPress={console.log}
        graphic='trash'
        customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
        iconStyles={iconStyles}
        iconPosition={Position.LEFT}
        iconProps={{ size: '16px' }}
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
