import React, { FC, ReactNode } from 'react';

import { useBreakpoints, Rule, Modal } from '@dex-ddl/core';
import { Icon } from 'components/Icon';

export type Props = {
  title: string;
  onClose: () => void;
  onOverlayClick?: () => void;
};

const WrapperModal: FC<Props> = ({ title, onClose, onOverlayClick, children }) => {
  return (
    <Modal
      modalPosition={'middle'}
      overlayColor={'tescoBlue'}
      modalContainerRule={[containerRule]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose,
        styles: [modalCloseOptionStyle],
      }}
      title={{
        content: title,
        styles: [modalTitleOptionStyle],
      }}
      onOverlayClick={onOverlayClick}
    >
      {children}
    </Modal>
  );
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
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontSize: '20px',
    lineHeight: '24px',
  };
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

export default WrapperModal;
