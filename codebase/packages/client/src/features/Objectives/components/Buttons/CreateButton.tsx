import React, { FC, HTMLProps, useState } from 'react';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { ModalComponent } from 'features/Objectives/components/Modal';
import { useTranslation } from 'components/Translation';
import { CreateUpdateObjective, CreateUpdateObjectives } from 'features/Objectives/components/ObjectiveModal';

export type CreateModalProps = {
  withIcon?: boolean;
  buttonText?: string;
  useSingleStep?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & CreateModalProps;

const CreateButton: FC<Props> = ({ withIcon = false, buttonText = 'Create objectives', useSingleStep = true }) => {
  const { theme } = useStyle();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const handleBtnClick = () => setIsOpen(true);

  return (
    <>
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

      {isOpen && (
        <ModalComponent onClose={() => setIsOpen(false)} title={t('create_objectives', 'Create objectives')}>
          {useSingleStep ? (
            <CreateUpdateObjective onClose={() => setIsOpen(false)} />
          ) : (
            <CreateUpdateObjectives onClose={() => setIsOpen(false)} />
          )}
        </ModalComponent>
      )}
    </>
  );
};

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
