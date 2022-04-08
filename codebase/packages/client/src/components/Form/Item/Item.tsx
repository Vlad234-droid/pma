import React, { FC, useRef, useState } from 'react';
import { colors, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import MarkdownRenderer from 'components/MarkdownRenderer';
import Provider from '../context/input';

export type Props = {
  label?: string;
  withIcon?: boolean;
  labelCustomStyle?: Styles | Rule;
  errormessage?: string;
  marginBot?: boolean;
  customIcon?: boolean;
  customIconInserted?: any;
  onFocus?: () => void;
  focus?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
  testId?: string;
};

export const Item: FC<Props> = ({
  children,
  label,
  labelCustomStyle = {},
  withIcon = true,
  errormessage = '',
  marginBot = true,
  customIcon = false,
  customIconInserted,
  focus,
  onFocus,
  onKeyDown,
  testId = 'item'
}) => {
  const { css } = useStyle();
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
            className={css(IconStyle)}
            onClick={() => {
              setInputFocus();
              onFocus && onFocus();
            }}
          >
            {customIconInserted}
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
});

const labelStyle: Rule = {
  display: 'inline-flex',
  fontSize: '16px',
  lineHeight: '20px',
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
  position: 'absolute',
  left: 0,
  bottom: '-20px',
  color: theme.colors.error,
});

const IconStyle: Rule = {
  position: 'absolute',
  top: '10px',
  right: '12px',
  cursor: 'pointer',
};
