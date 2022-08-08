import React, { FC, ReactNode, useRef, useState, CSSProperties } from 'react';
import { colors, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import MarkdownRenderer from 'components/MarkdownRenderer';
import Provider from '../context/input';

export type ItemProps = {
  label?: string;
  withIcon?: boolean;
  labelCustomStyle?: Styles | Rule | CSSProperties | {};
  errormessage?: string;
  marginBot?: boolean;
  customIcon?: ReactNode;
  onFocus?: () => void;
  focus?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
  testId?: string;
  iconCustomStyles?: Styles | Rule | CSSProperties | {};
};

export const Item: FC<ItemProps> = ({
  children,
  label,
  labelCustomStyle = {},
  withIcon = true,
  errormessage = '',
  marginBot = true,
  customIcon,
  focus,
  onFocus,
  onKeyDown,
  testId = 'item',
  iconCustomStyles = {},
}) => {
  const { css } = useStyle(['lineHeight'], 'remove');
  const [recordingState, setRecordingState] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasFocus, setFocus] = useState(false);

  const setInputFocus = () => {
    if (focus) {
      onFocus && onFocus();
      return;
    }

    return inputRef.current && inputRef.current?.focus();
  };

  return (
    <div
      data-test-id={testId}
      className={css(wrapperItem({ marginBot }))}
      // @ts-ignore
      onKeyDown={onKeyDown}
    >
      {label && (
        <div className={css({ ...labelWrapperStyle, ...labelCustomStyle })}>
          <label className={css(labelStyle)} title={label}>
            <MarkdownRenderer source={label} />
          </label>
        </div>
      )}
      <div className={css(childrenWrapper)}>
        <div>
          <Provider value={{ inputRef, hasFocus, setFocus }}>{children}</Provider>
          {errormessage && !hasFocus && <span className={css(errorMessageStyle)}>{errormessage}</span>}
        </div>
        {withIcon && (
          <span
            //TODO: remove this when Accessibility will be integrated
            className={css(IconStyle, { display: 'none' })}
            onClick={() => {
              setRecordingState(!recordingState);
              setInputFocus();
            }}
          >
            {recordingState ? <Icon graphic='roundStop' /> : <Icon graphic='microphone' fill={colors.dustyGray} />}
          </span>
        )}
        {customIcon && (
          <span
            className={css(IconStyle, iconCustomStyles)}
            onClick={() => {
              setInputFocus();
              onFocus && onFocus();
            }}
          >
            {customIcon}
          </span>
        )}
      </div>
    </div>
  );
};

const wrapperItem: CreateRule<{ marginBot: boolean }> = ({ marginBot }) => ({
  boxSizing: 'border-box',
  margin: marginBot ? '0 0 24px' : '0px',
  padding: '0',
  color: colors.black,
  width: '100%',
  lineHeight: '0',
});

const labelStyle: Rule = ({ theme }) => {
  return {
    display: 'inline-flex',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};
const labelWrapperStyle: Rule = {
  maxWidth: '100%',
  padding: '0 0 8px',
};
const childrenWrapper: Rule = {
  position: 'relative',
  ':focus-within svg path': {
    fill: colors.tescoBlue,
  },
} as Styles;

const errorMessageStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  position: 'absolute',
  left: 0,
  top: '100%',
  color: theme.colors.error,
});

const IconStyle: Rule = {
  position: 'absolute',
  top: '10px',
  right: '12px',
  cursor: 'pointer',
};
