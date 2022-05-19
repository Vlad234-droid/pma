import React, { FC, ReactNode, useMemo, useRef } from 'react';

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { OverlayContainer, useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';

import { CreateRule, Rule, useStyle, Colors, Styles } from '@pma/dex-wrapper';

import { Button } from '../Button';

type NodeOptions = {
  content: ReactNode;
  styles?: Rule[];
};

export type ModalProps = {
  modalPosition?: 'middle' | 'bottom';
  onOverlayClick?: () => void;
  overlayStyles?: Styles | Rule;
  overlayColor?: Colors;
  modalContainerRule?: Rule[];
  title?: NodeOptions;
  closeOptions?: NodeOptions & {
    onClose: () => void;
  };
};

export const Modal: FC<ModalProps> = ({
  modalPosition = 'bottom',
  overlayStyles = {},
  overlayColor,
  modalContainerRule = [],
  children,
  onOverlayClick,
  title: { content: titleContent, styles: titleStyles = [] } = {},
  closeOptions: { content: closeOptionContent, styles: closeOptionStyles = [], onClose } = {},
}) => {
  const overlayRef = useRef(null);
  usePreventScroll();
  /**
   * To close the modal onclick of backdrop, Application need to define onOverlayClick
   * and set the flag (responsible for showing/hiding the Modal from host) to false
   */
  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen: true,
      isDismissable: true,
      onClose: onOverlayClick,
    },
    overlayRef,
  );

  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog({}, overlayRef);
  const { css } = useStyle();

  const { isBottomPosition, sideInset, topInset } = useMemo(
    () => ({
      isBottomPosition: modalPosition === 'bottom',
      sideInset: modalPosition === 'bottom' ? 16 : 64,
      topInset: 48,
    }),
    [modalPosition],
  );

  return (
    <OverlayContainer id='portal-modal'>
      <div
        {...underlayProps}
        aria-label='overlay'
        className={css(underlayRule({ isBottomPosition, overlayColor }), overlayStyles)}
      >
        <FocusScope restoreFocus autoFocus>
          <div
            {...overlayProps}
            {...dialogProps}
            {...modalProps}
            ref={overlayRef}
            className={css(containerRule({ isBottomPosition, topInset, sideInset }), ...modalContainerRule)}
          >
            {titleContent && (
              <div {...titleProps} className={css(...titleStyles)}>
                {titleContent}
              </div>
            )}
            {children}
            {closeOptionContent && (
              <Button onPress={onClose} styles={closeOptionStyles}>
                {closeOptionContent}
              </Button>
            )}
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

const underlayRule: CreateRule<{
  isBottomPosition: boolean;
  overlayColor?: Colors;
}> =
  ({ isBottomPosition, overlayColor }) =>
  ({ colors, zIndex }) => ({
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: zIndex.i50,
    alignItems: isBottomPosition ? 'flex-end' : 'center',
    justifyContent: 'center',
    background: overlayColor ? colors[overlayColor] : colors.link50,
  });

const containerRule: CreateRule<{
  isBottomPosition: boolean;
  topInset: number;
  sideInset: number;
}> =
  ({ isBottomPosition, topInset, sideInset }) =>
  ({ colors }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '32px',
    ...(isBottomPosition && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      flex: 1,
    }),
    padding: `${topInset}px ${sideInset}px 16px`,
    background: colors.white,
    cursor: 'default',
  });
