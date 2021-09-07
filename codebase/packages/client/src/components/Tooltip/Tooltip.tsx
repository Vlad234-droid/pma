import React, { FC, HTMLProps, useRef, useState } from 'react';
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip';
import { AriaTooltipProps } from '@react-types/tooltip';
import { useButton } from '@react-aria/button';
import { useTooltipTriggerState } from '@react-stately/tooltip';
import { mergeProps } from '@react-aria/utils';
import { useInteractionModality } from '@react-aria/interactions';

import { useStyle } from '@dex-ddl/core';

type TooltipProps = {
  width?: number;
};

const Tooltip: FC<AriaTooltipProps & TooltipProps> = (props) => {
  const { tooltipProps } = useTooltip(props);
  const { css, theme } = useStyle();

  const width = props.width || 186;

  return (
    <div
      className={css({
        width: `${width}px`,
        position: 'absolute',
        left: `${-width * 0.4}px`,
        bottom: '100%',
        marginBottom: '18px',
        backgroundColor: theme.colors.link,
        padding: '4px',
      })}
      {...mergeProps(props, tooltipProps)}
    >
      <div
        className={css({
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: ' 15px solid transparent',
          borderTop: `10px solid ${theme.colors.link}`,
          position: 'absolute',
          top: '100%',
          left: 'calc(50% - 20px)',
        })}
      />
      <span
        className={css({
          display: 'inline-block',
          color: theme.colors.white,
          fontSize: '12px',
          fontWeight: 'normal',
          lineHeight: '16px',
          padding: '4px',
        })}
      >
        {props.children}
      </span>
    </div>
  );
};

export type WrapperProps = {
  children?: JSX.Element | JSX.Element[] | string;
  text: string;
  width?: number;
  customStyle?: React.CSSProperties | {};
};

export const TooltipWrapper: FC<HTMLProps<HTMLInputElement> & WrapperProps> = ({ text, width = 186, children }) => {
  useInteractionModality();

  const state = useTooltipTriggerState({ delay: 0 });
  const [tooltipStatus, setTooltipStatus] = useState(state.isOpen);
  const ref = useRef(null);
  const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, ref);
  const { buttonProps } = useButton(
    {
      onPress: () => {
        setTooltipStatus(!tooltipStatus);
        tooltipStatus ? state.close() : state.open();
      },
    },
    ref,
  );

  return (
    <span style={{ position: 'relative', cursor: 'pointer' }}>
      <span ref={ref} {...mergeProps(triggerProps, buttonProps)}>
        {children}
      </span>
      {state.isOpen && (
        <Tooltip {...tooltipProps} width={width}>
          {text}
        </Tooltip>
      )}
    </span>
  );
};
