import React, { FC, useState } from 'react';
import { Rule, Button } from '@pma/dex-wrapper';
import { ConfirmModal } from 'components/ConfirmModal';
import { IconButton } from 'components/IconButton';
import { Graphics } from 'components/Icon';

type CommonButtonProps = {
  onSave: (params?: any) => void;
  isDisabled?: boolean;
  buttonName?: string;
  confirmationButtonTitle?: JSX.Element;
  confirmationTitle?: string;
  confirmationDescription?: JSX.Element | string;
};

type ButtonWithIconProps = CommonButtonProps & {
  withIcon: boolean;
  graphic: Graphics;
  iconSize?: number;
  styles?: Rule;
};

type ButtonWithoutIconProps = CommonButtonProps & {
  withIcon?: never;
  graphic?: never;
  iconSize?: never;
  styles?: Rule[];
};

export type Props = ButtonWithIconProps | ButtonWithoutIconProps;

const ButtonWithConfirmation: FC<Props> = ({
  confirmationButtonTitle = 'Submit',
  confirmationTitle,
  confirmationDescription = 'Are you sure in your action?',
  onSave,
  buttonName = 'Submit',
  styles,
  isDisabled = false,
  withIcon,
  graphic,
  iconSize = 16,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {withIcon && graphic ? (
        <IconButton
          iconProps={{ size: `${iconSize}px` }}
          onPress={() => setIsOpen(true)}
          graphic={graphic}
          customVariantRules={{ default: !Array.isArray(styles) ? styles : {} }}
        >
          {buttonName}
        </IconButton>
      ) : (
        <Button onPress={() => setIsOpen(true)} isDisabled={isDisabled} styles={Array.isArray(styles) ? styles : []}>
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
          submitBtnTitle={confirmationButtonTitle}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ButtonWithConfirmation;
