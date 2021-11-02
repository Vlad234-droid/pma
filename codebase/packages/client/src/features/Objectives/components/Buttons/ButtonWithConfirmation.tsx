import React, { FC, HTMLProps, useState } from 'react';
import { Rule, Button } from '@dex-ddl/core';
import { ConfirmModal } from 'features/Modal';
import { IconButton } from 'components/IconButton';

export type ButtonWithConfirmation = {
  styles?: Rule[];
  onSave: () => void;
  isDisabled?: boolean;
  buttonName?: string;
  confirmationTitle?: string;
  confirmationDescription?: string;
  withIcon?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & ButtonWithConfirmation;

const ButtonWithConfirmation: FC<Props> = ({
  buttonName = 'Submit',
  confirmationTitle = 'Submit Objectives',
  confirmationDescription = 'Are you sure you want to submit all of your objectives to your manager?',
  styles = [],
  onSave,
  isDisabled = false,
  withIcon = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {withIcon ? (
        <IconButton
          onPress={() => setIsOpen(true)}
          graphic='decline'
          customVariantRules={{
            //todo currently we using different styling approach. need refactor and use same approach for all components
            default: styles?.length ? styles[0] : {},
          }}
        >
          {buttonName}
        </IconButton>
      ) : (
        <Button
          styles={[...styles, isDisabled ? { opacity: 0.4 } : {}]}
          onPress={() => setIsOpen(true)}
          isDisabled={isDisabled}
        >
          {buttonName}
        </Button>
      )}
      {isOpen && (
        <ConfirmModal
          title={confirmationTitle}
          description={confirmationDescription}
          onSave={() => {
            onSave();
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ButtonWithConfirmation;
