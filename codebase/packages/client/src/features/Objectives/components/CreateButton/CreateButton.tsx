import React, { FC, HTMLProps, useState } from 'react';
import { Rule } from '@dex-ddl/core';
import { useBreakpoints, useStyle } from 'styles';
import { Modal } from 'components/Modal';
import { Icon } from 'components/Icon';
import { CreateModal } from '../Modal';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';

export type CreateModalProps = {
  withIcon?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & CreateModalProps;

const CreateButton: FC<Props> = ({ withIcon = false }) => {
  const { theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const [isOpen, setIsOpen] = useState(false);

  const handleBtnClick = () => setIsOpen(true);

  return (
    <>
      {withIcon ? (
        <IconButton
          styles={[btnStyle, iconBtnStyle]}
          onPress={handleBtnClick}
          graphic='add'
          iconProps={{ invertColors: true }}
          iconStyles={iconStyle}
        >
          Create objectives
        </IconButton>
      ) : (
        <Button styles={btnStyle({ theme })} onPress={handleBtnClick}>
          Create objectives
        </Button>
      )}

      {isOpen && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={containerRule}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => setIsOpen(false),
            styles: {
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
            },
          }}
          title={{
            content: 'Create objectives',
            styles: {
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
            },
          }}
          onOverlayClick={() => {
            setIsOpen(false);
          }}
        >
          <CreateModal />
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

const btnStyle = ({ theme }) => ({
  border: `1px solid ${theme.colors.white}`,
  fontSize: '14px',
});

const iconBtnStyle = ({ theme }) => ({
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

export default CreateButton;
