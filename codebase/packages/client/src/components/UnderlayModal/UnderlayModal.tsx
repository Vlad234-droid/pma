import React, { FC, ReactNode, useEffect, useRef, useState, CSSProperties, RefObject } from 'react';
import { CreateRule, Rule, useStyle, Styles } from '@pma/dex-wrapper';
import useClickOutside from 'hooks/useClickOutside';

export const UNDERLAY_WRAPPER = 'underlay-wrapper';

type Spacing = '100%' | 0;

type RenderProps = {
  onClose: () => void;
};

type Props = {
  onClose: () => void;
  overlayClick?: boolean;
  children: (renderProps: RenderProps) => ReactNode;
  transitionDuration?: number;
  styles?: CSSProperties | Styles | Rule | {};
  loading?: boolean;
};

const ConditionalOutsideClick: FC<{ forwardedRef: RefObject<any>; onClose: () => void }> = ({
  onClose,
  forwardedRef,
}) => {
  useClickOutside(forwardedRef, onClose);
  return null;
};

const UnderlayModal: FC<Props> = ({
  onClose,
  transitionDuration = 300,
  styles = {},
  children,
  loading = false,
  overlayClick = true,
}) => {
  const [width, setWidth] = useState<Spacing>(0);
  const [duration] = useState<number>(transitionDuration);
  const { css, matchMedia } = useStyle();
  const isDesktop = matchMedia({ largeAbove: true }) || false;
  const ref = useRef<HTMLDivElement | null>(null);

  const onTransitionEnd = () => {
    if (isDesktop && width === 0) {
      return onClose();
    }
  };

  const handleClose = () => {
    setWidth(0);
    setTimeout(() => onClose(), duration);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setWidth('100%'), 0);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {overlayClick && <ConditionalOutsideClick onClose={onClose} forwardedRef={ref} />}
      <div className={css(slideInModalRule)}>
        <div
          data-test-id={UNDERLAY_WRAPPER}
          className={css(containerRule({ isDesktop, width, duration }), { ...styles })}
          onTransitionEnd={onTransitionEnd}
          ref={ref}
        >
          {children({ onClose: handleClose })}
        </div>
      </div>
    </>
  );
};

export default UnderlayModal;

const slideInModalRule: Rule = ({ zIndex, colors }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  width: '100%',
  zIndex: zIndex.i40,
  height: '100%',
  background: colors.link30,
});

const containerRule: CreateRule<{
  isDesktop: boolean;
  duration: number;
  width: Spacing;
}> =
  ({ width, isDesktop, duration }) =>
  ({ zIndex, theme }) => ({
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    top: 0,
    right: 0,
    width,
    display: 'flex',
    flexDirection: 'column',
    transition: `width ${duration / 1000}s ease-in-out`,
    ...(isDesktop && {
      width: width === '100%' ? '50%' : 0,
    }),
    height: '100%',
    zIndex: zIndex.i50,
    position: 'relative',
    marginLeft: 'auto',
    background: theme.colors.white,
  });
