import React, { FC, useState } from 'react';
import { Rule } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { ConfirmModal } from 'components/ConfirmModal';

type Props = {
  onDelete: (number: number) => void;
  number: number;
  isRemovable: boolean;
  description: string;
};

export const DeleteButton: FC<Props> = ({ onDelete, number, isRemovable, description }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        isDisabled={!isRemovable}
        onPress={() => setIsOpen(true)}
        graphic='trash'
        customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
        iconStyles={iconStyles}
        iconPosition={Position.LEFT}
        iconProps={{ size: '16px' }}
      >
        <Trans i18nKey='delete'>Delete</Trans>
      </IconButton>
      {isOpen && (
        <ConfirmModal
          title={t('delete_priority', 'Are you sure you want to delete this priority?')}
          description={description}
          onSave={() => {
            onDelete(number);
            setIsOpen(false);
          }}
          submitBtnTitle={<Trans i18nKey='confirm'>Confirm</Trans>}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
    </>
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
