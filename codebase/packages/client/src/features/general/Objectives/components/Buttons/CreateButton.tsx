import React, { FC, HTMLProps, useState, memo } from 'react';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { ModalComponent } from 'features/general/ObjectivesForm/components/ModalComponent';
import { useTranslation } from 'components/Translation';
import { ObjectiveForm, ObjectivesForm } from 'features/general/ObjectivesForm';

export type CreateModalProps = {
  withIcon?: boolean;
  buttonText?: string;
  useSingleStep?: boolean;
  isAvailable?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & CreateModalProps;

const CreateButton: FC<Props> = memo(
  ({ withIcon = false, buttonText = 'Create objectives', useSingleStep = true, isAvailable = true }) => {
    const { t } = useTranslation();
    const { css } = useStyle();

    const [isOpen, setIsOpen] = useState(false);

    const handleBtnClick = () => setIsOpen(true);

    return (
      <>
        {isAvailable && (
          <div className={css({ display: 'flex', marginBottom: '20px' })}>
            {withIcon ? (
              <IconButton
                customVariantRules={{ default: iconBtnStyle }}
                onPress={handleBtnClick}
                graphic='add'
                iconProps={{ invertColors: true }}
                iconStyles={iconStyle}
              >
                {buttonText}
              </IconButton>
            ) : (
              <Button styles={[buttonStyle]} onPress={handleBtnClick}>
                {buttonText}
              </Button>
            )}
          </div>
        )}
        {isOpen && (
          <ModalComponent onClose={() => setIsOpen(false)} title={t('create_objectives', 'Create objectives')}>
            {useSingleStep ? (
              <ObjectiveForm onClose={() => setIsOpen(false)} />
            ) : (
              <ObjectivesForm onClose={() => setIsOpen(false)} />
            )}
          </ModalComponent>
        )}
      </>
    );
  },
);

const iconBtnStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  padding: '0 16px',
  display: 'flex',
  height: '40px',
  paddingLeft: '12px',
  paddingRight: '12px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  marginRight: '10px',
};

const buttonStyle: Rule = ({ theme }) => ({
  border: `${theme.border.width.b2} solid ${theme.colors.white}`,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

export default CreateButton;
