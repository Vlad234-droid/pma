import React, { FC, HTMLProps, useState } from 'react';
import { Rule, useStyle, CreateRule, Button } from '@pma/dex-wrapper';
import { ConfirmModal } from 'features/general/Modal';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';

export type ButtonWithConfirmation = {
  styles?: Rule[];
  onSave: () => void;
  isDisabled?: boolean;
  buttonName?: string;
  confirmationButtonTitle?: JSX.Element;
  confirmationTitle?: string;
  confirmationDescription?: string;
  withIcon?: boolean;
  disabledBtnTooltip?: string;
};

type Props = HTMLProps<HTMLInputElement> & ButtonWithConfirmation;

const ButtonWithConfirmation: FC<Props> = ({
  buttonName = 'Submit',
  confirmationButtonTitle = <Trans i18nKey='submit'>Submit</Trans>,
  confirmationTitle = 'Submit Objectives',
  confirmationDescription = 'Are you sure you want to submit all of your objectives to your manager?',
  disabledBtnTooltip = '',
  styles = [],
  onSave,
  isDisabled = false,
  withIcon = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { css } = useStyle();

  return (
    <>
      {withIcon ? (
        <IconButton
          onPress={() => setIsOpen(true)}
          graphic='cancel'
          customVariantRules={{
            //todo currently we using different styling approach. need refactor and use same approach for all components
            default: styles?.length ? styles[0] : {},
          }}
        >
          {buttonName}
        </IconButton>
      ) : (
        <div title={isDisabled ? disabledBtnTooltip : ''} className={css(...styles, btnStyles({ isDisabled }))}>
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
  opacity: isDisabled ? 0.4 : 1,
  borderRadius: '32px',
});

export default ButtonWithConfirmation;
