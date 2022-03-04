import React, { FC, HTMLProps, useState } from 'react';
import { Rule, useStyle, CreateRule, Theme } from '@dex-ddl/core';
import { ConfirmModal } from 'features/Modal';
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
  const { css, theme } = useStyle();

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
        // <Button
        //   styles={[...styles, isDisabled ? { opacity: 0.4 } : {}]}
        //   onPress={() => setIsOpen(true)}
        //   isDisabled={isDisabled}
        // >
        //   {buttonName}
        // </Button>
        <button 
          className={css(...styles, btnStyles({isDisabled, theme}), isDisabled ? { opacity: 0.4 } : {})}
          title={isDisabled ? disabledBtnTooltip : ''}
          disabled={isDisabled}
          onClick={() => console.log('as')}
        >
          {buttonName}
        </button>
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

const btnStyles: CreateRule<{isDisabled: boolean, theme: Theme}> = ({ isDisabled, theme }) => {
  return {
    borderRadius: '20px',
    border: 0,
    color: theme.colors.white,
    cursor: isDisabled ? 'default' : 'pointer',
    
  }
}

export default ButtonWithConfirmation;
