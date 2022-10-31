import React, { FC, HTMLProps, useState } from 'react';
import { Rule, useStyle, CreateRule, Button } from '@pma/dex-wrapper';
import { ConfirmModal } from 'components/ConfirmModal';
import { IconButton } from 'components/IconButton';
import { Graphics } from 'components/Icon';

export type ButtonWithConfirmation = {
  onSave: (params?: any) => void;
  styles?: Rule;
  isDisabled?: boolean;
  buttonName?: string;
  confirmationButtonTitle?: JSX.Element;
  confirmationTitle?: string;
  confirmationDescription?: string;
  withIcon?: boolean;
  graphic?: Graphics;
  iconSize?: number;
  disabledButtonTooltip?: string;
};

type Props = HTMLProps<HTMLInputElement> & ButtonWithConfirmation;

const ButtonWithConfirmation: FC<Props> = ({
  confirmationButtonTitle = 'Submit',
  confirmationTitle = 'Submit',
  confirmationDescription = 'Are you sure in your action?',
  onSave,
  buttonName = 'Submit',
  disabledButtonTooltip = '',
  styles = {},
  isDisabled = false,
  withIcon = false,
  graphic = 'cancel',
  iconSize = 16,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { css } = useStyle();

  return (
    <>
      {withIcon ? (
        <IconButton
          iconProps={{ size: `${iconSize}px` }}
          onPress={() => setIsOpen(true)}
          graphic={graphic}
          customVariantRules={{ default: styles }}
        >
          {buttonName}
        </IconButton>
      ) : (
        <div title={isDisabled ? disabledButtonTooltip : ''} className={css(btnStyles({ isDisabled }), styles)}>
          <Button onPress={() => setIsOpen(true)} isDisabled={isDisabled}>
            {buttonName}
          </Button>
        </div>
      )}
      {isOpen && (
        <ConfirmModal
          title={confirmationTitle}
          description={confirmationDescription}
          onSave={() => {
            onSave();
            setIsOpen(false);
          }}
          submitBtnTitle={confirmationButtonTitle}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const btnStyles: CreateRule<{ isDisabled: boolean }> = ({ isDisabled }) => ({
  cursor: isDisabled ? 'default' : 'pointer',
  opacity: isDisabled ? 0.6 : 1,
  borderRadius: '32px',
});

export default ButtonWithConfirmation;
