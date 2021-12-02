import React, { FC, HTMLProps, useState } from 'react';
import { useBreakpoints, Rule, Modal, useStyle, Button } from '@dex-ddl/core';
import { Icon, Graphics } from 'components/Icon';
import { IconButton } from 'components/IconButton';
import { Provider } from './context';

export type TriggerModalProps = {
  name: string;
  title: string;
  graphic?: Graphics;
  withIcon?: boolean;
  customStyle?: React.CSSProperties | {};
  mode?: 'default' | 'inverse';
};

type Props = HTMLProps<HTMLInputElement> & TriggerModalProps;

const TriggerModalButton: FC<Props> = ({
  withIcon = false,
  name,
  title,
  graphic = 'add',
  customStyle = {},
  mode = 'default',
  children,
}) => {
  const { theme } = useStyle();

  const [isOpen, setIsOpen] = useState(false);

  const handleBtnClick = () => setIsOpen(true);

  return (
    <>
      {withIcon ? (
        <IconButton
          customVariantRules={{ default: iconBtnStyle }}
          onPress={handleBtnClick}
          graphic={graphic}
          iconProps={{ invertColors: true }}
          iconStyles={iconStyle}
        >
          {name}
        </IconButton>
      ) : (
        <Button
          mode={mode}
          styles={[
            {
              border: `1px solid ${mode === 'default' ? theme.colors.white : theme.colors.tescoBlue}`,
              fontSize: '14px',
            },
            customStyle,
          ]}
          onPress={handleBtnClick}
        >
          {name}
        </Button>
      )}

      {isOpen && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => setIsOpen(false),
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: title,
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            setIsOpen(false);
          }}
        >
          <Provider value={{ onClose: () => setIsOpen(false) }}>{children}</Provider>
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

const iconBtnStyle: Rule = ({ theme }) => ({
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

export default TriggerModalButton;
