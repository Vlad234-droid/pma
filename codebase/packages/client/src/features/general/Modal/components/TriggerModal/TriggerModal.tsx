import React, { FC, HTMLProps, ReactNode, useState } from 'react';
import { CreateRule, Modal, useStyle } from '@pma/dex-wrapper';
import { Icon } from 'components/Icon';
import { TriggerModalProvider } from './context';

export type TriggerModalProps = {
  triggerComponent: ReactNode;
  title: string;
  customStyle?: React.CSSProperties | {};
};

type Props = HTMLProps<HTMLInputElement> & TriggerModalProps;

const TriggerModal: FC<Props> = ({ triggerComponent, title, children }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const [isOpen, setIsOpen] = useState(false);

  const handleBtnClick = () => setIsOpen(true);

  return (
    <>
      <div onClick={handleBtnClick} className={css({ cursor: 'pointer' })}>
        {triggerComponent}
      </div>

      {isOpen && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule({ mobileScreen })]}
          backOptions={{
            content: <Icon graphic='arrowLeft' invertColors={true} />,
            onBack: () => setIsOpen(false),
            styles: [modalBackOptionStyle({ mobileScreen })],
          }}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => setIsOpen(false),
            styles: [modalCloseOptionStyle({ mobileScreen })],
          }}
          title={{
            content: title,
            styles: [modalTitleOptionStyle({ mobileScreen })],
          }}
        >
          <TriggerModalProvider value={{ onClose: () => setIsOpen(false) }}>{children}</TriggerModalProvider>
        </Modal>
      )}
    </>
  );
};

const containerRule: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ colors }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 97px' }
      : { borderRadius: '32px', padding: `40px 0 40px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: mobileScreen ? 0 : '30px',
    background: colors.white,
    cursor: 'default',
  });

// TODO: Extract duplicate 13
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

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f20.fontSize,
          lineHeight: theme.font.fluid.f20.lineHeight,
        }
      : {
          fontSize: theme.font.fixed.f24.fontSize,
          lineHeight: theme.font.fluid.f24.lineHeight,
        }),
  });

const modalBackOptionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    height: 'auto',
    padding: '0px',
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

export default TriggerModal;
