import React, { FC, HTMLProps, useState } from 'react';
import { Button, Modal, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Graphics, Icon } from 'components/Icon';
import { CreateUpdateObjective, CreateUpdateObjectives } from '../ObjectiveModal';
import { IconButton } from 'components/IconButton';

export type EditAllModalProps = {
  isSingleObjectivesEditMode: boolean;
  editNumber?: number;
  icon?: Graphics;
  styles?: Rule;
  buttonText?: string;
};

type Props = HTMLProps<HTMLInputElement> & EditAllModalProps;

const EditButton: FC<Props> = ({
  isSingleObjectivesEditMode,
  styles = {},
  icon = 'add',
  buttonText = 'Edit all',
  editNumber,
}) => {
  const { theme } = useStyle();

  const [isOpen, setIsOpen] = useState(false);

  const handleBtnClick = () => setIsOpen(true);

  return (
    <>
      {icon ? (
        <IconButton
          customVariantRules={{ default: styles }}
          onPress={handleBtnClick}
          graphic={icon}
          iconStyles={iconStyle}
        >
          {buttonText}
        </IconButton>
      ) : (
        <Button
          styles={[
            styles,
            {
              border: `1px solid ${theme.colors.white}`,
              fontSize: '14px',
            },
          ]}
          onPress={handleBtnClick}
        >
          {buttonText}
        </Button>
      )}

      {isOpen && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setIsOpen(false);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: 'Edit objectives',
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            setIsOpen(false);
          }}
        >
          {isSingleObjectivesEditMode ? (
            <CreateUpdateObjective onClose={() => setIsOpen(false)} editNumber={editNumber} />
          ) : (
            <CreateUpdateObjectives onClose={() => setIsOpen(false)} editNumber={editNumber} />
          )}
        </Modal>
      )}
    </>
  );
};

const containerRule: Rule = ({ colors }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 97px' }
      : { borderRadius: '32px', padding: `40px 0 112px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: mobileScreen ? 0 : '30px',
    background: colors.white,
    cursor: 'default',
  };
};

const modalCloseOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const modalTitleOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    ...(mobileScreen
      ? {
          fontSize: '20px',
          lineHeight: '24px',
        }
      : {
          fontSize: '24px',
          lineHeight: '28px',
        }),
  };
};

const iconStyle: Rule = {
  marginRight: '10px',
};

export default EditButton;
