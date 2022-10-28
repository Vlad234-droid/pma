import React, { FC, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { ConfirmModal } from 'components/ConfirmModal';
import { Button } from '../Button';

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
      <Button
        graphic={'trash'}
        isDisabled={!isRemovable}
        onPress={() => setIsOpen(true)}
        name={t('delete', 'Delete')}
      />
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
