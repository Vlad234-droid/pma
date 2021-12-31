import React, { FC, HTMLProps, useState } from 'react';
import { Trans } from 'components/Translation';
import { Rule, Button } from '@dex-ddl/core';
import { ConfirmModal } from 'features/Modal';

export type SubmitButton = {
  title: string;
  description?: string;
  styles?: Rule[];
  onSave: () => void;
  isDisabled?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & SubmitButton;

const SubmitButton: FC<Props> = ({ styles = [], onSave, isDisabled = false, title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        styles={[...styles, isDisabled ? { opacity: 0.4 } : {}]}
        onPress={() => setIsOpen(true)}
        isDisabled={isDisabled}
      >
        <Trans i18nKey='submit'>Submit</Trans>
      </Button>
      {isOpen && (
        <ConfirmModal
          title={title}
          description={description}
          onSave={() => {
            onSave();
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SubmitButton;
