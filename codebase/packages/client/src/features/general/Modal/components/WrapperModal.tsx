import React, { Children, cloneElement, FC, ReactElement } from 'react';

import { CreateRule, Modal, Rule, useMedia } from '@pma/dex-wrapper';
import { Icon } from 'components/Icon';

export type Props = {
  title: string;
  onClose: () => void;
  onOverlayClick?: () => void;
};

const WrapperModal: FC<Props> = ({ title, onClose, onOverlayClick, children }) => {
  const { matchMedia } = useMedia();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  return (
    <Modal
      modalPosition={'middle'}
      overlayColor={'tescoBlue'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose,
        styles: [modalCloseOptionStyle({ mobileScreen })],
      }}
      title={{
        content: title,
        styles: [modalTitleOptionStyle],
      }}
      onOverlayClick={onOverlayClick}
    >
      {Children.map(children, (child) => cloneElement(child as ReactElement, { onClose }))}
    </Modal>
  );
};

const modalCloseOptionStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
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
});

const modalTitleOptionStyle: Rule = ({ theme }) => {
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: theme.font.weight.bold,
  };
};

const containerRule: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ colors }) => ({
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
  });

export default WrapperModal;
