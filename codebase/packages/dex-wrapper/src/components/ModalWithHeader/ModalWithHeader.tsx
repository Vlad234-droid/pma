import React, { FC, ReactNode, useMemo } from 'react';

import { CreateRule, Rule, useStyle, Colors } from '@dex-ddl/core';

import { Modal } from '../Modal';

export type ModalWithHeaderProps = {
  modalPosition?: 'middle' | 'bottom';
  overlayColor?: Colors;
  containerRule?: Rule;
  title?: ReactNode;
  closeOptions: {
    closeOptionContent: ReactNode;
    closeOptionStyles?: Rule;
    onClose: () => void;
  };
};

export const ModalWithHeader: FC<ModalWithHeaderProps> = ({
  modalPosition,
  overlayColor = 'tescoBlue',
  containerRule = {},
  children,
  title,
  closeOptions: { closeOptionContent, closeOptionStyles = {}, onClose },
}) => {
  const { css } = useStyle();
  const { isBottomPosition } = useMemo(
    () => ({
      isBottomPosition: modalPosition === 'bottom',
    }),
    [modalPosition],
  );

  return (
    <Modal
      modalPosition={modalPosition}
      overlayColor={overlayColor}
      modalContainerRule={[modalContainerDefaultRule({ isBottomPosition }), containerRule]}
      closeOptions={{
        content: closeOptionContent,
        styles: [closeDefaultRule, closeOptionStyles],
        onClose,
      }}
      title={{
        content: title,
        styles: [titleDefaultRule],
      }}
    >
      <div
        className={css({
          position: 'relative',
          height: '100%',
        })}
      >
        {children}
      </div>
    </Modal>
  );
};

const modalContainerDefaultRule: CreateRule<{ isBottomPosition: boolean }> = ({ isBottomPosition }) => ({
  position: 'static',
  height: 'calc(100% - 100px)',
  width: '60%',
  ...(isBottomPosition && {
    height: 'calc(100% - 50px)',
    width: '100%',
  }),
});

const closeDefaultRule: Rule = ({ colors }) => ({
  position: 'absolute',
  right: '5px',
  top: '5px',
  color: colors.white,
});

const titleDefaultRule: Rule = ({ colors, font }) => ({
  ...centeredRule,
  height: '50px',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  color: colors.white,
  ...font.fixed.f20,
});

const centeredRule: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};
