import React, { FC, MouseEvent, ReactNode, useEffect, useRef, useState, CSSProperties } from 'react';
import { CreateRule, Rule, useStyle, Styles } from '@pma/dex-wrapper';
import useEventListener from 'hooks/useEventListener';

export const UNDERLAY_WRAPPER = 'underlay-wrapper';

type Spacing = '100%' | 0;

type RenderProps = {
  onClose: () => void;
};

type Props = {
  onClose: () => void;
  children: (renderProps: RenderProps) => ReactNode;
  transitionDuration?: number;
  styles?: CSSProperties | Styles | Rule | {};
};

const UnderlayModal: FC<Props> = ({ onClose, transitionDuration = 300, styles = {}, children }) => {
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
    setTimeout(() => setWidth('100%'), 0);
  }, []);

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) onClose();
  };

  useEventListener('mousedown', handleClickOutside);

  return (
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
    position: 'fixed',
    top: 0,
    right: 0,
    width,
    display: 'flex',
    flexDirection: 'column',
    transition: `width ${duration / 1000}s ease-in-out`,
    ...(isDesktop && {
      width: width === '100%' ? '50%' : 0,
    }),
    cursor: 'pointer',
    height: '100%',
    zIndex: zIndex.i50,
  });
